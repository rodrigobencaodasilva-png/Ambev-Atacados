// Email Templates para Ambev Brasil
// Todos os templates incluem logo SVG uniforme e são responsivos

// 1. AGUARDANDO CADASTRO - Cliente em análise de dados
const AWAITING_REGISTRATION_TEMPLATE = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #fff9e6 0%, #fffbf0 100%); padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(217, 119, 6, 0.12);">
  <div style="background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); padding: 30px 20px; text-align: center;">
    <div style="margin-bottom: 15px;">
      <svg style="width: 100%; max-width: 140px; height: auto; margin: 0 auto; display: block;" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="60" font-size="48" font-weight="bold" fill="white" font-family="Arial, sans-serif">ambev</text>
        <text x="10" y="22" font-size="16" font-weight="600" fill="white" font-family="Arial, sans-serif">CERVEJARIA</text>
      </svg>
    </div>
    <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0;">⏳ Aguardando Cadastro</h1>
    <div style="display: inline-block; background: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; text-transform: uppercase; letter-spacing: 1px;">📋 Dados em Análise</div>
  </div>

  <div style="padding: 40px; text-align: center;">
    <div style="font-size: 64px; margin-bottom: 20px;">📝</div>
    <h2 style="font-size: 24px; font-weight: 700; color: #d97706; margin-bottom: 12px;">Seus Dados Estão Sendo Analisados</h2>
    <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px; line-height: 1.6;">
      Olá {{customerName}}! Recebemos sua solicitação e estamos verificando seus dados de cadastro. Este é um processo importante para sua segurança. ✅
    </p>

    <div style="background: linear-gradient(135deg, #fff9e6 0%, #fef3c7 100%); border-left: 4px solid #d97706; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: left;">
      <div style="font-size: 12px; text-transform: uppercase; color: #d97706; font-weight: 600; letter-spacing: 1px; margin-bottom: 4px;">📧 Email Registrado</div>
      <div style="font-size: 16px; color: #1f2937; font-weight: 600; margin-bottom: 15px;">{{customerEmail}}</div>

      <div style="font-size: 12px; text-transform: uppercase; color: #d97706; font-weight: 600; letter-spacing: 1px; margin-bottom: 4px;">🆔 Referência</div>
      <div style="font-size: 16px; color: #1f2937; font-weight: 600; margin-bottom: 15px;">{{referenceCode}}</div>
    </div>

    <div style="margin: 30px 0; text-align: left;">
      <div style="display: flex; margin-bottom: 15px;">
        <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #d97706; color: white; border-radius: 50%; font-weight: 700; margin-right: 15px; flex-shrink: 0;">1</div>
        <div style="flex: 1; padding-top: 5px;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 2px;">✅ Solicitação Recebida</div>
          <div style="font-size: 14px; color: #6b7280;">Seu cadastro foi registrado com sucesso</div>
        </div>
      </div>

      <div style="display: flex; margin-bottom: 15px;">
        <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #d97706; color: white; border-radius: 50%; font-weight: 700; margin-right: 15px; flex-shrink: 0;">2</div>
        <div style="flex: 1; padding-top: 5px;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 2px;">⏳ Análise em Progresso</div>
          <div style="font-size: 14px; color: #6b7280;">Estamos verificando seus dados agora</div>
        </div>
      </div>

      <div style="display: flex; margin-bottom: 15px;">
        <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #d97706; color: white; border-radius: 50%; font-weight: 700; margin-right: 15px; flex-shrink: 0;">3</div>
        <div style="flex: 1; padding-top: 5px;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 2px;">📬 Aguardando Confirmação</div>
          <div style="font-size: 14px; color: #6b7280;">Você receberá notificação em breve</div>
        </div>
      </div>
    </div>

    <div style="height: 1px; background: linear-gradient(90deg, transparent, #d97706, transparent); margin: 30px 0;"></div>

    <p style="font-size: 14px; margin-bottom: 20px;">
      ⏱️ <strong>Tempo estimado:</strong> 2-4 horas de análise<br>
      📧 Você será notificado assim que for aprovado!
    </p>

    <button style="display: inline-block; background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); color: #ffffff; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 30px 0; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3); border: none; cursor: pointer;">📍 ACOMPANHAR CADASTRO</button>
  </div>

  <div style="background: #f8fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
    <div style="font-size: 12px; color: #6b7280; line-height: 1.6;">
      <strong>{{companyName}}</strong><br>
      © {{year}} {{companyName}}. Todos os direitos reservados.<br>Este é um e-mail automático sobre o seu pedido. Dúvidas? Responda esta mensagem ou escreva para {{contactEmail}}.
    </div>
  </div>
</div>
</body>
</html>`;

// 2. PEDIDO RECEBIDO - Confirmação com detalhes do pedido
const ORDER_RECEIVED_TEMPLATE = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f0f9f7 0%, #ffffff 100%); padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(5, 150, 105, 0.12);">
  <div style="background: linear-gradient(135deg, #0E6B5E 0%, #059669 100%); padding: 30px 20px; text-align: center;">
    <div style="margin-bottom: 15px;">
      <svg style="width: 100%; max-width: 140px; height: auto; margin: 0 auto; display: block;" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="60" font-size="48" font-weight="bold" fill="white" font-family="Arial, sans-serif">ambev</text>
        <text x="10" y="22" font-size="16" font-weight="600" fill="white" font-family="Arial, sans-serif">CERVEJARIA</text>
      </svg>
    </div>
    <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0;">✅ Pedido Recebido!</h1>
    <div style="display: inline-block; background: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; text-transform: uppercase;">🎉 Processando Agora</div>
  </div>

  <div style="padding: 40px; text-align: center;">
    <div style="font-size: 64px; margin-bottom: 20px;">📦</div>
    <h2 style="font-size: 24px; font-weight: 700; color: #0E6B5E; margin-bottom: 12px;">Seu Pedido foi Recebido com Sucesso!</h2>
    <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px; line-height: 1.6;">
      Obrigado, {{customerName}}! Seu pedido chegou em nosso sistema e está sendo processado. Acompanhe o status abaixo. 🚀
    </p>

    <div style="background: linear-gradient(135deg, #f0f9f7 0%, #e8f5f3 100%); border-left: 4px solid #0E6B5E; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: left;">
      <div style="font-size: 12px; text-transform: uppercase; color: #0E6B5E; font-weight: 600; letter-spacing: 1px; margin-bottom: 4px;">📧 Email de Confirmação</div>
      <div style="font-size: 16px; color: #1f2937; font-weight: 600; margin-bottom: 15px;">{{customerEmail}}</div>

      <div style="font-size: 12px; text-transform: uppercase; color: #0E6B5E; font-weight: 600; letter-spacing: 1px; margin-bottom: 4px;">🆔 Número do Pedido</div>
      <div style="font-size: 16px; color: #1f2937; font-weight: 600; margin-bottom: 15px;">{{orderNumber}}</div>

      <div style="font-size: 12px; text-transform: uppercase; color: #0E6B5E; font-weight: 600; letter-spacing: 1px; margin-bottom: 4px;">📅 Data do Pedido</div>
      <div style="font-size: 16px; color: #1f2937; font-weight: 600; margin-bottom: 15px;">{{orderDate}}</div>
    </div>

    <div style="background: #f0f9f7; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left;">
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #d1e5df;">
        <span style="color: #6b7280; font-weight: 600;">Subtotal</span>
        <span style="color: #0E6B5E; font-weight: 700;">R$ {{subtotal}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #d1e5df;">
        <span style="color: #6b7280; font-weight: 600;">Frete</span>
        <span style="color: #0E6B5E; font-weight: 700;">R$ {{shippingCost}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 12px 0; font-size: 18px;">
        <span style="color: #6b7280; font-weight: 600;">Total</span>
        <span style="color: #0E6B5E; font-weight: 700;">R$ {{total}}</span>
      </div>
    </div>

    <div style="height: 1px; background: linear-gradient(90deg, transparent, #0E6B5E, transparent); margin: 30px 0;"></div>

    <p style="font-size: 14px; margin-bottom: 20px;">
      ⏳ <strong>Próximo passo:</strong> Aguardando confirmação de pagamento<br>
      📧 Você receberá atualizações por email
    </p>

    <button style="display: inline-block; background: linear-gradient(135deg, #0E6B5E 0%, #059669 100%); color: #ffffff; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 30px 0; box-shadow: 0 4px 12px rgba(14, 107, 94, 0.3); border: none; cursor: pointer;">🔍 ACOMPANHAR PEDIDO</button>
  </div>

  <div style="background: #f8fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
    <div style="font-size: 12px; color: #6b7280; line-height: 1.6;">
      <strong>{{companyName}}</strong><br>
      © {{year}} {{companyName}}. Todos os direitos reservados.<br>Este é um e-mail automático sobre o seu pedido. Dúvidas? Responda esta mensagem ou escreva para {{contactEmail}}.
    </div>
  </div>
</div>
</body>
</html>`;

// 3. AGUARDANDO PAGAMENTO - ⚠️ URGENTE com timer de 20 MINUTOS
const AWAITING_PAYMENT_TEMPLATE = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%); padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(202, 138, 4, 0.15);">
  <div style="background: linear-gradient(135deg, #ca8a04 0%, #eab308 100%); padding: 30px 20px; text-align: center;">
    <div style="margin-bottom: 15px;">
      <svg style="width: 100%; max-width: 140px; height: auto; margin: 0 auto; display: block;" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="60" font-size="48" font-weight="bold" fill="white" font-family="Arial, sans-serif">ambev</text>
        <text x="10" y="22" font-size="16" font-weight="600" fill="white" font-family="Arial, sans-serif">CERVEJARIA</text>
      </svg>
    </div>
    <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0;">💳 Aguardando Pagamento</h1>
    <div style="display: inline-block; background: rgba(255, 255, 255, 0.25); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; text-transform: uppercase;">⚠️ Ação Necessária</div>
  </div>

  <div style="padding: 40px; text-align: center;">
    <div style="font-size: 64px; margin-bottom: 20px;">⏰</div>
    <h2 style="font-size: 24px; font-weight: 700; color: #ca8a04; margin-bottom: 12px;">Seu Pagamento Está Pendente!</h2>
    <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px; line-height: 1.6;">
      Olá {{customerName}}, precisamos confirmar seu pagamento para emitir a Nota Fiscal e processar seu pedido. ⏱️
    </p>

    <div style="background: #dc2626; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <div style="font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; margin-bottom: 8px; opacity: 0.9;">⏱️ Tempo Limite para Confirmar:</div>
      <div style="font-size: 48px; font-weight: 700; font-family: 'Courier New', monospace;">20 MIN</div>
      <div style="font-size: 12px; margin-top: 10px; text-align: center;">Após o prazo, o pedido é cancelado automaticamente.</div>
    </div>

    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fce7ae 100%); border-left: 4px solid #dc2626; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: left;">
      <div style="font-size: 24px; margin-bottom: 10px;">Atenção ao prazo</div>
      <div style="font-weight: 700; color: #dc2626; margin-bottom: 8px;">Sua NF não será emitida sem a confirmação do pagamento</div>
      <div style="color: #6b7280; line-height: 1.6;">
        O prazo para confirmar o pagamento é de apenas <strong>20 MINUTOS</strong>. Após este período, seu pedido pode ser cancelado automaticamente.
      </div>
    </div>

    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: left;">
      <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
        <span style="color: #6b7280; font-weight: 600;">Número do Pedido</span>
        <span style="color: #1f2937; font-weight: 700;">{{orderNumber}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
        <span style="color: #6b7280; font-weight: 600;">Valor Total</span>
        <span style="color: #1f2937; font-weight: 700;">R$ {{totalAmount}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
        <span style="color: #6b7280; font-weight: 600;">Vencimento</span>
        <span style="color: #dc2626; font-weight: 700;">{{dueDate}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 12px 0;">
        <span style="color: #6b7280; font-weight: 600;">Forma de Pagamento</span>
        <span style="color: #1f2937; font-weight: 700;">{{paymentMethod}}</span>
      </div>
    </div>

    <div style="height: 1px; background: linear-gradient(90deg, transparent, #ca8a04, transparent); margin: 30px 0;"></div>

    <p style="font-size: 14px; color: #dc2626; font-weight: 600; margin-bottom: 20px;">
      Confirme o pagamento para garantir seu pedido
    </p>

    <button style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 30px 0; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3); border: none; cursor: pointer;">💰 CONFIRMAR PAGAMENTO</button>

    <p style="font-size: 13px; margin-top: 20px;">
      Já pagou?
      <a href="#" style="color: #ca8a04; text-decoration: none; font-weight: 600;">Clique aqui para confirmar</a>
    </p>
  </div>

  <div style="background: #f8fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
    <div style="font-size: 12px; color: #6b7280; line-height: 1.6;">
      <strong>{{companyName}}</strong><br>
      Dúvidas? Entre em contato conosco pelo suporte<br>
      © {{year}} {{companyName}}. Todos os direitos reservados.<br>Este é um e-mail automático sobre o seu pedido. Dúvidas? Responda esta mensagem ou escreva para {{contactEmail}}.
    </div>
  </div>
</div>
</body>
</html>`;

// 4. BAIXA EM SISTEMA - Pagamento sendo processado
const PAYMENT_PROCESSING_TEMPLATE = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%); padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(3, 102, 214, 0.12);">
  <div style="background: linear-gradient(135deg, #0366d6 0%, #0584d4 100%); padding: 30px 20px; text-align: center;">
    <div style="margin-bottom: 15px;">
      <svg style="width: 100%; max-width: 140px; height: auto; margin: 0 auto; display: block;" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="60" font-size="48" font-weight="bold" fill="white" font-family="Arial, sans-serif">ambev</text>
        <text x="10" y="22" font-size="16" font-weight="600" fill="white" font-family="Arial, sans-serif">CERVEJARIA</text>
      </svg>
    </div>
    <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0;">⚙️ Processando Pagamento</h1>
    <div style="display: inline-block; background: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; text-transform: uppercase;">🔄 Em Processamento</div>
  </div>

  <div style="padding: 40px; text-align: center;">
    <div style="font-size: 64px; margin-bottom: 20px; opacity: 0.7;">💾</div>
    <h2 style="font-size: 24px; font-weight: 700; color: #0366d6; margin-bottom: 12px;">Pagamento Confirmado! Está Sendo Processado</h2>
    <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px; line-height: 1.6;">
      Ótimo, {{customerName}}! Recebemos seu pagamento e estamos fazendo a baixa em nosso sistema. Sua NF será emitida em breve! 🔜
    </p>

    <div style="background: linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%); border-left: 4px solid #0366d6; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: left;">
      <div style="font-weight: 700; color: #0366d6; margin-bottom: 15px;">📊 Status do Processamento</div>

      <div style="background: #e0e7ff; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 15px;">
        <div style="background: linear-gradient(90deg, #0366d6 0%, #0584d4 100%); height: 100%; width: 40%; border-radius: 4px;"></div>
      </div>

      <div style="display: flex; margin-bottom: 12px;">
        <div style="margin-right: 12px; font-size: 18px;">✅</div>
        <div style="flex: 1; text-align: left;">
          <div style="font-weight: 600; color: #1f2937;">Pagamento Recebido</div>
          <div style="font-size: 13px; color: #6b7280; margin-top: 2px;">Confirmado em {{paymentDate}}</div>
        </div>
      </div>

      <div style="display: flex; margin-bottom: 12px;">
        <div style="margin-right: 12px; font-size: 18px;">⏳</div>
        <div style="flex: 1; text-align: left;">
          <div style="font-weight: 600; color: #1f2937;">Baixa em Sistema</div>
          <div style="font-size: 13px; color: #6b7280; margin-top: 2px;">Processando agora...</div>
        </div>
      </div>

      <div style="display: flex; margin-bottom: 12px;">
        <div style="margin-right: 12px; font-size: 18px;">📋</div>
        <div style="flex: 1; text-align: left;">
          <div style="font-weight: 600; color: #1f2937;">Emissão da NF</div>
          <div style="font-size: 13px; color: #6b7280; margin-top: 2px;">Em breve (até {{emissionTime}})</div>
        </div>
      </div>
    </div>

    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left;">
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="color: #6b7280; font-weight: 600;">Número do Pedido</span>
        <span style="color: #0366d6; font-weight: 700;">{{orderNumber}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="color: #6b7280; font-weight: 600;">Valor Pago</span>
        <span style="color: #0366d6; font-weight: 700;">R$ {{paidAmount}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="color: #6b7280; font-weight: 600;">Forma de Pagamento</span>
        <span style="color: #0366d6; font-weight: 700;">{{paymentMethod}}</span>
      </div>
    </div>

    <div style="height: 1px; background: linear-gradient(90deg, transparent, #0366d6, transparent); margin: 30px 0;"></div>

    <p style="font-size: 14px; margin-bottom: 20px;">
      ⏱️ <strong>Tempo estimado:</strong> Sua NF será emitida em até {{estimatedTime}}<br>
      📧 Você receberá notificação assim que for emitida!
    </p>

    <button style="display: inline-block; background: linear-gradient(135deg, #0366d6 0%, #0584d4 100%); color: #ffffff; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 30px 0; box-shadow: 0 4px 12px rgba(3, 102, 214, 0.3); border: none; cursor: pointer;">👁️ ACOMPANHAR PEDIDO</button>
  </div>

  <div style="background: #f8fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
    <div style="font-size: 12px; color: #6b7280; line-height: 1.6;">
      <strong>{{companyName}}</strong><br>
      © {{year}} {{companyName}}. Todos os direitos reservados.<br>Este é um e-mail automático sobre o seu pedido. Dúvidas? Responda esta mensagem ou escreva para {{contactEmail}}.
    </div>
  </div>
</div>
</body>
</html>`;

// 5. EMITINDO NF - Nota Fiscal sendo gerada
const EMITTING_INVOICE_TEMPLATE = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%); padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(34, 197, 94, 0.12);">
  <div style="background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); padding: 30px 20px; text-align: center;">
    <div style="margin-bottom: 15px;">
      <svg style="width: 100%; max-width: 140px; height: auto; margin: 0 auto; display: block;" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="60" font-size="48" font-weight="bold" fill="white" font-family="Arial, sans-serif">ambev</text>
        <text x="10" y="22" font-size="16" font-weight="600" fill="white" font-family="Arial, sans-serif">CERVEJARIA</text>
      </svg>
    </div>
    <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0;">📄 Emitindo Nota Fiscal</h1>
    <div style="display: inline-block; background: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; text-transform: uppercase;">✨ Quase Pronto!</div>
  </div>

  <div style="padding: 40px; text-align: center;">
    <div style="font-size: 64px; margin-bottom: 20px;">🖨️</div>
    <h2 style="font-size: 24px; font-weight: 700; color: #16a34a; margin-bottom: 12px;">Sua NF Está Sendo Emitida!</h2>
    <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px; line-height: 1.6;">
      Excelente, {{customerName}}! Seu pagamento foi processado e sua Nota Fiscal está sendo gerada agora. Falta pouco! 🎯
    </p>

    <div style="background: linear-gradient(135deg, #dcfce7 0%, #c6f6d5 100%); border-left: 4px solid #16a34a; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: left;">
      <div style="font-weight: 700; color: #16a34a; margin-bottom: 10px;">✅ Pagamento Confirmado com Sucesso!</div>
      <div style="color: #155e3b; line-height: 1.6;">
        Seu pedido passou por todas as verificações e agora estamos emitindo a Nota Fiscal. Este é o último passo antes do envio.
      </div>
    </div>

    <div style="text-align: left; margin: 20px 0;">
      <div style="display: flex; align-items: center; padding: 12px; background: #f0fdf4; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #16a34a;">
        <div style="font-size: 20px; margin-right: 12px;">✅</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #1f2937;">Cadastro Validado</div>
          <div style="font-size: 13px; color: #6b7280; margin-top: 2px;">Seus dados estão corretos</div>
        </div>
      </div>

      <div style="display: flex; align-items: center; padding: 12px; background: #f0fdf4; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #16a34a;">
        <div style="font-size: 20px; margin-right: 12px;">✅</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #1f2937;">Pagamento Recebido</div>
          <div style="font-size: 13px; color: #6b7280; margin-top: 2px;">R$ {{paidAmount}} confirmado</div>
        </div>
      </div>

      <div style="display: flex; align-items: center; padding: 12px; background: #f0fdf4; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #16a34a;">
        <div style="font-size: 20px; margin-right: 12px;">⏳</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #1f2937;">NF Sendo Emitida</div>
          <div style="font-size: 13px; color: #6b7280; margin-top: 2px;">Processos finais em andamento</div>
        </div>
      </div>

      <div style="display: flex; align-items: center; padding: 12px; background: #f0fdf4; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #16a34a;">
        <div style="font-size: 20px; margin-right: 12px;">⏳</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #1f2937;">Preparando Envio</div>
          <div style="font-size: 13px; color: #6b7280; margin-top: 2px;">Próximo passo após emissão da NF</div>
        </div>
      </div>
    </div>

    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left;">
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
        <span style="color: #6b7280; font-weight: 600;">Número do Pedido</span>
        <span style="color: #16a34a; font-weight: 700;">{{orderNumber}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
        <span style="color: #6b7280; font-weight: 600;">Valor Total</span>
        <span style="color: #16a34a; font-weight: 700;">R$ {{paidAmount}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
        <span style="color: #6b7280; font-weight: 600;">Status NF</span>
        <span style="color: #16a34a; font-weight: 700;">Emitindo...</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="color: #6b7280; font-weight: 600;">Tempo Estimado</span>
        <span style="color: #16a34a; font-weight: 700;">{{estimatedTime}}</span>
      </div>
    </div>

    <div style="height: 1px; background: linear-gradient(90deg, transparent, #16a34a, transparent); margin: 30px 0;"></div>

    <p style="font-size: 14px; margin-bottom: 20px;">
      📧 <strong>Você receberá:</strong><br>
      1️⃣ Sua Nota Fiscal (XML + PDF)<br>
      2️⃣ Código de Rastreamento<br>
      3️⃣ Instruções de Entrega
    </p>

    <button style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: #ffffff; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 30px 0; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3); border: none; cursor: pointer;">🔍 ACOMPANHAR NF</button>

    <p style="text-align: center; margin-top: 20px; font-size: 13px; color: #6b7280;">
      Dúvidas?
      <a href="#" style="color: #16a34a; text-decoration: none; font-weight: 600;">Fale com nosso suporte</a>
    </p>
  </div>

  <div style="background: #f8fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
    <div style="font-size: 12px; color: #6b7280; line-height: 1.6;">
      <strong>{{companyName}}</strong><br>
      Obrigado por sua preferência! 🙏<br>
      © {{year}} {{companyName}}. Todos os direitos reservados.<br>Este é um e-mail automático sobre o seu pedido. Dúvidas? Responda esta mensagem ou escreva para {{contactEmail}}.
    </div>
  </div>
</div>
</body>
</html>`;

module.exports = {
  AWAITING_REGISTRATION_TEMPLATE,
  ORDER_RECEIVED_TEMPLATE,
  AWAITING_PAYMENT_TEMPLATE,
  PAYMENT_PROCESSING_TEMPLATE,
  EMITTING_INVOICE_TEMPLATE,
};
