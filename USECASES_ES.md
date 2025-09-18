# Método STAR

S => Situación
T => Tarea
A => Acción
R => Resultado

# Caso 1 - Stack

S - Nuxt2 no escala ⇒ Motivos: cambios incompatibles, demasiado acoplamiento, dependencias obsoletas.
T - Dotar al equipo de soluciones para disponer de una plataforma robusta, escalable, mantenible y testeable. Durante la refactorización, se reconsidera todo el stack en consenso con el equipo.
A - Investigación: Typescript, React, Next.js, arquitectura hexagonal, pruebas unitarias, migración vertical, subdominios con autenticación compartida en navegador, Turborepo, Vercel CI, sistema de diseño.
R - Refactorización completa de la aplicación con mínima fricción para el usuario. Despliegue gradual en producción de grandes bloques de funcionalidad. Divide y vencerás.

# Caso 2 - Traducciones y DAM

S - Traducciones: la gestión con i18n requiere un despliegue por cada cambio mínimo | Multimedia: gestión de recursos multimedia dentro del proyecto.
T - Dar autonomía al equipo de comunicación en la gestión de copys y traducciones | Dar autonomía al equipo de diseño para actualizar recursos on the go.
A - Investigación de herramientas SaaS para gestión e integración de traducciones ⇒ Phrase ⇒ Migración de ~8k claves de traducción a la plataforma y consumo vía API. Sistemas de redundancia para mitigar caídas | Subida masiva de ~1k recursos gráficos a Cloudinary.
R - Autonomía del equipo de comunicación y de la agencia externa para la gestión de traducciones. Cambios en caliente en cualquier copy de la plataforma. Diseño implementa las claves en Figma, mejorando la comunicación y el flujo diseño-desarrollo | Formatos WebP, gestión autónoma de marcas de agua para el catálogo, redimensionado, CDN. Optimización de tiempos de carga, mejora de SEO, empoderamiento del equipo de diseño.

# Caso 3 - ALGOLIA

S - La empresa necesita un buscador global.
T - Investigación: SQL, Google V8, Algolia.
A - Sincronización de modelos Laravel con índices en Algolia. Consultas a modelos vía API, combinando e interpretando la información del índice con traducciones.
R - Buscador con la potencia de Elastic Search, solución global para Productos, FAQs, Documentación técnica, Documentación comercial, Vídeos.

# Caso 4 - Sistema de diseño

S - Para escalar la plataforma se requiere un sistema de diseño compartido en todas las aplicaciones de la empresa. DRY.
T - Creación de todos los componentes, desde atómicos hasta complejos.
A - Desarrollo y pruebas unitarias de todos los componentes, sincronización con Storybook para la documentación de la librería.
R - Homogeneización de la plataforma en UX y UI. Escalabilidad, mantenibilidad, testeo, reutilización en Figma.

# Caso 5 - Storyblok

S - Dar autonomía a diseño y comunicación en el desarrollo de landings estáticas.
T - Investigación de HCMS en el mercado. Para web y documentación digital.
A - Desarrollo de la sincronización vía API del sistema de diseño para su uso en el contexto de Storyblok.
R - Autonomía en la generación de landings, A/B testing. Desarrollo de manuales de instalación, manuales de usuario, certificados de producto, datasheets, pasando de PDF a URL, indexables y compartibles.

# Caso 6 - Arquitectura hexagonal

S - Separación de responsabilidades en el código - Typescript.
T - Implementar DDD - arquitectura en capas. Dominio, aplicación e infraestructura. Modelado de datos en frontend. Patrón repositorio, capa de infraestructura para desacoplar dependencias y detalles de implementación - persistencia.
A - Turborepo permite una capa UI compartida, un paquete de infraestructura fuera de la aplicación y cada app gestiona sus casos de uso. TDD ⇒ tests en rojo, métodos HTTP - DTOs, repositorio - contrato, caso de uso, instancias de componentes importando casos de uso.
R - Escalabilidad, mantenibilidad, pruebas, SOLID, composición vs herencia, programación funcional, objetos de valor, entidades, agregados.

# Caso 7 - SEO Encabezados

S - Las instancias de componentes no mantienen jerarquía de encabezados.
T - Encontrar una forma escalable de manejar el comportamiento de los encabezados.
A - Cada componente atómico H tiene sus propios estilos según diseño, pero recibe por props la posibilidad de renderizarse como otro H manteniendo estilo.
R - Todas las instancias de componentes cumplen con la jerarquía de encabezados correcta.

# Caso 8 - SEO Mercados

S - La plataforma debe funcionar en los 17 mercados globales de la empresa (agrupaciones de países).
T - Generar una estructura de hreflang para permitir a los buscadores indexar correctamente el contenido según ubicación geográfica.
A - Script para generar etiquetas hreflang y canonical, mejorando posicionamiento e indexación correcta del contenido.
R - Mejora en el posicionamiento de buscadores para contenido geolocalizado.

# Caso 9 - Formación vs Consultoría

S - El equipo invierte en formación pero no logramos aplicar de forma eficiente el conocimiento adquirido en la plataforma.
T - Encontrar mecanismos para que el equipo crezca profesionalmente y que los resultados beneficien a la empresa.
A - Redirigir el presupuesto de formación a consultoría especializada para que la formación se aplique a nuestros casos de uso en lugar de escenarios genéricos.
R - DDD, pruebas unitarias cualitativas, crecimiento profesional del equipo.

# Caso 10 - SCRUM

S - La empresa carece del concepto de agilidad.
T - Mostrar al equipo los beneficios de las metodologías ágiles.
A - Certificación PSM I para los 2 departamentos de desarrollo (sistemas e I+D). Implementación de SCRUM.
R - Mejora en el cumplimiento de objetivos. Mayor predictibilidad en las entregas de valor.

# Caso 11 - Consolidación de SCRUM

S - El marco ágil no está consolidado en la empresa y faltan artefactos.
T - Evidenciar la necesidad de Product Owner y Scrum Master.
A - Apoyo inicial a estos roles en la comprensión del dominio de la empresa. Inicio de QA. Implementación de Jira. SCRUM académico.
R - Medición y evolución del ritmo de trabajo del equipo. Mejor consecución de objetivos. Entrega de valor ágil.

# Caso 12 - Gobernanza de datos

S - 1º curso del grado en Data Science (2019).
T - Mostrar los beneficios de orientar la empresa hacia un modelo Data-Driven Decision Company.
A - Compartir con los directivos el conocimiento adquirido sobre data lakes, gobernanza de datos y su aplicación en Industria 4.0.
R - Actualmente existe un equipo interno encargado del análisis de datos y, aunque aún en I+D, ya se toman decisiones basadas en datos.
