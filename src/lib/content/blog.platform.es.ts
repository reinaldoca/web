import type { BlogPost } from "./blog";

/** Artículos de plataforma en AWS: IaC, contenedores, GitOps, DevSecOps y Well-Architected (español). */
export const platformPostsEs: BlogPost[] = [
  {
    slug: "terraform-en-aws-estructura-iac",
    title: "Terraform en AWS: cómo estructurar tu infraestructura como código desde el día uno",
    excerpt: "Estado remoto, módulos, ambientes y revisiones: la estructura mínima para que Terraform escale con el equipo y no se convierta en otro sistema frágil.",
    category: "DevOps",
    date: "2026-10-28",
    readingMinutes: 8,
    sections: [
      {
        heading: "Por qué infraestructura como código",
        paragraphs: [
          "Cuando la infraestructura se crea desde la consola, cada ambiente termina siendo un poco distinto y nadie puede reconstruirlo con certeza. Con infraestructura como código (IaC), las redes, bases de datos y clústeres se describen en archivos versionados: se revisan como cualquier otro cambio, se repiten idénticos en cada ambiente y se pueden reconstruir después de un incidente.",
          "Terraform es la herramienta más extendida para esto en AWS porque usa un lenguaje declarativo (HCL), tiene un proveedor de AWS muy completo y también gestiona servicios de terceros como DNS, monitoreo o repositorios.",
        ],
      },
      {
        heading: "Estado remoto y bloqueo desde el primer commit",
        paragraphs: [
          "Terraform guarda en un archivo de estado qué recursos creó. Ese archivo nunca debería vivir en una laptop: en AWS lo habitual es un bucket S3 con versionado y cifrado, y un mecanismo de bloqueo para que dos personas no apliquen cambios al mismo tiempo. Las versiones recientes de Terraform permiten bloquear el estado directamente en S3, sin una tabla de DynamoDB aparte.",
          "Conviene separar el estado por ambiente y por componente. Un único estado gigante hace que cada plan tarde minutos y que un error en un área bloquee a todas las demás.",
        ],
      },
      {
        heading: "Módulos chicos, versionados y con propósito claro",
        paragraphs: [
          "Un módulo por componente (red, clúster, base de datos, bucket con políticas) con entradas y salidas bien definidas. Los módulos se versionan con tags y cada ambiente fija la versión que usa, así se puede actualizar staging primero y producción después.",
          "Evitá los módulos “todo en uno” con decenas de variables opcionales: son difíciles de entender y cualquier cambio afecta a todos sus consumidores.",
        ],
      },
      {
        heading: "Ambientes: carpetas antes que workspaces",
        paragraphs: [
          "Para la mayoría de los equipos funciona mejor una carpeta por ambiente (dev, staging, prod) que llama a los mismos módulos con distintos valores. Es explícito, permite cuentas de AWS separadas por ambiente y hace evidente qué se está por modificar.",
          "Separar ambientes en cuentas distintas con AWS Organizations agrega una barrera real: un error en dev no puede tocar producción aunque alguien se equivoque de directorio.",
        ],
      },
      {
        heading: "Plan en el pull request, apply desde el pipeline",
        paragraphs: [
          "Cada cambio de infraestructura entra por pull request: el pipeline ejecuta formato, validación, un escaneo de seguridad (tfsec, Checkov o similares) y publica el plan como comentario. Quien revisa ve exactamente qué se va a crear, modificar o destruir.",
          "El apply lo hace el pipeline con un rol de AWS dedicado y credenciales temporales vía OIDC, nunca con claves de un usuario. Así queda trazabilidad de quién aprobó cada cambio y nadie necesita permisos de administrador en su máquina.",
        ],
      },
    ],
    faqs: [
      { question: "¿Puedo pasar a Terraform infraestructura que ya existe?", answer: "Sí. Con bloques import o terraform import se incorporan recursos existentes al estado sin recrearlos. Conviene hacerlo por componente y verificar que el plan no muestre cambios antes de seguir." },
      { question: "¿Terraform u OpenTofu?", answer: "OpenTofu es un fork de código abierto compatible con la mayoría de las configuraciones de Terraform. La elección depende de la licencia que prefieras y de las integraciones que uses; la estructura recomendada en este artículo sirve para ambos." },
    ],
  },
  {
    slug: "terraform-vs-cloudformation-vs-cdk",
    title: "Terraform, CloudFormation o CDK: cuál elegir para tu infraestructura en AWS",
    excerpt: "Las tres herramientas describen infraestructura como código, pero difieren en lenguaje, alcance y forma de trabajo. Una guía práctica para decidir.",
    category: "Cloud",
    date: "2026-10-21",
    readingMinutes: 7,
    sections: [
      {
        heading: "Tres enfoques para el mismo problema",
        paragraphs: [
          "CloudFormation es el servicio nativo de AWS: se escriben plantillas en YAML o JSON y AWS gestiona el estado y la ejecución. Terraform es una herramienta multi-proveedor con su propio lenguaje (HCL) y un archivo de estado que administra el equipo. AWS CDK permite definir la infraestructura en TypeScript, Python u otros lenguajes y, por debajo, genera plantillas de CloudFormation.",
        ],
      },
      {
        heading: "Cuándo conviene CloudFormation",
        paragraphs: [
          "Si toda tu infraestructura está en AWS y querés que el propio proveedor gestione el estado, los rollbacks y la integración con servicios como Service Catalog o StackSets para muchas cuentas, CloudFormation es una opción sólida y sin costo adicional.",
          "Su contra principal es la verbosidad de las plantillas y que solo cubre AWS: el DNS externo, el monitoreo o el repositorio de código quedan afuera.",
        ],
      },
      {
        heading: "Cuándo conviene Terraform",
        paragraphs: [
          "Cuando la plataforma combina AWS con otros servicios (Cloudflare, Datadog, GitHub, otro proveedor de nube) o cuando el equipo ya conoce HCL, Terraform permite gestionar todo con una sola herramienta y un mismo flujo de revisión.",
          "A cambio, el equipo se hace responsable del archivo de estado: dónde vive, cómo se bloquea y quién tiene acceso.",
        ],
      },
      {
        heading: "Cuándo conviene CDK",
        paragraphs: [
          "CDK brilla cuando los desarrolladores quieren definir la infraestructura en el mismo lenguaje que la aplicación, con abstracciones reutilizables, tipado y pruebas unitarias. Es muy productivo para aplicaciones serverless y contenedores en AWS.",
          "Hay que tener en cuenta que el resultado final es CloudFormation: los límites y tiempos de despliegue de CloudFormation siguen aplicando.",
        ],
      },
      {
        heading: "Nuestra recomendación",
        paragraphs: [
          "Para la mayoría de las empresas con varias herramientas además de AWS, Terraform es el punto de partida más flexible. Para equipos de desarrollo que viven en AWS y prefieren programar, CDK. Para organizaciones con muchas cuentas y fuerte gobierno centralizado, CloudFormation con StackSets.",
          "Lo importante no es la herramienta sino el proceso: todo cambio de infraestructura versionado, revisado y aplicado desde un pipeline.",
        ],
      },
    ],
  },
  {
    slug: "docker-en-produccion-buenas-practicas",
    title: "Docker en producción: buenas prácticas para imágenes seguras y livianas",
    excerpt: "Imágenes multi-stage, usuarios sin privilegios, escaneo de vulnerabilidades y etiquetas inmutables: lo que separa un contenedor de laboratorio de uno listo para producción.",
    category: "DevOps",
    date: "2026-10-14",
    readingMinutes: 6,
    sections: [
      {
        heading: "Builds multi-stage para imágenes chicas",
        paragraphs: [
          "Separar la etapa de compilación de la imagen final permite dejar afuera compiladores, dependencias de desarrollo y archivos temporales. Una imagen más chica descarga más rápido, arranca antes y tiene menos superficie de ataque.",
          "Como base, preferí imágenes mínimas y mantenidas (slim, distroless o Alpine cuando la aplicación lo tolera) y fijá la versión exacta en lugar de usar latest.",
        ],
      },
      {
        heading: "Nunca como root",
        paragraphs: [
          "Por defecto, un contenedor corre como root. Definí un usuario sin privilegios en el Dockerfile y, en el orquestador, sistema de archivos de solo lectura y sin capacidades extra. Si alguien explota la aplicación, el daño queda acotado.",
        ],
      },
      {
        heading: "Secretos fuera de la imagen",
        paragraphs: [
          "Las contraseñas y claves no van en el Dockerfile ni en variables de build: quedan grabadas en las capas de la imagen. En AWS se inyectan en tiempo de ejecución desde Secrets Manager o Parameter Store, con permisos acotados al servicio que las necesita.",
        ],
      },
      {
        heading: "Escaneo y etiquetas inmutables",
        paragraphs: [
          "Escaneá cada imagen en el pipeline (Trivy, Grype o el escaneo de Amazon ECR) y bloqueá el despliegue ante vulnerabilidades críticas. En ECR activá las etiquetas inmutables y usá el hash del commit como etiqueta: así sabés exactamente qué código corre en cada ambiente y podés volver atrás con certeza.",
        ],
      },
      {
        heading: "Contenedores observables",
        paragraphs: [
          "Escribí los logs a la salida estándar en formato estructurado, exponé un endpoint de salud y respetá la señal de apagado para terminar las conexiones en curso. El orquestador hace el resto: recolecta logs, reinicia contenedores enfermos y reemplaza instancias sin cortar el servicio.",
        ],
      },
    ],
  },
  {
    slug: "contenedores-en-aws-ecs-eks-fargate",
    title: "Contenedores en AWS: ¿ECS, EKS o Fargate?",
    excerpt: "Tres formas de correr contenedores en AWS con distinto nivel de control y complejidad operativa. Cómo elegir según tu equipo y tu carga de trabajo.",
    category: "Cloud",
    date: "2026-10-07",
    readingMinutes: 7,
    sections: [
      {
        heading: "Orquestador y capacidad: dos decisiones distintas",
        paragraphs: [
          "En AWS conviene separar dos preguntas: qué orquestador usar (ECS, el nativo de AWS, o EKS, Kubernetes gestionado) y dónde corren los contenedores (instancias EC2 que administrás o Fargate, donde AWS gestiona los servidores). Fargate funciona con ambos orquestadores.",
        ],
      },
      {
        heading: "ECS: simple y muy integrado",
        paragraphs: [
          "ECS tiene menos piezas que mantener, se integra de forma nativa con balanceadores, IAM, CloudWatch y Secrets Manager, y no cobra por el plano de control. Para equipos chicos o medianos con aplicaciones web y APIs, suele ser el camino más rápido a producción.",
        ],
      },
      {
        heading: "EKS: el ecosistema de Kubernetes",
        paragraphs: [
          "EKS conviene cuando necesitás portabilidad entre nubes o entornos on-premise, herramientas del ecosistema de Kubernetes (Helm, Argo CD, operadores) o equipos que ya saben Kubernetes. A cambio, implica más conocimiento: actualizaciones de versión, complementos, políticas de red y una curva de aprendizaje más larga.",
          "Herramientas como Karpenter para el escalado de nodos y EKS Auto Mode reducen bastante el trabajo operativo.",
        ],
      },
      {
        heading: "Fargate: sin servidores que administrar",
        paragraphs: [
          "Con Fargate no hay instancias que parchear ni capacidad que planificar: se paga por la CPU y memoria de cada tarea. Es ideal para cargas variables y equipos sin dedicación exclusiva a operaciones. Para cargas grandes y estables, EC2 con instancias reservadas o Spot puede resultar más económico.",
        ],
      },
      {
        heading: "Cómo decidimos con nuestros clientes",
        paragraphs: [
          "Si no hay un requisito fuerte de Kubernetes, empezamos con ECS sobre Fargate: es lo que menos operación demanda. Si el equipo ya trabaja con Kubernetes o necesita su ecosistema, EKS con nodos gestionados y Karpenter. En ambos casos, todo definido con infraestructura como código y desplegado desde un pipeline.",
        ],
      },
    ],
    faqs: [
      { question: "¿Puedo empezar en ECS y pasar a EKS después?", answer: "Sí. Si las aplicaciones están bien contenerizadas y la infraestructura está en código, la migración es principalmente de definiciones de despliegue; las imágenes de contenedor no cambian." },
    ],
  },
  {
    slug: "gitops-con-argo-cd",
    title: "GitOps con Argo CD: despliegues declarativos y auditables en Kubernetes",
    excerpt: "Con GitOps, el repositorio es la única fuente de verdad y el clúster se sincroniza solo. Qué resuelve, cómo se implementa y qué errores evitar.",
    category: "DevOps",
    date: "2026-09-30",
    readingMinutes: 6,
    sections: [
      {
        heading: "Qué es GitOps",
        paragraphs: [
          "En GitOps, el estado deseado de las aplicaciones y la configuración del clúster vive en un repositorio Git. Un agente dentro del clúster, como Argo CD o Flux, compara continuamente ese estado con lo que está corriendo y aplica las diferencias. Desplegar es hacer merge de un pull request.",
        ],
      },
      {
        heading: "Qué problemas resuelve",
        paragraphs: [
          "Cada cambio queda registrado con autor, revisión y fecha. Volver atrás es revertir un commit. Los cambios manuales en el clúster se detectan como desvío y se corrigen solos. Y el pipeline de CI ya no necesita credenciales de administrador del clúster: solo publica imágenes y actualiza el repositorio.",
        ],
      },
      {
        heading: "Repositorio de aplicación y repositorio de despliegue",
        paragraphs: [
          "Una práctica común es separar el código de la aplicación de los manifiestos de despliegue. El pipeline construye la imagen, la etiqueta con el hash del commit y abre un cambio en el repositorio de despliegue con la nueva versión. Promover de staging a producción es otro pull request, con su propia aprobación.",
        ],
      },
      {
        heading: "Secretos en GitOps",
        paragraphs: [
          "Los secretos no se guardan en texto plano en Git. Las opciones habituales en AWS son External Secrets Operator, que lee desde Secrets Manager, o Sealed Secrets, que guarda versiones cifradas que solo el clúster puede descifrar.",
        ],
      },
      {
        heading: "Errores frecuentes",
        paragraphs: [
          "Mezclar despliegues manuales con GitOps hace que el agente revierta cambios y genere confusión. Activar la sincronización automática con borrado de recursos sin entender su alcance puede eliminar cosas que no esperabas. Empezá con una aplicación, sincronización manual y alertas de desvío; automatizá cuando el equipo se sienta cómodo.",
        ],
      },
    ],
  },
  {
    slug: "devsecops-en-aws-seguridad-en-el-pipeline",
    title: "DevSecOps en AWS: cómo integrar la seguridad en tu pipeline de CI/CD",
    excerpt: "Escaneo de código, dependencias, imágenes e infraestructura en cada cambio, más controles en la cuenta de AWS. Seguridad que acompaña la velocidad en lugar de frenarla.",
    category: "Seguridad",
    date: "2026-09-24",
    readingMinutes: 8,
    sections: [
      {
        heading: "Seguridad desde el primer commit",
        paragraphs: [
          "DevSecOps significa mover los controles de seguridad lo más temprano posible: es mucho más barato corregir una vulnerabilidad en el pull request que después de una auditoría o, peor, de un incidente. La idea no es sumar trámites, sino automatizar las verificaciones para que corran solas en cada cambio.",
        ],
      },
      {
        heading: "Qué escanear en cada pull request",
        paragraphs: [
          "Código propio con análisis estático (SAST), dependencias con análisis de composición (SCA) para detectar librerías con vulnerabilidades conocidas, secretos filtrados en el código, e infraestructura como código para detectar buckets públicos, puertos abiertos o cifrado deshabilitado antes de que existan.",
          "Lo importante es definir umbrales: los hallazgos críticos bloquean el merge; los medios generan una tarea con fecha.",
        ],
      },
      {
        heading: "Imágenes y artefactos",
        paragraphs: [
          "Cada imagen de contenedor se escanea antes de publicarse en ECR y se vuelve a revisar periódicamente, porque aparecen vulnerabilidades nuevas en imágenes viejas. Firmar las imágenes y generar un inventario de componentes (SBOM) facilita saber qué está afectado cuando se publica una vulnerabilidad grave.",
        ],
      },
      {
        heading: "Pipelines sin credenciales permanentes",
        paragraphs: [
          "Los pipelines se autentican en AWS con OIDC y roles de IAM con permisos mínimos y credenciales temporales. Así no hay claves de acceso guardadas en el sistema de CI que puedan filtrarse.",
        ],
      },
      {
        heading: "Controles en la cuenta de AWS",
        paragraphs: [
          "El pipeline protege lo que se despliega; la cuenta necesita sus propios controles: CloudTrail en todas las regiones, GuardDuty para detectar amenazas, Security Hub para centralizar hallazgos, AWS Config para detectar configuraciones inseguras y políticas de organización que impidan, por ejemplo, desactivar los registros de auditoría.",
        ],
      },
    ],
    faqs: [
      { question: "¿DevSecOps hace más lentos los despliegues?", answer: "Bien implementado, no. Los escaneos corren en paralelo y toman minutos. Lo que sí cambia es que los problemas se detectan antes, cuando son más baratos de corregir." },
    ],
  },
  {
    slug: "fugas-de-costo-en-aws",
    title: "Las fugas de costo más comunes en AWS (y cómo cerrarlas)",
    excerpt: "NAT Gateways, snapshots olvidados, discos sin usar y ambientes encendidos de noche: dónde se va el presupuesto de AWS sin que nadie lo note.",
    category: "Cloud",
    date: "2026-09-17",
    readingMinutes: 6,
    sections: [
      {
        heading: "Transferencia de datos y NAT Gateways",
        paragraphs: [
          "El NAT Gateway cobra por hora y por cada gigabyte procesado. Cuando las instancias privadas descargan imágenes de contenedor o hablan con S3 y DynamoDB a través del NAT, la factura crece rápido. Los endpoints de VPC para S3 y DynamoDB (de tipo gateway, sin costo por hora) y un registro privado de imágenes cercano suelen resolverlo.",
        ],
      },
      {
        heading: "Almacenamiento que nadie borra",
        paragraphs: [
          "Volúmenes EBS desconectados, snapshots de instancias que ya no existen, imágenes AMI viejas y buckets sin reglas de ciclo de vida se acumulan mes a mes. Una política de ciclo de vida en S3 y una revisión periódica de snapshots y volúmenes sin uso recuperan dinero sin riesgo.",
        ],
      },
      {
        heading: "Ambientes encendidos fuera de horario",
        paragraphs: [
          "Los ambientes de desarrollo y prueba rara vez se usan de noche o los fines de semana. Apagarlos automáticamente con un horario puede reducir su costo en más de la mitad.",
        ],
      },
      {
        heading: "Instancias sobredimensionadas",
        paragraphs: [
          "AWS Compute Optimizer analiza el uso real de CPU y memoria y recomienda tamaños más chicos o familias más eficientes, como Graviton. Combinado con Savings Plans para la carga base estable, el ahorro suele ser significativo.",
        ],
      },
      {
        heading: "Logs sin retención",
        paragraphs: [
          "Los grupos de logs de CloudWatch, por defecto, guardan todo para siempre. Definir una retención por ambiente (por ejemplo, 14 días en desarrollo y 90 en producción) y exportar a S3 lo que deba conservarse por más tiempo evita una fuga silenciosa.",
        ],
      },
    ],
  },
  {
    slug: "backup-y-dr-en-aws-rpo-rto",
    title: "Backup y recuperación ante desastres en AWS: cómo definir RPO y RTO (y probarlos)",
    excerpt: "Tener backups no alcanza: hay que saber cuántos datos podés perder, cuánto podés tardar en volver y haber probado la restauración antes de necesitarla.",
    category: "Operación",
    date: "2026-09-03",
    readingMinutes: 7,
    sections: [
      {
        heading: "RPO y RTO en lenguaje de negocio",
        paragraphs: [
          "El RPO (objetivo de punto de recuperación) es cuántos datos podés permitirte perder: una hora, un día. El RTO (objetivo de tiempo de recuperación) es cuánto puede estar caído el servicio antes de que el impacto sea inaceptable. Se definen con el negocio, por aplicación, y determinan la estrategia y el costo.",
        ],
      },
      {
        heading: "Cuatro estrategias, de menor a mayor costo",
        paragraphs: [
          "Backup y restauración: la más económica, con RTO de horas. Luz piloto: los datos se replican y la infraestructura mínima está lista para escalar. Standby templado: una versión reducida corre en otra región. Activo-activo: varias regiones atienden tráfico a la vez, con RTO casi nulo y el mayor costo.",
        ],
      },
      {
        heading: "AWS Backup como punto central",
        paragraphs: [
          "AWS Backup centraliza las copias de RDS, DynamoDB, EBS, EFS y S3 con políticas por etiquetas. Las copias a otra cuenta y otra región protegen ante un error humano o un acceso comprometido, y el bloqueo de bóveda impide que alguien las borre antes de tiempo.",
        ],
      },
      {
        heading: "Infraestructura como código para recuperar rápido",
        paragraphs: [
          "Si la infraestructura está en Terraform o CloudFormation, recrearla en otra región es ejecutar el código con otros parámetros. Sin IaC, la recuperación depende de documentación que suele estar desactualizada y de la memoria de las personas.",
        ],
      },
      {
        heading: "Probar la restauración",
        paragraphs: [
          "Un backup que nunca se restauró es una suposición. Programá pruebas periódicas, medí el tiempo real contra el RTO acordado y documentá los pasos. Las pruebas de restauración de AWS Backup permiten automatizar parte de esta verificación.",
        ],
      },
    ],
    faqs: [
      { question: "¿Cada cuánto conviene probar la restauración?", answer: "Al menos una vez por trimestre para los sistemas críticos y después de cada cambio importante de arquitectura." },
    ],
  },
  {
    slug: "aws-well-architected-equipos-chicos",
    title: "AWS Well-Architected aplicado a equipos chicos: por dónde empezar",
    excerpt: "Los seis pilares del marco de buenas prácticas de AWS traducidos a acciones concretas para una startup o un equipo con poca dedicación a infraestructura.",
    category: "Cloud",
    date: "2026-09-10",
    readingMinutes: 7,
    sections: [
      {
        heading: "Qué es el marco Well-Architected",
        paragraphs: [
          "Es el conjunto de buenas prácticas que AWS propone para diseñar y operar cargas en la nube, organizado en seis pilares: excelencia operativa, seguridad, confiabilidad, eficiencia de rendimiento, optimización de costos y sostenibilidad. No es una certificación: es una guía para detectar riesgos y priorizar mejoras.",
        ],
      },
      {
        heading: "Seguridad y confiabilidad primero",
        paragraphs: [
          "Para un equipo chico, las acciones con más impacto suelen ser: MFA y acceso con roles en lugar de usuarios con claves, cuentas separadas para producción, backups automáticos con restauraciones probadas y despliegue en más de una zona de disponibilidad para los componentes críticos.",
        ],
      },
      {
        heading: "Excelencia operativa sin un equipo de operaciones",
        paragraphs: [
          "Infraestructura como código, despliegues desde un pipeline y alertas que lleguen a quien puede actuar. Con eso se evita la mayoría de los incidentes por cambios manuales y se reduce la dependencia de una sola persona.",
        ],
      },
      {
        heading: "Costos y rendimiento con datos",
        paragraphs: [
          "Etiquetar los recursos por aplicación y ambiente, configurar presupuestos con alertas y revisar cada mes los recursos subutilizados. Graviton, Savings Plans y el apagado automático de ambientes no productivos suelen dar ahorros importantes sin tocar la aplicación.",
        ],
      },
      {
        heading: "Cómo hacer la primera revisión",
        paragraphs: [
          "La herramienta Well-Architected en la consola de AWS guía la revisión pregunta por pregunta y genera una lista de riesgos altos y medios. Recomendamos elegir una carga de trabajo, hacer la revisión en una o dos sesiones y convertir los riesgos altos en un plan de 90 días.",
        ],
      },
    ],
  },
];
