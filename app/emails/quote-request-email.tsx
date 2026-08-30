import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { projectTypes, type QuoteFields } from "@/lib/validation/quote";

const styles = {
  body: {
    backgroundColor: "#fdf6ec",
    fontFamily:
      "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#2c2e3e",
    padding: "24px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid rgba(44, 46, 62, 0.15)",
    padding: "32px",
    maxWidth: "560px",
  },
  brand: {
    fontSize: "12px",
    letterSpacing: "4px",
    textTransform: "uppercase" as const,
    color: "#302b70",
    margin: "0 0 8px",
  },
  heading: {
    fontSize: "22px",
    fontWeight: 700,
    margin: "0 0 24px",
  },
  label: {
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "#5f6172",
    margin: "0 0 2px",
  },
  value: {
    fontSize: "15px",
    margin: "0 0 16px",
  },
  message: {
    fontSize: "15px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap" as const,
    margin: 0,
  },
  hr: {
    borderColor: "rgba(44, 46, 62, 0.12)",
    margin: "20px 0",
  },
  footer: {
    fontSize: "12px",
    color: "#5f6172",
    margin: "16px 0 0",
  },
};

export function QuoteRequestEmail({
  name,
  email,
  phone,
  institution,
  projectType,
  quantity,
  message,
  reference,
}: QuoteFields) {
  const projectTypeLabel =
    projectTypes.find((type) => type.value === projectType)?.label ??
    projectType;

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Nova solicitação de orçamento de {name}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.brand}>KR Editorial</Text>
          <Heading style={styles.heading}>
            Nova solicitação de orçamento
          </Heading>

          <Section>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{name}</Text>

            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.value}>{email}</Text>

            {phone ? (
              <>
                <Text style={styles.label}>Telefone / WhatsApp</Text>
                <Text style={styles.value}>{phone}</Text>
              </>
            ) : null}

            {institution ? (
              <>
                <Text style={styles.label}>Instituição</Text>
                <Text style={styles.value}>{institution}</Text>
              </>
            ) : null}

            <Text style={styles.label}>Tipo de projeto</Text>
            <Text style={styles.value}>{projectTypeLabel}</Text>

            {quantity ? (
              <>
                <Text style={styles.label}>Tiragem estimada</Text>
                <Text style={styles.value}>{quantity}</Text>
              </>
            ) : null}

            {reference ? (
              <>
                <Text style={styles.label}>Obra de referência</Text>
                <Text style={styles.value}>{reference}</Text>
              </>
            ) : null}
          </Section>

          <Hr style={styles.hr} />

          <Section>
            <Text style={styles.label}>Mensagem</Text>
            <Text style={styles.message}>{message}</Text>
          </Section>

          <Hr style={styles.hr} />

          <Text style={styles.footer}>
            Enviado pelo formulário de orçamento do site da KR Editorial.
            Responda diretamente a este e-mail para falar com {name}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default QuoteRequestEmail;
