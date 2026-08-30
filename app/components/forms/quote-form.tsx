"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { BookOpen, CheckCircle2, Loader2, Send } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getBookBySlug } from "@/lib/content";
import type { Book } from "@/lib/types";
import {
  projectTypes,
  quoteFieldsSchema,
  type QuoteFields,
} from "@/lib/validation/quote";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// URL search string as an external store: empty on the server so the form
// stays statically prerendered, real value on the client without mismatch.
const emptySubscribe = () => () => {};
function useSearchString(): string {
  return useSyncExternalStore(
    emptySubscribe,
    () => window.location.search,
    () => "",
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm font-medium text-destructive">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const search = useSearchString();
  const referencedBook = useMemo<Book | undefined>(() => {
    const slug = new URLSearchParams(search).get("livro");
    return slug ? getBookBySlug(slug) : undefined;
  }, [search]);

  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFields>({
    resolver: zodResolver(quoteFieldsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      institution: "",
      quantity: "",
      message: "",
      reference: "",
    },
  });

  const projectType = useWatch({ control, name: "projectType" });
  // Captcha gating: submit stays disabled until Turnstile issues a token.
  const captchaPending = Boolean(TURNSTILE_SITE_KEY) && !turnstileToken;

  async function onSubmit(fields: QuoteFields) {
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          reference: referencedBook?.title ?? "",
          turnstileToken: turnstileToken || "dev-bypass",
          website: honeypotRef.current?.value ?? "",
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          data?.error ??
            "Não foi possível enviar sua solicitação. Tente novamente.",
        );
      }

      setSubmitted(true);
      toast.success("Solicitação enviada com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua solicitação. Tente novamente.",
      );
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-xl border border-navy/15 bg-card p-10 text-center shadow-sm"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-navy text-cream">
          <CheckCircle2 className="size-7" strokeWidth={1.75} />
        </span>
        <h2 className="text-2xl font-bold text-navy">
          Recebemos sua solicitação!
        </h2>
        <p className="max-w-md text-muted-foreground">
          Obrigado pelo interesse. Vamos analisar o seu projeto e responder no
          e-mail informado em até 2 dias úteis.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
      className="relative flex flex-col gap-5 rounded-xl border border-navy/15 bg-card p-6 shadow-sm sm:p-8"
    >
      {referencedBook ? (
        <div className="flex items-center gap-3 rounded-lg bg-navy/5 px-4 py-3 text-sm text-navy">
          <BookOpen className="size-4.5 shrink-0 text-navy-deep" />
          <p>
            Obra de referência:{" "}
            <strong className="font-semibold">{referencedBook.title}</strong>
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo *</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone / WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution">Instituição (se houver)</Label>
          <Input
            id="institution"
            autoComplete="organization"
            aria-invalid={Boolean(errors.institution)}
            {...register("institution")}
          />
          <FieldError message={errors.institution?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="projectType">Tipo de projeto *</Label>
          <Select
            value={projectType}
            onValueChange={(value) =>
              setValue("projectType", value as QuoteFields["projectType"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger
              id="projectType"
              className="w-full"
              aria-invalid={Boolean(errors.projectType)}
            >
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.projectType?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Tiragem estimada</Label>
          <Input
            id="quantity"
            inputMode="numeric"
            placeholder="Ex.: 500 exemplares"
            aria-invalid={Boolean(errors.quantity)}
            {...register("quantity")}
          />
          <FieldError message={errors.quantity?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Conte sobre o seu projeto *</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="Tipo de obra, número aproximado de páginas, prazo desejado e qualquer detalhe que ajude a entender o projeto."
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {/* Honeypot: invisible to humans, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input
          ref={honeypotRef}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => {
            setTurnstileToken("");
            turnstileRef.current?.reset();
          }}
          options={{ theme: "light", language: "pt-BR" }}
        />
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || captchaPending}
        className="w-full bg-navy font-semibold text-cream hover:bg-navy-deep sm:w-auto sm:self-start"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="size-4" />
            Enviar solicitação
          </>
        )}
      </Button>
      {captchaPending ? (
        <p className="-mt-3 text-xs text-muted-foreground">
          Aguarde a verificação de segurança para enviar.
        </p>
      ) : null}
    </form>
  );
}
