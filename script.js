// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // 📧 CONFIGURACIÓN DE EMAILJS
    // ==========================================
    // Configurado para GitHub Pages
    // Las claves están optimizadas para despliegue público
    
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: 'UZTWYqJA-j2_3-OMO',     // Public Key (seguro para repositorios públicos)
        SERVICE_ID: 'service_a6o9dfw',        // Service ID 
        TEMPLATE_ID: 'template_f1k3eh4'       // Template ID
    };
    
    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
    
    // ==========================================
    // 🧭 NAVEGACIÓN Y UI
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto scroll del header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .contact-content, .timeline-item, .cert-card');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Efecto de escritura para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Aplicar efecto de escritura al título
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        }
    }, 1000);

    // Contador animado para estadísticas (si decides agregar)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function count() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(count);
            } else {
                element.textContent = target;
            }
        }
        count();
    }

    // ==========================================
    // 📧 FORMULARIO DE CONTACTO CON EMAILJS
    // ==========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Validación básica
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, completa todos los campos.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }

            // Verificar que EmailJS esté configurado
            if (!EMAILJS_CONFIG.PUBLIC_KEY.includes('TU_') && typeof emailjs !== 'undefined') {
                // Enviar email real con EmailJS
                sendEmailWithEmailJS(name, email, subject, message, this);
            } else {
                // Modo de prueba (cuando no está configurado EmailJS)
                showNotification('⚠️ EmailJS no está configurado. El mensaje no se envió realmente.', 'warning');
                showNotification('Revisa las instrucciones en script.js para configurar EmailJS.', 'info');
                this.reset();
            }
        });
    }

    // Función para enviar email con EmailJS
    function sendEmailWithEmailJS(name, email, subject, message, form) {
        // Mostrar estado de envío
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Generar fecha y hora actual en formato bonito
        const now = new Date();
        const timeFormatted = now.toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Parámetros para el template de EmailJS (formato simple)
        const templateParams = {
            name: name,
            from_email: email,
            subject: subject,
            message: message,
            time: timeFormatted,
            to_email: 'glo.suacas@gmail.com'            // Tu email donde recibirás los mensajes
        };

        console.log('📧 Enviando email con parámetros:', templateParams);

        // Enviar email
        emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        ).then(function(response) {
            console.log('✅ Email enviado exitosamente:', response);
            showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            form.reset();
        }).catch(function(error) {
            console.error('❌ Error al enviar email:', error);
            showNotification('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        }).finally(function() {
            // Restaurar botón
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Sistema de notificaciones mejorado
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Iconos según el tipo
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type] || icons.info}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Colores según el tipo
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };

        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-family: 'Poppins', sans-serif;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Cerrar notificación
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });

        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
    }

    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Efecto parallax sutil en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroText && heroImage) {
            heroText.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroImage.style.transform = `translateY(${scrolled * -0.1}px)`;
        }
    });

    // Agregar clase loaded a elementos cuando se cargan
    window.addEventListener('load', function() {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('loaded');
            }, index * 100);
        });
    });

    // Cambiar tema (modo oscuro/claro) - función opcional
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
    }

    // Cargar tema guardado
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
    }

    // Función para copiar email al clipboard
    function copyEmail() {
        const email = 'glo.suacas@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copiado al portapapeles', 'success');
        }).catch(() => {
            // Fallback para navegadores que no soportan clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showNotification('Email copiado al portapapeles', 'success');
            } catch (err) {
                showNotification('No se pudo copiar el email', 'error');
            }
            document.body.removeChild(textArea);
        });
    }

    // Agregar funcionalidad de copia a los métodos de contacto
    const emailMethod = document.querySelector('.contact-method:has(.fa-envelope)');
    if (emailMethod) {
        emailMethod.style.cursor = 'pointer';
        emailMethod.addEventListener('click', copyEmail);
    }

    // Crear partículas flotantes en el fondo (efecto visual opcional)
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(102, 126, 234, 0.1);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }

        document.body.appendChild(particlesContainer);
    }

    // Inicializar partículas (comentar si no se desea este efecto)
    // createFloatingParticles();

    // Lazy loading para imágenes (cuando agregues imágenes reales)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('🚀 Portafolio de Gloriela Suárez cargado correctamente!');
});
