# DevOps Pro - Landing Page

## Estado Actual
- [x] Repositorio clonado desde GitHub
- [x] Landing page funcional con Next.js + shadcn/ui
- [x] Logo de MercadoPago actualizado
- [x] Credenciales de MercadoPago configuradas (PRODUCCIÓN)
- [x] Moneda cambiada a COP (pesos colombianos)
- [x] Precio: $60,000 COP por hora

## Configuración de MercadoPago ✅

### Credenciales configuradas:
- **Access Token**: APP_USR-xxxx (producción)
- **Moneda**: COP (Pesos Colombianos)
- **Archivo**: `.env.local`

### Flujo de pago:
1. Usuario selecciona horas
2. Click en "Pagar con Mercado Pago"
3. Redirección al checkout de MercadoPago
4. Pago procesado
5. Redirección de vuelta con status

## Pendiente
- [ ] Probar flujo de pago completo
- [ ] Configurar webhooks para notificaciones (opcional)
- [ ] Desplegar en producción (Netlify)
- [ ] Actualizar NEXT_PUBLIC_BASE_URL con URL de producción
