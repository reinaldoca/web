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
            badge: "Transformación Digital & Cloud Services",
            title: "Impulsamos el Futuro Tecnológico de tu Empresa",
            description: "En CloudBit, diseñamos soluciones escalables y seguras que optimizan tus procesos y potencian tu crecimiento en la nube.",
            servicesBtn: "Nuestros Servicios",
            contactBtn: "Agendar Consulta",
        },
        services: {
            title: "Nuestros Servicios",
            subtitle: "Soluciones integrales diseñadas para impulsar la transformación digital de tu empresa.",
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
            description1: "Somos una empresa líder en tecnología dedicada a transformar negocios a través de la innovación digital. Con años de experiencia en el sector, ayudamos a las organizaciones a modernizar su infraestructura y optimizar sus operaciones.",
            description2: "Nuestro equipo de expertos está comprometido con la excelencia técnica y la satisfacción del cliente, brindando soluciones personalizadas que generan valor real.",
            stats: {
                experience: { value: "10+", label: "Años de Experiencia" },
                projects: { value: "200+", label: "Proyectos Exitosos" },
                experts: { value: "50+", label: "Expertos Certificados" },
                support: { value: "24/7", label: "Soporte Técnico" },
            },
            teamBtn: "Conoce al Equipo",
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
            title: "¿Listo para transformar tu empresa?",
            description: "Agenda una consulta gratuita con nuestros expertos y descubre cómo podemos ayudarte a alcanzar tus objetivos tecnológicos.",
            btn: "Contactar Ahora",
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
            badge: "Digital Transformation & Cloud Services",
            title: "Driving Your Company's Technological Future",
            description: "At CloudBit, we design scalable and secure solutions that optimize your processes and boost your growth in the cloud.",
            servicesBtn: "Our Services",
            contactBtn: "Schedule a Consultation",
        },
        services: {
            title: "Our Services",
            subtitle: "Comprehensive solutions designed to drive your company's digital transformation.",
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
            description1: "We are a leading technology company dedicated to transforming businesses through digital innovation. With years of industry experience, we help organizations modernize their infrastructure and optimize their operations.",
            description2: "Our team of experts is committed to technical excellence and customer satisfaction, providing customized solutions that generate real value.",
            stats: {
                experience: { value: "10+", label: "Years of Experience" },
                projects: { value: "200+", label: "Successful Projects" },
                experts: { value: "50+", label: "Certified Experts" },
                support: { value: "24/7", label: "Technical Support" },
            },
            teamBtn: "Meet the Team",
            imageLabel: "Corporate Image",
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
            title: "Ready to transform your company?",
            description: "Schedule a free consultation with our experts and discover how we can help you achieve your technology goals.",
            btn: "Contact Now",
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
