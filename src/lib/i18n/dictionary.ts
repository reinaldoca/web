export type Language = "es" | "en";

export const dictionary = {
    es: {
        header: {
            services: "Servicios",
            products: "Productos",
            about: "Nosotros",
            whyUs: "Por qué elegirnos",
            contact: "Contáctanos",
        },
        hero: {
            badge: "Cloud · DevSecOps · Operación 24/7",
            title: "Infraestructura cloud que escala al ritmo de tu negocio",
            description: "Diseñamos, automatizamos y operamos plataformas en AWS, Azure y Kubernetes para empresas que necesitan crecer con seguridad y sin interrupciones.",
            servicesBtn: "Explorar servicios",
            contactBtn: "Agendar diagnóstico técnico",
            microcopy: "Consulta inicial 100% gratuita - Sin letra chica",
        },
        services: {
            title: "Cómo podemos ayudarte",
            subtitle: "Tres áreas de especialización para empresas que necesitan infraestructura moderna",
        },
        clients: {
            title: "CON LA CONFIANZA DE EMPRESAS LÍDERES",
        },
        products: {
            title: "Nuestros Productos",
            subtitle: "Herramientas propias desarrolladas para potenciar tu infraestructura.",
            demoBtn: "Solicitar Demo",
            items: [
                {
                    title: "CloudBit Monitor",
                    description: "Plataforma unificada de observabilidad para monitorear toda tu infraestructura en tiempo real.",
                    features: ["Dashboards personalizables", "Alertas inteligentes", "Integración con Slack/Teams"],
                    badge: "Popular",
                },
                {
                    title: "AutoDeploy",
                    description: "Herramienta de automatización de despliegues para acelerar tu CI/CD y reducir errores.",
                    features: ["Rollbacks automáticos", "Gestión de entornos", "Auditoría de cambios"],
                    badge: "Nuevo",
                },
                {
                    title: "SecureVault",
                    description: "Sistema de gestión de secretos y certificados para proteger tus activos digitales.",
                    features: ["Encriptación de grado militar", "Control de acceso granular", "Rotación automática"],
                    badge: "Seguridad",
                },
            ],
        },
        about: {
            title: "Sobre CloudBit",
            description1: "Desde 2017, ayudamos a empresas de distintos países a migrar, modernizar y operar infraestructura cloud con DevOps y DevSecOps, reduciendo riesgo operativo y acelerando el time-to-market. Trabajamos de forma remota, en español o inglés, adaptándonos a la zona horaria de cada cliente.",
            description2: "Nuestro equipo de ingenieros certificados está comprometido con la excelencia técnica, brindando soluciones basadas en estándares de la industria que generan valor medible.",
            stats: {
                experience: { value: "8+", label: "Años de Experiencia" },
                projects: { value: "120+", label: "Proyectos Completados" },
                experts: { value: "15+", label: "Ingenieros Certificados" },
                support: { value: "24/7", label: "Soporte Enterprise" },
            },
            teamBtn: "Agendar Consulta",
            imageLabel: "",
        },
        whyUs: {
            title: "Por Qué Elegirnos",
            subtitle: "Nos diferenciamos por nuestra excelencia técnica y compromiso con el éxito de nuestros clientes.",
            reasons: [
                {
                    title: "Seguridad Primero",
                    description: "La seguridad es el pilar de nuestra arquitectura. Implementamos protocolos de encriptación avanzada, gestión de identidades y monitoreo continuo para blindar sus activos digitales contra amenazas emergentes, garantizando la integridad y confidencialidad de sus datos.",
                },
                {
                    title: "Alto Rendimiento",
                    description: "Diseñamos sistemas de baja latencia y alta disponibilidad. Mediante técnicas de optimización de código e infraestructura, aseguramos que sus aplicaciones respondan al instante, mejorando la experiencia del usuario y la eficiencia operativa de su negocio.",
                },
                {
                    title: "Equipo Experto",
                    description: "Nuestro equipo está formado por ingenieros certificados en las principales plataformas cloud (AWS, Azure, GCP). Aportamos años de experiencia práctica resolviendo desafíos complejos, lo que nos permite ofrecer soluciones probadas y de vanguardia.",
                },
                {
                    title: "Enfoque a Resultados",
                    description: "No solo entregamos tecnología, entregamos valor. Trabajamos con KPIs claros y objetivos medibles para asegurar que cada implementación tenga un impacto positivo directo en su ROI y en la escalabilidad de su empresa.",
                },
            ],
        },
        cta: {
            title: "¿Listo para modernizar tu infraestructura?",
            description: "Agendá una consulta técnica gratuita y recibí un diagnóstico de tu stack actual",
            btn: "Solicitar diagnóstico gratuito",
            whatsappAlt: "O escribinos por WhatsApp",
        },
        footer: {
            description: "Soluciones tecnológicas avanzadas para la era digital. Transformamos negocios con innovación y experiencia.",
            services: "Servicios",
            company: "Empresa",
            followUs: "Síguenos",
            rights: "Todos los derechos reservados.",
            links: {
                about: "Sobre Nosotros",
                careers: "Carreras",
                blog: "Blog",
                contact: "Contacto",
            },
        },
        servicePage: {
            back: "Volver a Servicios",
            features: "Características Principales",
            benefits: "Beneficios para tu Negocio",
            ready: "¿Listo para empezar?",
            consultation: "Solicitar Consultoría",
        },
        genkit: {
            title: "Asistente Inteligente CloudBit",
            description: "Prueba nuestra integración con IA para resolver tus dudas al instante.",
            botName: "CloudBit AI",
            initialMessage: "Hola, soy el asistente virtual de CloudBit. ¿En qué puedo ayudarte hoy?",
            placeholder: "Escribe tu mensaje...",
            loading: "Escribiendo...",
            responses: {
                default: "¿Te gustaría recibir más información detallada? Por favor, escribenos a contacto@cloudbit.com.ar un especialista te contactará a la brevedad ¡Gracias!...",
                services: "Ofrecemos servicios de Observabilidad, ITSM, DevOps, Automatización, Staffing, Consultoría y Cloud.",
                cloud: "Nuestras soluciones Cloud incluyen diseño de arquitecturas escalables en AWS, Azure y Red Hat.",
                pricing: "Nuestros precios varían según el alcance del proyecto. Te recomendamos agendar una consulta para un presupuesto personalizado.",
                networking: "Ofrecemos administración de redes Cisco ASA, VPNs y seguridad perimetral para proteger tu infraestructura.",
                linux: "Brindamos soporte experto para servidores Linux (Debian, Ubuntu, Fedora), incluyendo hardening y optimización.",
                virtualization: "Gestionamos entornos virtuales con VMware y Proxmox, asegurando alta disponibilidad y eficiencia.",
                askEmail: "¿Te gustaría recibir más información detallada? Por favor, escribenos a contacto@cloudbit.com.ar un especialista te contactará a la brevedad ¡Gracias!...",
                emailReceived: "¡Gracias!. Un especialista te contactará a la brevedad.",
                invalidEmail: "El correo ingresado no parece válido. Por favor, intenta nuevamente.",
            },
        },
    },
    en: {
        header: {
            services: "Services",
            products: "Products",
            about: "About Us",
            whyUs: "Why Choose Us",
            contact: "Contact Us",
        },
        hero: {
            badge: "Cloud · DevSecOps · 24/7 Operations",
            title: "Cloud infrastructure that scales at the pace of your business",
            description: "We design, automate and operate platforms on AWS, Azure and Kubernetes for companies that need to grow securely and without disruption.",
            servicesBtn: "Explore services",
            contactBtn: "Schedule technical consultation",
            microcopy: "Initial consultation 100% free - No strings attached",
        },
        services: {
            title: "How we can help you",
            subtitle: "Three areas of specialization for companies that need modern infrastructure",
        },
        clients: {
            title: "TRUSTED BY LEADING COMPANIES",
        },
        products: {
            title: "Our Products",
            subtitle: "Proprietary tools developed to empower your infrastructure.",
            demoBtn: "Request Demo",
            items: [
                {
                    title: "CloudBit Monitor",
                    description: "Unified observability platform to monitor your entire infrastructure in real-time.",
                    features: ["Customizable dashboards", "Smart alerts", "Slack/Teams integration"],
                    badge: "Popular",
                },
                {
                    title: "AutoDeploy",
                    description: "Deployment automation tool to accelerate your CI/CD and reduce errors.",
                    features: ["Automatic rollbacks", "Environment management", "Change auditing"],
                    badge: "New",
                },
                {
                    title: "SecureVault",
                    description: "Secrets and certificate management system to protect your digital assets.",
                    features: ["Military-grade encryption", "Granular access control", "Automatic rotation"],
                    badge: "Security",
                },
            ],
        },
        about: {
            title: "About CloudBit",
            description1: "Since 2017, we have helped companies in different countries migrate, modernize and operate cloud infrastructure with DevOps and DevSecOps, reducing operational risk and accelerating time-to-market. We work remotely, in English or Spanish, adapting to each client's time zone.",
            description2: "Our team of certified engineers is committed to technical excellence, providing solutions based on industry standards that generate measurable value.",
            stats: {
                experience: { value: "8+", label: "Years of Experience" },
                projects: { value: "120+", label: "Completed Projects" },
                experts: { value: "15+", label: "Certified Engineers" },
                support: { value: "24/7", label: "Enterprise Support" },
            },
            teamBtn: "Schedule Consultation",
            imageLabel: "",
        },
        whyUs: {
            title: "Why Choose Us",
            subtitle: "We differentiate ourselves through our technical excellence and commitment to our clients' success.",
            reasons: [
                {
                    title: "Security First",
                    description: "Security is the pillar of our architecture. We implement advanced encryption protocols, identity management, and continuous monitoring to shield your digital assets against emerging threats, ensuring the integrity and confidentiality of your data.",
                },
                {
                    title: "High Performance",
                    description: "We design low-latency, high-availability systems. Through code and infrastructure optimization techniques, we ensure your applications respond instantly, improving user experience and your business's operational efficiency.",
                },
                {
                    title: "Expert Team",
                    description: "Our team consists of engineers certified in major cloud platforms (AWS, Azure, GCP). We bring years of practical experience solving complex challenges, allowing us to offer proven, cutting-edge solutions.",
                },
                {
                    title: "Results Focused",
                    description: "We don't just deliver technology, we deliver value. We work with clear KPIs and measurable objectives to ensure that every implementation has a direct positive impact on your ROI and your company's scalability.",
                },
            ],
        },
        cta: {
            title: "Ready to modernize your infrastructure?",
            description: "Schedule a free technical consultation and receive a diagnosis of your current stack",
            btn: "Request free diagnosis",
            whatsappAlt: "Or write to us on WhatsApp",
        },
        footer: {
            description: "Advanced technology solutions for the digital age. We transform businesses with innovation and experience.",
            services: "Services",
            company: "Company",
            followUs: "Follow Us",
            rights: "All rights reserved.",
            links: {
                about: "About Us",
                careers: "Careers",
                blog: "Blog",
                contact: "Contact",
            },
        },
        servicePage: {
            back: "Back to Services",
            features: "Key Features",
            benefits: "Business Benefits",
            ready: "Ready to get started?",
            consultation: "Request Consultation",
        },
        genkit: {
            title: "CloudBit Intelligent Assistant",
            description: "Try our AI integration to resolve your doubts instantly.",
            botName: "CloudBit AI",
            initialMessage: "Hello, I am CloudBit's virtual assistant. How can I help you today?",
            placeholder: "Type your message...",
            loading: "Typing...",
            responses: {
                default: "Thank you for your inquiry. A specialist will contact you soon.",
                services: "We offer Observability, ITSM, DevOps, Automation, Staffing, Consulting, and Cloud services.",
                cloud: "Our Cloud solutions include scalable architecture design on AWS, Azure, and Red Hat.",
                pricing: "Our prices vary depending on the project scope. We recommend scheduling a consultation for a personalized quote.",
                networking: "We offer Cisco ASA network administration, VPNs, and perimeter security to protect your infrastructure.",
                linux: "We provide expert support for Linux servers (Debian, Ubuntu, Fedora), including hardening and optimization.",
                virtualization: "We manage virtual environments with VMware and Proxmox, ensuring high availability and efficiency.",
                askEmail: "Would you like to receive more detailed information? Please enter your email address.",
                emailReceived: "Thank you! We have received your email. A specialist will contact you shortly.",
                invalidEmail: "The email entered does not seem valid. Please try again.",
            },
        },
    },
};
