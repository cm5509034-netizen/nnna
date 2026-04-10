# DevOps Pro - Landing Page

## Estado Actual
- [x] Repositorio clonado desde GitHub
- [x] Landing page funcional con Next.js + shadcn/ui
- [x] Logo de MercadoPago actualizado (solo en sección de pagos)
- [x] Archivos de configuración para credenciales creados

## Configuración de MercadoPago

### Pasos para habilitar pagos reales:

1. **Crear cuenta de desarrollador**
   - Ir a: https://www.mercadopago.com.co/developers/panel
   - Iniciar sesión o crear cuenta

2. **Crear una aplicación**
   - En el panel, hacer clic en "Crear aplicación"
   - Nombre: "DevOps Pro" (o el nombre que desees)
   - Seleccionar: "Pagos online" > "Checkout Pro"

3. **Obtener credenciales**
   - En tu aplicación, ir a "Credenciales"
   - Para PRUEBAS: Usar "Credenciales de prueba" (Access Token comienza con TEST-)
   - Para PRODUCCIÓN: Usar "Credenciales de producción" (Access Token comienza con APP_USR-)

4. **Configurar variables de entorno**
   - Editar el archivo `.env.local`
   - Reemplazar `TU_ACCESS_TOKEN_AQUI` con tu Access Token real

### Archivos creados:
- `.env.example` - Ejemplo de configuración (seguro para Git)
- `.env.local` - Configuración real (NO se sube a Git)

## Pendiente
- [ ] Agregar credenciales reales de MercadoPago
- [ ] Probar flujo de pago en sandbox
- [ ] Configurar webhooks para notificaciones
- [ ] Desplegar en producción
