### STAR Method

- S => Situation
- T => Task
- A => Action
- R => Result

#### Case 1 - Stack

S - Nuxt2 does not scale => Reasons: breaking changes, too much coupling, obsolete dependencies.
T - Empower the team with solutions to have a robust, scalable, maintainable, and testable platform. While refactoring, the entire stack is reconsidered in consensus with the team.
A - Research - Typescript, React, Next.js, hexagonal architecture, unit testing, vertical migration, subdomains with shared authentication in browser, Turborepo, Vercel CI, design system.
R - Complete refactoring of the application with minimal friction for the user. Gradual production deployment of large functionality blocks. Divide and conquer.

#### Case 2 - Translations and DAM

S - Translations: Managing translations with i18n requires a deploy for every single comma change | Multimedia: Managing multimedia resources within the project.
T - Give the communication team autonomy in managing copies and translations | Give the design team autonomy for updating resources `on the go`.
A - Research of SaaS tools for translation management and integration => Phrase => Migration of ~8k translation keys to the platform and API consumption. Redundancy systems to mitigate downtime | Bulk upload of ~1k graphic resources to the Cloudinary platform.
R - Autonomy for communication and translation management by the external agency. Hot changes for any platform copy. Design implements the keys in Figma, improving communication, design, development workflow | WebP formats, autonomous watermark management for the catalog, resizing, CDN. Load time optimization, SEO improvement, empowerment of the design team.

#### Case 3 - ALGOLIA

S - The company needs a global search engine.
T - Research SQL, Google V8, Algolia.
A - Synchronization of Laravel models with Algolia indexes. Queries to models via API, merging and rendering index information with translations.
R - Search engine with Elastic Search power, global solution for Products, FAQs, Technical Documentation, Commercial Documentation, Videos.

#### Case 4 - Design system

S - In pursuit of platform scalability, a design system is required to be shared across all company applications. DRY.
T - Creation of all components, from atomic to complex.
A - Development and unit testing of all components, synchronization with Storybook for library documentation.
R - Platform homogenization in UX and UI. Scalability, maintainability, testing, Reusability in Figma.

#### Case 5 - Storyblok

S - To provide autonomy to design and communication in developing static landings.
T - Research HCMS in the market. For web and digital documentation.
A - Development of API synchronization of the design system for use in Storyblok context.
R - Autonomy in generating landings, A/B testing. Development of installation manuals, user manuals, product certificates, datasheets, moving from PDF to URL, indexable and shareable.

#### Case 6 - Hexagonal architecture

S - Separation of responsibilities in code - Typescript.
T - Implement DDD - layered architecture. Domain, application, and infrastructure. Frontend data modeling. Repository pattern, infrastructure layer to decouple dependencies and implementation details - persistence.
A - Turborepo allows a shared UI layer, an infrastructure package outside the application, and each app manages its use cases. TDD => red tests, HTTP methods - DTOs, repository - contract, use case, component instances importing use cases.
R - Scalability, maintainability, testing, SOLID, composition vs inheritance, functional programming, value objects, entities, aggregates.

#### Case 7 - SEO Headings

S - Component instances do not maintain heading hierarchy.
T - Find a scalable way to handle heading behavior.
A - Each atomic H component has its own styles according to design but receives via props the possibility to render as a different H while maintaining style.
R - All component instances can comply with correct heading hierarchy.

#### Case 8 - SEO Markets

S - The platform must work with the company's 17 global markets (country groupings).
T - Generate an hreflang structure to allow search engines to index content correctly based on geographic location.
A - Script to generate hreflang and canonical tags to improve positioning and proper content indexing.
R - Improved search engine positioning for geolocated content.

#### Case 9 - Training vs Consulting

S - The team invests in training but we cannot efficiently apply acquired knowledge on the platform.
T - Find mechanisms for the team to grow professionally and have the results benefit the company.
A - Shift the training budget to specialized consulting so the training applies to our use cases instead of generic scenarios.
R - DDD, qualitative unit testing, professional growth of the team.

#### Case 10 - SCRUM

S - The company lacks the concept of agility.
T - Show the team the benefits of agile methodologies.
A - PSM I certification for the 2 development departments (systems and R&D). Implementation of SCRUM.
R - Improved goal achievement. Predictability of value deliveries.

#### Case 11 - SCRUM Consolidation

S - Agile framework is not consolidated in the company and artifacts are missing.
T - Demonstrate the need for product owner and scrum master.
A - Initial support for these roles in understanding company domain. QA initiation. Jira implementation. Academic SCRUM.
R - Measurement and evolution of team work pace. Better achievement of objectives. Agile value delivery.

#### Case 12 - Data governance

S - 1st course of the Data Science degree (2019).
T - Demonstrate the benefits of orienting the company to a Data-Driven Decision Company model.
A - Share acquired knowledge with managers regarding data lakes, data governance, and their application in Industry 4.0.
R - Currently, there is an internal team responsible for data analysis, and although still in R&D, decisions are already being made based on data.
