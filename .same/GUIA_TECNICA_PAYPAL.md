# Guía Técnica: Integración de Pagos Recurrentes con PayPal

## Resumen del Flujo de Suscripción

```
[Cliente] → [Selecciona Plan] → [Botón PayPal] → [PayPal Checkout] → [Suscripción Activa] → [Factura Automática]
```

---

## 1. Crear Productos y Planes en PayPal Business

### Paso 1: Accede al Panel de PayPal Business
1. Ve a [business.paypal.com](https://business.paypal.com)
2. Inicia sesión con tu cuenta Business
3. Navega a **Pay & Get Paid** → **Subscriptions**

### Paso 2: Crear el Producto (DevOps Services)
```
Nombre del Producto: DevOps Pro - Servicios de Consultoría
Tipo: SERVICE
Categoría: SOFTWARE
```

### Paso 3: Crear los Planes de Suscripción

**Plan Starter ($997/mes):**
```json
{
  "product_id": "PROD-DEVOPS-001",
  "name": "DevOps Pro - Starter",
  "description": "Plan Starter: 3 proyectos, CI/CD básico, soporte email",
  "billing_cycles": [
    {
      "frequency": {
        "interval_unit": "MONTH",
        "interval_count": 1
      },
      "tenure_type": "REGULAR",
      "sequence": 1,
      "total_cycles": 0,
      "pricing_scheme": {
        "fixed_price": {
          "value": "997",
          "currency_code": "USD"
        }
      }
    }
  ],
  "payment_preferences": {
    "auto_bill_outstanding": true,
    "payment_failure_threshold": 3
  }
}
```

**Plan Enterprise ($2,997/mes):**
```json
{
  "product_id": "PROD-DEVOPS-001",
  "name": "DevOps Pro - Enterprise",
  "description": "Plan Enterprise: Proyectos ilimitados, consultor dedicado, soporte prioritario",
  "billing_cycles": [
    {
      "frequency": {
        "interval_unit": "MONTH",
        "interval_count": 1
      },
      "tenure_type": "REGULAR",
      "sequence": 1,
      "total_cycles": 0,
      "pricing_scheme": {
        "fixed_price": {
          "value": "2997",
          "currency_code": "USD"
        }
      }
    }
  ],
  "payment_preferences": {
    "auto_bill_outstanding": true,
    "payment_failure_threshold": 3
  }
}
```

---

## 2. Integración en Wix

### Opción A: Usando Wix Payments (Recomendado)
1. Ve a **Settings** → **Accept Payments**
2. Conecta tu cuenta PayPal Business
3. En **Pricing Plans**, crea los planes con precios recurrentes
4. Wix genera automáticamente los botones de suscripción

### Opción B: Botones PayPal Personalizados
1. En PayPal, ve a **Tools** → **All Tools** → **PayPal Buttons**
2. Selecciona "Subscribe" button
3. Configura el plan ID obtenido en el paso anterior
4. Copia el código HTML generado
5. En Wix, usa el elemento **HTML iframe** para insertar el botón

```html
<!-- Código de botón PayPal para Wix -->
<div id="paypal-button-container-P-XXXXX"></div>
<script src="https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID&vault=true&intent=subscription"></script>
<script>
  paypal.Buttons({
    style: {
      shape: 'pill',
      color: 'blue',
      layout: 'vertical',
      label: 'subscribe'
    },
    createSubscription: function(data, actions) {
      return actions.subscription.create({
        'plan_id': 'P-XXXXXXXXXXXXXXXXX' // Tu Plan ID
      });
    },
    onApprove: function(data, actions) {
      // Redirigir a página de éxito
      window.location.href = '/gracias';
    }
  }).render('#paypal-button-container-P-XXXXX');
</script>
```

---

## 3. Integración en WordPress

### Plugin Recomendado: WooCommerce + PayPal Subscriptions

1. **Instalar plugins:**
   - WooCommerce
   - WooCommerce Subscriptions
   - WooCommerce PayPal Payments

2. **Configurar PayPal:**
   - Ve a WooCommerce → Settings → Payments
   - Activa "PayPal"
   - Conecta tu cuenta Business
   - Habilita "Subscriptions" en las opciones avanzadas

3. **Crear Productos de Suscripción:**
   - Products → Add New
   - Tipo: "Simple Subscription"
   - Precio: $997/mes o $2,997/mes
   - Período: Monthly

### Código Personalizado (sin WooCommerce)

```php
<!-- Botón en tu tema de WordPress -->
<div id="paypal-button-starter"></div>

<script src="https://www.paypal.com/sdk/js?client-id=<?php echo PAYPAL_CLIENT_ID; ?>&vault=true&intent=subscription"></script>
<script>
paypal.Buttons({
  createSubscription: function(data, actions) {
    return actions.subscription.create({
      'plan_id': '<?php echo PAYPAL_STARTER_PLAN_ID; ?>'
    });
  },
  onApprove: function(data, actions) {
    // Guardar subscription ID en base de datos
    fetch('/wp-json/devops/v1/subscription', {
      method: 'POST',
      body: JSON.stringify({
        subscriptionID: data.subscriptionID,
        planType: 'starter'
      })
    }).then(function() {
      window.location.href = '/bienvenido';
    });
  }
}).render('#paypal-button-starter');
</script>
```

---

## 4. Facturación Automática

### Configuración en PayPal Business

PayPal genera automáticamente:
- ✅ Factura mensual enviada por email
- ✅ Recibos de pago
- ✅ Notificaciones de renovación
- ✅ Alertas de pago fallido

### Personalizar Emails de Factura
1. PayPal Business → Settings → Business Information
2. Edita el logo y datos de facturación
3. Customiza el mensaje de las facturas

### Webhooks para tu Sistema
```javascript
// Endpoint para recibir notificaciones de PayPal
app.post('/api/paypal-webhook', (req, res) => {
  const event = req.body;

  switch(event.event_type) {
    case 'BILLING.SUBSCRIPTION.ACTIVATED':
      // Nueva suscripción activa
      activateUser(event.resource.subscriber.email_address);
      break;
    case 'BILLING.SUBSCRIPTION.CANCELLED':
      // Suscripción cancelada
      deactivateUser(event.resource.id);
      break;
    case 'PAYMENT.SALE.COMPLETED':
      // Pago mensual completado
      recordPayment(event.resource);
      break;
  }

  res.status(200).send('OK');
});
```

---

## 5. Checklist de Implementación

- [ ] Cuenta PayPal Business verificada
- [ ] Productos creados en PayPal
- [ ] Planes de suscripción configurados (Starter + Enterprise)
- [ ] Botones integrados en la web
- [ ] Página de "Gracias" configurada
- [ ] Emails de bienvenida automatizados
- [ ] Webhooks configurados (opcional pero recomendado)
- [ ] Pruebas en Sandbox de PayPal
- [ ] Cambio a modo producción

---

## 6. IDs de Ejemplo para Testing

**Sandbox (Pruebas):**
```
Client ID: AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
Plan Starter: P-3RX065706M3469222L5IFM4I
Plan Enterprise: P-5ML4271244454362WXNWU5NQ
```

**Producción:** (Reemplazar con tus IDs reales)
```
Client ID: [TU_CLIENT_ID_PRODUCCION]
Plan Starter: [TU_PLAN_ID_STARTER]
Plan Enterprise: [TU_PLAN_ID_ENTERPRISE]
```

---

## Soporte

Para dudas sobre la implementación:
- Documentación PayPal: https://developer.paypal.com/docs/subscriptions/
- Soporte DevOpsPro: support@devopspro.com
