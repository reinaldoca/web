
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Server, Zap, Code, CheckCircle } from "lucide-react";

type ProcessStep = {
  title: string;
  description: string;
};

type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  whatItIs: string;
  ourPerspective: {
    title: string;
    content: string;
  };
  ourProcess: ProcessStep[];
};

const services: Service[] = [
  {
    icon: Server,
    title: "Cloud Foundations",
    whatItIs: "Programa de solo 4 semanas, que apoya en la definición de políticas de gobierno de nube, configuración de alertas e implementación de mecanismos automatizados para evitar la violación de reglas de control y seguridad. Apoya en la definición de roles y niveles de acceso, y construye plantillas y blueprints para el aprovisionamiento estandarizado de nuevos ambientes de cómputo. Ayuda a implementar mecanismos de registro y auditoría para identificar autores de cambios y contrastar el ambiente actual contra mejores prácticas.",
    ourPerspective: {
      title: "NUESTRA PERSPECTIVA",
      content: "El principal error es intentar aplicar las mismas políticas de ambientes on-prem en los nuevos entornos de nube. Esto limita la agilidad y desaprovecha los beneficios de la nube. Es clave preguntarse: ¿Cómo mantenemos el control sin frenar la innovación? ¿Cómo garantizamos la seguridad desde el día cero? ¿Cómo estandarizamos para ser más eficientes?"
    },
    ourProcess: [
      { title: "Alineación del equipo", description: "Definimos objetivos, alcance y métricas de éxito del programa." },
      { title: "Implementación y configuración", description: "Desplegamos una Landing Zone segura con AWS Control Tower y configuramos las cuentas." },
      { title: "Definición de límites, controles y alertas", description: "Establecemos barandas de seguridad para prevenir configuraciones no deseadas." },
      { title: "Monitoreo del cumplimiento", description: "Implementamos dashboards para visualizar el estado de cumplimiento y auditar cambios." },
    ]
  },
  {
    icon: Zap,
    title: "Servicios de Migración",
    whatItIs: "Contamos con un equipo de especialistas que acompaña en la virtualización de cargas de trabajo de forma rápida, decidida y segura. Con más de 700 implementaciones exitosas, nos enfocamos en comprender tus necesidades específicas para ofrecer soluciones personalizadas que impulsan la eficiencia y escalabilidad, reduciendo costos y fortaleciendo la seguridad.",
    ourPerspective: {
      title: "NUESTRA PERSPECTIVA",
      content: "Reconocemos que cada migración presenta desafíos únicos, desde la complejidad técnica hasta la resistencia cultural. Nos comprometemos a ser un socio de confianza, proporcionando no solo la experiencia técnica, sino también la orientación estratégica para superar obstáculos y asegurar una transición fluida y exitosa a la nube."
    },
    ourProcess: [
      { title: "Discovery", description: "Análisis exhaustivo de la infraestructura actual y definición de los objetivos de negocio para la migración." },
      { title: "Planeación", description: "Diseño de la arquitectura de destino en AWS y elaboración de un plan de migración detallado con cronogramas." },
      { title: "Migración", description: "Ejecución de la migración en fases, siguiendo las mejores prácticas de AWS para minimizar el impacto operativo." },
      { title: "Optimización", description: "Post-migración, optimizamos continuamente los recursos para asegurar el control de costos y el máximo rendimiento." },
    ]
  },
  {
    icon: Code,
    title: "Implementación de Herramientas DevOps",
    whatItIs: "Brindamos apoyo en la selección, implementación e integración de herramientas DevOps para simplificar y automatizar los procesos de liberación de software. Los beneficios clave son una base sólida en AWS, la conexión correcta de herramientas CI/CD y la autonomía del equipo para gestionar sus pipelines de desarrollo.",
    ourPerspective: {
      title: "NUESTRA PERSPECTIVA",
      content: "La dificultad principal no está en las herramientas, sino en la falta de experiencia de los equipos para integrarlas eficazmente. Una selección consciente de herramientas alineadas a la cultura y un equipo especializado para la puesta a punto inicial, especialmente en un entorno como AWS, aceleran drásticamente la adopción y el retorno de inversión."
    },
    ourProcess: [
      { title: "Levantamiento y Plan de Trabajo", description: "Evaluamos los procesos actuales y definimos un plan de implementación de herramientas a la medida." },
      { title: "Prueba de Concepto e Implementación", description: "Realizamos una PoC para validar la solución y luego procedemos con la implementación y configuración completa del pipeline." },
      { title: "Acompañamiento y Soporte", description: "Capacitamos a tu equipo y ofrecemos soporte continuo para asegurar la autonomía en la gestión de las nuevas herramientas." },
    ]
  },
  {
    icon: CheckCircle,
    title: "Well-Architected Review",
    whatItIs: "Realizamos una revisión sistemática de tu base instalada en AWS y las prácticas de tu equipo, contrastándolas con los pilares del Well-Architected Framework: seguridad, costos, desempeño, disponibilidad y excelencia operacional. Nuestro equipo cuenta con la certificación oficial de AWS para realizar estas revisiones.",
    ourPerspective: {
      title: "NUESTRA PERSPECTIVA",
      content: "Muchos administradores tienen problemas para replicar las mejores prácticas de Service Management on-prem en la nube. La falta de un estándar de industria claro y la poca visibilidad del entorno real dificultan la mejora continua. Un WAR provee esa hoja de ruta objetiva y priorizada para optimizar."
    },
    ourProcess: [
      { title: "Identificación de la Carga de Trabajo", description: "Seleccionamos junto a ti la carga de trabajo más crítica a revisar." },
      { title: "Levantamiento de Información", description: "Realizamos entrevistas y análisis técnico contra los 5 pilares del Well-Architected Framework." },
      { title: "Priorización y Remediación", description: "Entregamos un reporte con hallazgos y un plan de acción priorizado para remediar los puntos críticos." },
      { title: "Validación y Certificación", description: "Validamos las mejoras implementadas y te ayudamos a acceder a posibles incentivos de AWS." },
    ]
  }
];

export function ServicesAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg shadow-sm bg-card overflow-hidden">
            <AccordionTrigger className="text-xl hover:no-underline p-6 text-left">
              <div className="flex items-center gap-4">
                <Icon className="h-8 w-8 text-primary flex-shrink-0" />
                <span className="font-bold font-headline text-lg md:text-xl">{service.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-0 p-6 border-t">
              <div className="space-y-8">
                
                {/* EN QUÉ CONSISTE */}
                <div>
                  <h3 className="font-bold text-lg mb-2 text-primary/90">EN QUÉ CONSISTE</h3>
                  <p className="text-foreground/80">{service.whatItIs}</p>
                </div>

                {/* NUESTRA PERSPECTIVA */}
                <div>
                  <h3 className="font-bold text-lg mb-2 text-primary/90">NUESTRA PERSPECTIVA</h3>
                  <Card className="border-primary/50 bg-primary/5">
                    <CardContent className="pt-6">
                      <p className="text-foreground/90 italic">{service.ourPerspective.content}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* NUESTRO PROCESO */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-primary/90">NUESTRO PROCESO</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {service.ourProcess.map((step, stepIndex) => (
                      <Card key={stepIndex} className="flex flex-col">
                        <CardContent className="pt-6 flex-1 flex flex-col">
                          <span className="text-4xl font-bold text-primary/20">0{stepIndex + 1}</span>
                          <h4 className="font-bold mt-2 mb-2 text-base">{step.title}</h4>
                          <p className="text-muted-foreground text-sm flex-1">{step.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
