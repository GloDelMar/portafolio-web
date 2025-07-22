# 📧 Configuración de EmailJS para tu Portafolio

## 🚀 Pasos para Activar el Formulario de Contacto

### 1. Crear Cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Confirma tu email

### 2. Configurar Servicio de Email
1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email:
   - **Gmail** (recomendado)
   - Outlook
   - Yahoo
   - Otros
4. Sigue las instrucciones para conectar tu cuenta
5. **Anota tu SERVICE_ID** (aparece después de configurar)

### 3. Crear Template de Email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este template HTML:

```html
Asunto: Nuevo mensaje de {{from_name}} - {{subject}}

Hola Gloriela,

Has recibido un nuevo mensaje desde tu portafolio web:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu portafolio web.
```

4. **Anota tu TEMPLATE_ID**

### 4. Obtener Public Key
1. Ve a "Account" → "General"
2. En la sección "API Keys"
3. **Copia tu Public Key**

### 5. Configurar el Código
1. Abre el archivo `script.js`
2. Busca la sección "CONFIGURACIÓN DE EMAILJS"
3. Reemplaza las siguientes líneas:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'tu_public_key_real',     // Pega aquí tu Public Key
    SERVICE_ID: 'tu_service_id_real',     // Pega aquí tu Service ID  
    TEMPLATE_ID: 'tu_template_id_real'    // Pega aquí tu Template ID
};
```

### 6. Probar el Formulario
1. Guarda los cambios
2. Abre tu portafolio en el navegador
3. Llena el formulario de contacto
4. ¡Deberías recibir el email en tu bandeja de entrada!

## ✅ Ejemplo de Configuración Completa

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'user_abc123xyz789',        // Tu clave pública
    SERVICE_ID: 'service_gmail_123',        // ID de tu servicio Gmail
    TEMPLATE_ID: 'template_contact_456'     // ID de tu template
};
```

## 🔒 Límites del Plan Gratuito
- **200 emails por mes**
- **Perfecto para un portafolio personal**
- Si necesitas más, puedes upgradear

## 🆘 Solución de Problemas

### Error: "EmailJS is not defined"
- Verifica que el script de EmailJS esté cargando correctamente
- Revisa la consola del navegador para errores

### Error: "Invalid template ID"
- Verifica que el TEMPLATE_ID sea correcto
- Asegúrate de que el template esté activo

### Error: "Service not found"
- Verifica que el SERVICE_ID sea correcto
- Asegúrate de que el servicio esté configurado

### Los emails no llegan
- Revisa tu carpeta de spam
- Verifica que el servicio de email esté configurado correctamente
- Prueba con un email diferente

## 📝 Variables del Template

Asegúrate de que tu template incluya estas variables:
- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente  
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Contenido del mensaje

## 🎉 ¡Listo!

Una vez configurado, tu formulario enviará emails reales a tu bandeja de entrada. Los visitantes podrán contactarte directamente desde tu portafolio.

---

**¿Necesitas ayuda?** 
- Documentación oficial: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Si tienes problemas, comparte el error específico para ayudarte mejor.
