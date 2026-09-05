// Templates de email — Ambev S.A
// Design moderno e profissional com layout em tabelas (compatível com Gmail, Outlook, Apple Mail e celulares).
// Placeholders {{...}} são preenchidos em lib/email.js.
//
// Comuns a todos: {{logoUrl}} {{companyName}} {{contactEmail}} {{whatsappUrl}} {{whatsappDisplay}} {{year}} {{deadlineMinutes}}

const C = {
  primary: "#003D99",
  primaryLight: "#0052CC",
  accent: "#F5B700",
  accentDark: "#C9930A",
  ink: "#1a1a1a",
  text: "#2d3748",
  muted: "#718096",
  lightGray: "#f7fafc",
  border: "#e2e8f0",
  success: "#22863a",
  error: "#cb2431",
  warning: "#ffd33d",
  bg: "#ffffff",
};

function row(label, value, opts = {}) {
  const strong = opts.strong ? `font-weight:800;font-size:16px;color:${C.primary};` : `font-weight:600;color:${C.text};`;
  return `
      <tr>
        <td valign="top" style="padding:12px 0;border-bottom:1px solid ${C.border};font-size:13px;color:${C.muted};font-weight:500;">${label}</td>
        <td align="right" valign="top" style="padding:12px 12px 12px 0;border-bottom:1px solid ${C.border};font-size:14px;line-height:1.6;${strong}">${value}</td>
      </tr>`;
}

function button(label, url, color) {
  return `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:32px auto 12px;">
        <tr>
          <td align="center" bgcolor="${color}" style="border-radius:8px;box-shadow:0 4px 12px rgba(0,61,153,0.2);">
            <a href="${url}" target="_blank" style="display:inline-block;padding:14px 40px;font-family:'Segoe UI',Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;letter-spacing:0.3px;">${label}</a>
          </td>
        </tr>
      </table>`;
}

function shell({ accent, badge, title, intro, content, cta, secondary, preheader }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#f8f9fa;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f9fa;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:100%;width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,61,153,0.08);">

        <!-- Logo Header — mesmo azul do PNG da logo (#0052CC), para a logo se fundir ao fundo -->
        <tr>
          <td bgcolor="#0052CC" style="background:#0052CC;padding:28px 40px;text-align:center;">
            <img src="{{logoUrl}}" width="200" alt="{{companyName}}" style="display:block;max-width:200px;height:auto;border:0;margin:0 auto;">
          </td>
        </tr>

        <!-- Faixa de Status -->
        <tr>
          <td style="height:4px;background:${accent};font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Conteúdo Principal -->
        <tr>
          <td style="padding:40px 40px 0;font-family:inherit;">
            <!-- Badge -->
            <div style="display:inline-block;background:${accent}15;color:${accent};font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 14px;border-radius:6px;margin-bottom:16px;">${badge}</div>

            <!-- Título -->
            <h1 style="margin:14px 0 12px;font-size:28px;line-height:1.3;color:${C.primary};font-weight:700;letter-spacing:-0.5px;">${title}</h1>

            <!-- Saudação -->
            <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${C.text};">Olá, <strong style="color:${C.primary};">{{customerName}}</strong>.</p>

            <!-- Introdução -->
            <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.text};">${intro}</p>
          </td>
        </tr>

        <!-- Conteúdo Detalhado -->
        <tr>
          <td style="padding:0 40px 28px;font-family:inherit;">
            ${content}
          </td>
        </tr>

        <!-- CTA e Secundário -->
        <tr>
          <td align="center" style="padding:8px 40px 40px;font-family:inherit;">
            ${cta || ""}
            ${secondary ? `<p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:${C.muted};">${secondary}</p>` : ""}
          </td>
        </tr>

        <!-- Separador -->
        <tr>
          <td style="height:1px;background:${C.border};font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Rodapé Premium -->
        <tr>
          <td style="background:${C.primary};padding:36px 40px;font-family:inherit;text-align:center;">
            <div style="font-size:16px;font-weight:700;color:#ffffff;letter-spacing:0.3px;">{{companyName}}</div>
            <div style="font-size:13px;color:#a8d0ff;margin-top:12px;line-height:1.8;">
              <a href="{{whatsappUrl}}" style="color:#F5B700;text-decoration:none;font-weight:600;">WhatsApp: {{whatsappDisplay}}</a> &nbsp;·&nbsp; <a href="mailto:{{contactEmail}}" style="color:#F5B700;text-decoration:none;font-weight:600;">{{contactEmail}}</a>
            </div>
            <div style="font-size:12px;color:#7ba5d8;margin-top:14px;line-height:1.6;">
              Este é um e-mail automático. Se tiver dúvidas, responda esta mensagem.
            </div>
            <div style="font-size:11px;color:#5a7fa3;margin-top:16px;border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;">
              © {{year}} {{companyName}}. Todos os direitos reservados.
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 1. AGUARDANDO CADASTRO
// ---------------------------------------------------------------------------
const AWAITING_REGISTRATION_TEMPLATE = shell({
  accent: C.accentDark,
  badge: "Cadastro em análise",
  title: "Recebemos o seu cadastro",
  preheader: "Seu cadastro {{referenceCode}} foi recebido e está em análise.",
  intro: "Seu cadastro foi recebido com sucesso e já está em análise pela nossa equipe. Em breve você receberá a confirmação para começar a fazer pedidos.",
  content: `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.lightGray};border-radius:10px;padding:2px 20px;margin-top:20px;">
      ${row("Código do cadastro", "{{referenceCode}}")}
      ${row("E-mail informado", "{{customerEmail}}")}
      ${row("Situação", '<span style="color:' + C.accentDark + ';font-weight:700;">⏳ Em análise</span>')}
    </table>`,
  cta: button("Falar com a equipe no WhatsApp", "{{whatsappUrl}}", C.primaryLight),
  secondary: "Se você não fez este cadastro, ignore este e-mail.",
});

// ---------------------------------------------------------------------------
// 2. PEDIDO RECEBIDO
// ---------------------------------------------------------------------------
const ORDER_RECEIVED_TEMPLATE = shell({
  accent: C.primaryLight,
  badge: "✓ Pedido recebido",
  title: "Pedido {{orderNumber}} recebido com sucesso",
  preheader: "Pedido {{orderNumber}} no valor de R$ {{total}} recebido em {{orderDate}}.",
  intro: "Recebemos seu pedido e ele já está registrado no nosso sistema. Confira abaixo os detalhes.",
  content: `
    {{itemsBlock}}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.lightGray};border-radius:10px;padding:2px 20px;margin-top:20px;">
      ${row("Número do pedido", "<strong>{{orderNumber}}</strong>")}
      ${row("Data do pedido", "{{orderDate}}")}
      ${row("Subtotal", "R$ {{subtotal}}")}
      ${row("Frete", "{{shippingLabel}}")}
      ${row("Total", "R$ {{total}}", { strong: true })}
    </table>
    {{deliveryBlock}}`,
  cta: button("Acompanhar no WhatsApp", "{{whatsappUrl}}", C.primaryLight),
});

// ---------------------------------------------------------------------------
// 3. AGUARDANDO PAGAMENTO — prazo de {{deadlineMinutes}} minutos
// ---------------------------------------------------------------------------
const AWAITING_PAYMENT_TEMPLATE = shell({
  accent: "#E63946",
  badge: "⏰ Pagamento pendente",
  title: "Confirme o pagamento do pedido {{orderNumber}}",
  preheader: "Pedido {{orderNumber}}: R$ {{totalAmount}} via {{paymentMethod}}. Prazo de {{deadlineMinutes}} minutos.",
  intro: "Para emitir a nota fiscal, precisamos da confirmação do pagamento dentro do prazo abaixo.",
  content: `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
      <tr>
        <td align="center" style="background:#FFF5F5;border:2px solid #E63946;border-radius:10px;padding:24px 20px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#991B1B;">Prazo restante</div>
          <div style="font-size:44px;font-weight:800;color:#E63946;line-height:1;margin:8px 0 6px;letter-spacing:-1px;">{{deadlineMinutes}} min</div>
          <div style="font-size:14px;color:#7F1D1D;line-height:1.5;">até <strong>{{dueDate}}</strong></div>
          <div style="font-size:12px;color:#a8495a;margin-top:8px;">Após este prazo, o pedido será cancelado.</div>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.lightGray};border-radius:10px;padding:2px 20px;margin-top:20px;">
      ${row("Número do pedido", "<strong>{{orderNumber}}</strong>")}
      ${row("Método de pagamento", "{{paymentMethod}}")}
      ${row("Vencimento", "{{dueDate}}")}
      ${row("Valor a pagar", "R$ {{totalAmount}}", { strong: true })}
    </table>`,
  cta: button("Confirmar Pagamento", "{{whatsappUrl}}", "#E63946"),
  secondary: 'Já pagou? <a href="{{whatsappUrl}}" style="color:' + C.primary + ';font-weight:700;text-decoration:none;">Clique aqui</a> e nos envie o comprovante.',
});

// ---------------------------------------------------------------------------
// 4. BAIXA EM SISTEMA (pagamento confirmado)
// ---------------------------------------------------------------------------
const PAYMENT_PROCESSING_TEMPLATE = shell({
  accent: "#0366D6",
  badge: "✓ Pagamento confirmado",
  title: "Pagamento confirmado! Pedido em processamento",
  preheader: "Recebemos R$ {{paidAmount}} do pedido {{orderNumber}}. A nota fiscal está sendo preparada.",
  intro: "Seu pagamento foi confirmado! O pedido está em processamento e a nota fiscal já está sendo preparada. Você receberá um novo e-mail assim que ela for emitida.",
  content: `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
      <tr>
        <td style="padding:0 0 8px;font-size:12px;font-weight:700;color:${C.muted};text-transform:uppercase;letter-spacing:1px;">Status do pedido</td>
      </tr>
      <tr>
        <td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="25%" style="height:6px;background:#22863a;border-radius:6px 0 0 6px;font-size:0;">&nbsp;</td>
              <td width="25%" style="height:6px;background:#22863a;font-size:0;">&nbsp;</td>
              <td width="25%" style="height:6px;background:#0366D6;font-size:0;">&nbsp;</td>
              <td width="25%" style="height:6px;background:${C.border};border-radius:0 6px 6px 0;font-size:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="font-size:11px;color:#22863a;padding-top:6px;font-weight:700;">Recebido</td>
              <td style="font-size:11px;color:#22863a;padding-top:6px;font-weight:700;">Pagamento</td>
              <td style="font-size:11px;color:#0366D6;padding-top:6px;font-weight:700;">Processando</td>
              <td style="font-size:11px;color:${C.muted};padding-top:6px;">Nota Fiscal</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.lightGray};border-radius:10px;padding:2px 20px;margin-top:20px;">
      ${row("Número do pedido", "<strong>{{orderNumber}}</strong>")}
      ${row("Método de pagamento", "{{paymentMethod}}")}
      ${row("Data do pagamento", "{{paymentDate}}")}
      ${row("Previsão da NF", "{{estimatedTime}}")}
      ${row("Valor pago", "R$ {{paidAmount}}", { strong: true })}
    </table>`,
  cta: button("Acompanhar no WhatsApp", "{{whatsappUrl}}", "#0366D6"),
});

// ---------------------------------------------------------------------------
// 5. EMITINDO NOTA FISCAL
// ---------------------------------------------------------------------------
const EMITTING_INVOICE_TEMPLATE = shell({
  accent: "#22863a",
  badge: "📄 Nota fiscal em emissão",
  title: "Pedido {{orderNumber}} - Última etapa!",
  preheader: "A nota fiscal do pedido {{orderNumber}} está sendo emitida. Previsão: {{estimatedTime}}.",
  intro: "Estamos na reta final! A nota fiscal do seu pedido está sendo emitida. Assim que estiver pronta, enviamos o documento.",
  content: `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.lightGray};border-radius:10px;padding:2px 20px;margin-top:20px;">
      ${row("✓ Pedido recebido", '<span style="color:#22863a;font-weight:700;">concluído</span>')}
      ${row("✓ Pagamento", '<span style="color:#22863a;font-weight:700;">confirmado</span>')}
      ${row("✓ Processamento", '<span style="color:#22863a;font-weight:700;">concluído</span>')}
      ${row("📄 Nota fiscal", '<span style="color:#0366D6;font-weight:700;">em emissão · {{estimatedTime}}</span>')}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f7ff;border-radius:10px;padding:2px 20px;margin-top:20px;border-left:4px solid #0366D6;">
      ${row("Número do pedido", "<strong>{{orderNumber}}</strong>")}
      ${row("Valor do pedido", "R$ {{paidAmount}}", { strong: true })}
    </table>`,
  cta: button("Acompanhar no WhatsApp", "{{whatsappUrl}}", "#22863a"),
  secondary: "Assim que a nota fiscal for emitida, você receberá um novo e-mail com o documento.",
});

// Bloco de itens do pedido (montado em lib/email.js quando há itens)
function itemsBlock(items) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const lines = String(items || "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  if (!lines.length) return "";
  const rows = lines.map((l, i) => {
    const m = l.match(/^(.*?)\s*(?:—|-)\s*(R\$\s*[\d.,]+)\s*$/);
    const name = m ? m[1] : l, price = m ? m[2] : "";
    return `<tr>
      <td style="padding:12px 0;border-bottom:1px solid ${C.border};font-size:14px;color:${C.text};">${esc(name)}</td>
      <td align="right" style="padding:12px 12px 12px 0;border-bottom:1px solid ${C.border};font-size:14px;font-weight:700;color:${C.primary};white-space:nowrap;">${esc(price)}</td>
    </tr>`;
  }).join("");
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};border:1px solid ${C.border};border-radius:10px;padding:2px 20px;margin-top:20px;overflow:hidden;">
      <tr><td colspan="2" style="padding:12px 0 8px;font-size:12px;font-weight:700;color:${C.muted};text-transform:uppercase;letter-spacing:0.8px;">Itens do Pedido (${lines.length})</td></tr>
      ${rows}
    </table>`;
}

// Bloco de entrega / observações (montado em lib/email.js quando há dados)
function deliveryBlock({ delivery, notes, receiver } = {}) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const parts = [];
  if (delivery && String(delivery).trim()) parts.push(row("🚚 Entrega", esc(String(delivery).trim()).replace(/\n/g, "<br>")));
  if (receiver && String(receiver).trim()) parts.push(row("👤 Recebedor", esc(receiver)));
  if (notes && String(notes).trim()) parts.push(row("📝 Observação", esc(notes)));
  if (!parts.length) return "";
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.lightGray};border-radius:10px;padding:2px 20px;margin-top:20px;border-left:4px solid ${C.accent};">
      ${parts.join("")}
    </table>`;
}

module.exports = {
  deliveryBlock,
  AWAITING_REGISTRATION_TEMPLATE,
  ORDER_RECEIVED_TEMPLATE,
  AWAITING_PAYMENT_TEMPLATE,
  PAYMENT_PROCESSING_TEMPLATE,
  EMITTING_INVOICE_TEMPLATE,
  itemsBlock,
};
