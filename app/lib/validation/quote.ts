import { z } from "zod";

export const projectTypes = [
  { value: "livro", label: "Livro impresso" },
  { value: "ebook", label: "E-book" },
  { value: "artigo", label: "Artigo científico" },
  { value: "tcc", label: "TCC / Monografia" },
  { value: "dissertacao", label: "Dissertação de mestrado" },
  { value: "tese", label: "Tese de doutorado" },
  { value: "outro", label: "Outro projeto" },
] as const;

const projectTypeValues = [
  "livro",
  "ebook",
  "artigo",
  "tcc",
  "dissertacao",
  "tese",
  "outro",
] as const;

export const quoteFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo.")
    .max(120, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .max(200, "E-mail muito longo."),
  phone: z
    .string()
    .trim()
    .max(40, "Telefone muito longo.")
    .optional()
    .or(z.literal("")),
  institution: z
    .string()
    .trim()
    .max(160, "Nome da instituição muito longo.")
    .optional()
    .or(z.literal("")),
  projectType: z.enum(projectTypeValues, {
    errorMap: () => ({ message: "Selecione o tipo de projeto." }),
  }),
  quantity: z
    .string()
    .trim()
    .max(30, "Valor muito longo.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre o seu projeto (mínimo de 10 caracteres).")
    .max(5000, "Mensagem muito longa."),
  reference: z
    .string()
    .trim()
    .max(200, "Referência muito longa.")
    .optional()
    .or(z.literal("")),
});

export const quoteRequestSchema = quoteFieldsSchema.extend({
  captchaToken: z.string().min(1, "Confirme que você não é um robô."),
});

export type QuoteFields = z.infer<typeof quoteFieldsSchema>;
export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
