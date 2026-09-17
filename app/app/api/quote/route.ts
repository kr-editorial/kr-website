import { NextResponse } from "next/server";
import { Resend } from "resend";
import { QuoteRequestEmail } from "@/emails/quote-request-email";
import { quoteRequestSchema } from "@/lib/validation/quote";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

// Best-effort in-memory rate limit (per serverless instance).
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

async function verifyRecaptcha(token: string, ip: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[quote] RECAPTCHA_SECRET_KEY ausente; captcha ignorado em desenvolvimento.");
      return true;
    }
    console.error("[quote] RECAPTCHA_SECRET_KEY não configurada.");
    return false;
  }

  const params = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    },
  );

  if (!response.ok) return false;
  const data = (await response.json()) as { success: boolean };
  return data.success;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas solicitações. Aguarde alguns minutos e tente novamente." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Verifique os campos do formulário.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot: bots fill the hidden field; reply with fake success.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const { captchaToken, ...fields } = parsed.data;

  const isHuman = await verifyRecaptcha(captchaToken, ip);
  if (!isHuman) {
    return NextResponse.json(
      { error: "Verificação falhou, tente novamente" },
      { status: 403 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL ?? "KR Editorial <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[quote] E-mail não configurado; solicitação registrada apenas no log:", fields);
      return NextResponse.json({ ok: true });
    }
    console.error("[quote] RESEND_API_KEY/QUOTE_TO_EMAIL não configurados.");
    return NextResponse.json(
      { error: "Serviço de e-mail indisponível no momento. Tente novamente mais tarde." },
      { status: 502 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: fields.email,
    subject: `Orçamento: ${fields.name}`,
    react: QuoteRequestEmail(fields),
  });

  if (error) {
    console.error("[quote] Falha ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar sua solicitação. Tente novamente mais tarde." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
