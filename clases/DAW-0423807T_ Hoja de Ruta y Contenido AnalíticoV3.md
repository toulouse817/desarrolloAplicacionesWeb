# **UNIVERSIDAD NACIONAL EXPERIMENTAL DEL TÁCHIRA**
## **DECANATO DE DOCENCIA • DEPARTAMENTO DE INGENIERÍA INFORMÁTICA**

### **Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)**

**Facilitador:** M.Sc. Ing. Gabriel Alexis Ramírez Sánchez  
**Período Académico:** Septiembre, 2026  
**San Cristóbal, Estado Táchira, Venezuela**

---

## **Tabla de Contenidos**

> 1.  [**Introducción y Proyecto Integrador**](#bookmark=id.4rzbirv858rb)  
   * [1.1 Proyecto Integrador: Sistema de Gestión de Inventario Empresarial](#yhsidvrq)  
   * [1.2 Justificación Tecnológica y Competencias Profesionales](#1.2-justificación-tecnológica-y-competencias-profesionales)  
> 2.  [**Programa Analítico y Metodología**](#bookmark=id.y49uqjle1f9h)  
> 3.  [**Desarrollo por Unidades (Hoja de Ruta Pedagógica de 5 Semanas)**](#bookmark=id.tzu0m046ad4q)  
   * [Semana 1: Fundamentación Teórica y Decisiones de Diseño.Onion Architecture, Inyección de Dependencias & Manejo de Errores RFC 7807](#semana-1:-fundamentos-arquitectónicos,-ecosistema-.net-10-y-resiliencia-en-apis-rest)  
   * [Semana 2: Mapeo Objeto-Relacional (EF Core 10), Fluent API & Siembra de Datos](#bookmark=id.u6uqawxd4am6)  
   * [Semana 3: Autenticación Stateless (JWT), Autorización Granular (RBAC) & FluentValidation](#bookmark=id.5a4g53tigqub)  
   * [Semana 4: Frontend SPA (React \+ Vite \+ Tailwind CSS), Dashboard de Indicadores KPI & Pruebas Unitarias (xUnit & Moq)](#bookmark=id.52ghvvgd3pug)  
   * [Semana 5: Contenerización Multi-stage (Docker Compose), DevOps, CI/CD & Sustentación Técnica](#bookmark=id.5dcdx2azubxe)  
> 4.  [**Explicación Exhaustiva de las Mejores Prácticas de Ingeniería de Software**](#bookmark=id.neer97l52423)  
> 5.  [**Análisis de Información Crítica y Modelado de Dominio en Sistemas de Inventario**](#bookmark=id.snpp1gx3781b)  
> 6.  [**Guía de Despliegue, Contenerización y CI/CD**](#bookmark=id.2u46kzy6z333)  
> 7.  [**Anexo: Código de Boilerplate Completo y Comentado Línea por Línea**](#bookmark=id.t0lttqlhfiff)  
   * [7.1 Capa Core.Domain](#cjcowdvw)  
   * [7.2 Capa Core.Application](#bookmark=id.unm2p3vljbfp)  
   * 7.3 Capa Infrastructure  
   * [7.4 Capa Presentation.API](#bookmark=id.8wg48vawg75o)  
   * 7.5 Capa Frontend React  
   * 7.6 Pruebas Unitarias Automatizadas (xUnit & Moq)  
   * 7.7 Contenerización (Dockerfiles & docker-compose.yml)  
> 8.  [**Actividades Pedagógicas Complementarias**](#bookmark=id.fog5ohkxxj1a)  
> 9.  [**Propuestas de Proyectos Finales para Estudiantes**](#bookmark=id.tdpcghk10zeo)  
> 10.  [**Glosario de Términos y Acrónimos**](#bookmark=id.hmg71n9t09fr)  
> 11.  [**Referencias Bibliográficas**](#bookmark=id.sofsmphmwocl)

## **1\. Introducción y Proyecto Integrador**

En el panorama tecnológico contemporáneo, el desarrollo **Full-Stack** bajo estándares corporativos exige la articulación armónica de patrones de arquitectura limpia, seguridad estricta, alto rendimiento en la persistencia de datos y experiencias de usuario reactivas y accesibles. Este curso adopta .NET 10 (Microsoft, 2026\) en el Backend, aprovechando su tipado estático, runtime optimizado y robustez empresarial, combinado con React 18+ (React, 2026), Vite y Tailwind CSS en el Frontend.

### **1.1 Proyecto Integrador: Sistema de Gestión de Inventario Empresarial**

Con el propósito de consolidar las competencias profesionales del futuro ingeniero informático de la UNET, la asignatura se vertebra en torno a un proyecto integrador enfocado en el sector comercial de **ferretería, herramientas y materiales de construcción**. Este dominio del mundo real ofrece un escenario óptimo para desafiar al estudiante a trascender la codificación básica, guiándolo en la aplicación rigurosa de la **Onion Architecture** y los patrones tácticos del **Domain-Driven Design (DDD)**. A lo largo del desarrollo, los estudiantes abordarán desafíos esenciales de ingeniería, como la protección criptográfica de accesos, la integración de analítica ejecutiva de negocios y el despliegue continuo en entornos contenerizados (Docker Inc., 2026\) (ver Figura Nro. 1). Entre las funcionalidades principales del sistema destacan:

> * **Gestión de Catálogo:** Operaciones CRUD completas para productos y categorías con integridad referencial restrictiva (DeleteBehavior.Restrict).  
> * **Control de Existencias & Finanzas:** Monitoreo de stock físico, umbrales mínimos de seguridad (MinStock), capacidad máxima (MaxStock), ubicación física en almacén, unidad de medida, marcas comerciales y valorización de costos de adquisición vs. precios de venta al público (PVP).  
> * **Seguridad Robusta:** Autenticación Stateless basada en JSON Web Tokens (JWT) y autorización granular Role-Based Access Control (RBAC) diferenciando roles Admin y Employee.  
> * **Frontend Dinámico y Analítico:** Single Page Application (SPA) con selector de tema institucional UNET (Azul UNET \#003366 / Modo Oscuro persistente) y un **Dashboard de Indicadores KPI** interactivo con métricas de rotación, salud operativa y gráficos protegidos contra desbordamiento.

**![][image1]**

**Figura Nro. 1\. Esquema Funcional y Arquitectónico del Proyecto Integrador**

          

### **1.2 Justificación Tecnológica y Competencias Profesionales**

La elección de un stack tecnológico moderno (ASP.NET Core 10 y React 18) (Microsoft, 2026; React, 2026\) no es fortuita, sino que responde a la necesidad de capacitar al estudiante en herramientas de alta demanda en el mercado laboral actual. Al integrar arquitecturas de software robustas con metodologías de despliegue automatizado, el estudiante no solo codifica, sino que diseña sistemas sostenibles y escalables.  
Las competencias adquiridas incluyen:

> * **Pensamiento Arquitectónico:** Dominio de la separación de responsabilidades y desacoplamiento de capas mediante Onion Architecture.  
> * **Seguridad Aplicada:** Implementación proactiva de estándares de seguridad (JWT, RBAC) para mitigar vectores de ataque comunes en APIs web.  
> * **DevOps y Despliegue:** Automatización de ciclos de vida mediante Docker (Docker Inc., 2026), garantizando que el entorno de desarrollo sea idéntico al de producción.  
> * **Analítica de Datos:** Capacidad de transformar requerimientos de negocio en indicadores KPI visuales e interactivos para la toma de decisiones.

## **2\. Programa Analítico y Metodología**

**Objetivo General:** Capacitar al estudiante de Ingeniería Informática de la UNET en el diseño, desarrollo, aseguramiento de calidad y despliegue en producción de sistemas empresariales Full-Stack modernos, aplicando la **Onion Architecture** en .NET 10, persistencia relacional con **Entity Framework Core 10**, seguridad stateless JWT/RBAC, interfaces reactivas en React con analítica visual en tiempo real y orquestación de micro-contenedores mediante **Docker** y pipelines **CI/CD**.

| Unidad Temática | Contenido Principal | Metodología y Práctica | Ponderación   |
| ----- | :---- | :---- | ----- |
| **Unidad I: Backend Corporativo** | Onion Architecture, RESTful APIs, Inyección de Dependencias (Microsoft, 2026), EF Core 10, Fluent API (Entity Framework Core Team, 2026), FluentValidation y Auth JWT. | Exposición conceptual, Live Coding guiado, construcción de micro-capas y pruebas de endpoints en Postman. | **40%** |
| **Unidad II: Frontend y Analítica** | React 18 SPA (React, 2026), Tailwind CSS, Context API, Dashboard de Indicadores KPI, xUnit, Moq, Docker Multi-stage (Docker Inc., 2026). | Diseño responsivo de componentes UI, pruebas unitarias deterministas, configuración de contenedores y testing. | **40%** |
| **Unidad III: Sustentación y DevOps** | Validación integral de microservicios contenerizados, defensa de decisiones arquitectónicas y auditoría de código. | Despliegue en vivo (Live Demo), sustentación técnica oral ante tribunal evaluador y ronda de preguntas de ingeniería. | **20%** |
| **Calificación Total** |  |  | **100%** |

## 

## **3\. Desarrollo por Unidades (Hoja de Ruta Pedagógica de 5 Semanas)**

Para garantizar una progresión didáctica óptima y un aprendizaje altamente efectivo, cada sesión semanal de 120 minutos (2 horas lectivas presenciales o virtuales) se articula rigurosamente a través de un esquema instruccional de cuatro momentos estratégicos:  
**00-25 min:** Fundamentación Teórica y Decisiones de Diseño Arquitectónico.  
**25-70 min:** *Live Coding* y Demostración Práctica del Facilitador.  
**70-100 min:** Laboratorio / Taller Guiado para los Estudiantes.  
**100-120 min:** Retrospectiva, Preguntas Clave y Asignación Semanal.

### **Semana 1: Fundamentos Arquitectónicos, Ecosistema .NET 10 y Resiliencia en APIs REST**

**Objetivos Pedagógicos:** Comprender la evolución tecnológica del ecosistema .NET hasta su versión 10 (Microsoft, 2026); diseñar la estructura base de un sistema empresarial aplicando los principios de la Arquitectura Cebolla (Onion Architecture); implementar la Inyección de Dependencias (DI) nativa gestionando sus ciclos de vida (Transient, Scoped, Singleton) para evitar dependencias cautivas; y construir una estrategia centralizada de gestión de errores en la API utilizando el estándar RFC 7807 (Problem Details) (IETF Network Working Group, 2016).  
**Estructura Modular de la Solución:**

* Core.Domain: Entidades puras y enumeraciones del negocio (BaseEntity, Product, Category, User).  
  * Core.Application: Abstracciones (Interfaces), DTOs, validadores y lógica de casos de uso.  
  * Infrastructure: Persistencia con EF Core 10, Fluent API y repositorios.  
  * Presentation.API: Controladores RESTful, Middlewares y configuración en Program.cs.

**Contexto Tecnológico: Evolución y Capacidades de** .NET 10 **(Microsoft, 2026\)**  
Para comprender la relevancia de las decisiones arquitectónicas que tomaremos en el curso, es crucial analizar primero la plataforma de desarrollo sobre la cual construiremos nuestro sistema. .NET es un ecosistema multiplataforma, gratuito y de código abierto creado por Microsoft, diseñado para ejecutar aplicaciones de alto rendimiento en diversos entornos.

* **Evolución Histórica:** La plataforma inició con .NET Framework a principios de los 2000, un entorno acoplado al sistema operativo Windows. En 2016, Microsoft reescribió el motor desde cero con .NET Core, introduciendo soporte multiplataforma (Linux, macOS, Windows) y una arquitectura modular. Finalmente, con la llegada de .NET 5 y sus iteraciones posteriores, se logró la unificación definitiva de la plataforma.

**Avances Clave en** .NET 10 **y** C\# 14 **(Microsoft, 2026):**  
En la actualidad, .NET 10 proporciona las herramientas necesarias para la construcción de backend corporativos orientados a microservicios y despliegue en la nube, destacándose por tres pilares fundamentales:

* **Rendimiento Cloud-Native:** Tiempos de inicio mínimos y gestión eficiente de memoria RAM, factores esenciales al trabajar con contenedores Docker.  
* **Integración de** C\# 14**:** Uso del lenguaje C\# en su versión más reciente, ofreciendo tipado estático seguro, recolección de basura optimizada y abstracciones avanzadas de programación asíncrona.  
* **Ecosistema Unificado:** Herramientas integradas de logging, configuración, seguridad y contenedor IoC para inyección de dependencias sin requerir librerías externas complejas.

**Solución Estructural: Arquitectura Cebolla (Onion Architecture)**  
Una vez definido el entorno tecnológico, el siguiente paso en la ingeniería de software es establecer el diseño estructural de la aplicación. Para evitar acoplamientos rígidos que dificulten el mantenimiento, utilizaremos la **Arquitectura Cebolla (Onion Architecture)**.  
Este patrón ubica las reglas de negocio en el centro del sistema y organiza el código en capas concéntricas regidas por la **Regla de Dependencia**: las capas externas pueden depender de las internas, pero las capas internas jamás deben conocer los detalles de las externas.

Aplicada a nuestro Sistema de Gestión de Inventario Empresarial, la arquitectura se divide en cuatro capas concéntricas bien delimitadas (ver Figura Nro. 2):

![][image2]

**Figura Nro. 2\. Onion Architecture: Sistema de Gestión de Inventario Empresarial**

Desglose de responsabilidades por capa:

*  **Núcleo de Dominio (**Core.Domain**):** Contiene las entidades puras del negocio (*Producto*, *Categoría*) escritas en C\# puro. No tiene dependencias con bases de datos ni librerías externas.  
*  **Capa de Aplicación (**Core.Application**):** Modela los casos de uso del sistema (Gestión de Catálogo y Control de Existencias), definiendo DTOs, validaciones e interfaces de repositorios sin importar su implementación técnica.  
*  **Capa de Infraestructura (**Infrastructure**):** Implementa los detalles técnicos externos, incluyendo el acceso a datos mediante Entity Framework Core 10, mecanismos de seguridad (JWT/RBAC) y servicios de integración.  
*  **Capa de Presentación (**Presentation.API**):** El punto de entrada web que expone las APIs RESTful, coordina el pipeline HTTP e inyecta las dependencias necesarias para la ejecución.

Gracias a este desacoplamiento, la lógica de negocio permanece protegida y evaluable mediante pruebas unitarias, facilitando cambios futuros en la persistencia o en el cliente de interfaz sin impactar el núcleo del sistema.

**Herramienta de Robustez:** Middleware **Global de Excepciones (RFC 7807\)**

Con la estructura arquitectónica definida, requerimos un mecanismo robusto para manejar las contingencias y errores en el tiempo de ejecución. En lugar de dispersar bloques de captura de errores (try-catch) en cada controlador, se implementa un Middleware Global de Excepciones en la Capa de Presentación.

Este componente se intercepta en el pipeline HTTP y estandariza todas las respuestas de error bajo el estándar internacional **RFC 7807 (Problem Details for HTTP APIs)** (IETF Network Working Group, 2016).

* **Estructura del Estándar RFC 7807:** Las respuestas de error devuelven un documento JSON uniforme con campos estandarizados: type (URI del error), title (resumen breve), status (código HTTP), detail (explicación del fallo) e instance (URI de la petición).  
* **Seguridad y Ocultamiento de Trazas:** Oculta información sensible del servidor y trazas de código (Stack Traces) en entornos de producción, previniendo la fuga de información técnica.  
* **Integración Predecible con el Frontend:** Permite que la aplicación cliente en React interprete de forma predecible cualquier fallo del backend y presente mensajes amigables al usuario final.

A continuación, se presenta la implementación en C\# del middleware que centraliza este comportamiento:

// Archivo: src/backend/Presentation.API/Middleware/ExceptionMiddleware.cs  
namespace Presentation.API.Middleware;

using System;  
using System.Net;  
using System.Text.Json;  
using System.Threading.Tasks;  
using Microsoft.AspNetCore.Http;  
using Microsoft.Extensions.Logging;

/// \<summary\>  
/// Middleware global para capturar todas las excepciones no controladas del HTTP Pipeline.  
/// Justificación Didáctica: Centraliza el tratamiento de fallos y emite respuestas estándar  
/// bajo la norma RFC 7807 (ProblemDetails), ocultando Stack Traces sensibles en producción.  
/// \</summary\>  
public class ExceptionMiddleware  
{  
    private readonly RequestDelegate \_next;  
    private readonly ILogger\<ExceptionMiddleware\> \_logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger\<ExceptionMiddleware\> logger)  
    {  
        \_next \= next;  
        \_logger \= logger;  
    }

    public async Task InvokeAsync(HttpContext context)  
    {  
        try  
        {  
            // Ejecución normal del pipeline de procesamiento HTTP  
            await \_next(context);  
        }  
        catch (KeyNotFoundException ex)  
        {  
            \_logger.LogWarning(ex, "Recurso no encontrado: {Message}", ex.Message);  
            await HandleExceptionAsync(context, HttpStatusCode.NotFound, "Recurso No Encontrado", ex.Message);  
        }  
        catch (InvalidOperationException ex)  
        {  
            \_logger.LogWarning(ex, "Operación inválida de negocio: {Message}", ex.Message);  
            await HandleExceptionAsync(context, HttpStatusCode.BadRequest, "Solicitud Inválida", ex.Message);  
        }  
        catch (Exception ex)  
        {  
            \_logger.LogError(ex, "Error crítico interno no controlado en el servidor.");  
            await HandleExceptionAsync(context, HttpStatusCode.InternalServerError, "Error Interno del Servidor", "Ocurrió un error inesperado al procesar la solicitud.");  
        }  
    }

    private static async Task HandleExceptionAsync(HttpContext context, HttpStatusCode statusCode, string title, string detail)  
    {  
        context.Response.ContentType \= "application/problem+json";  
        context.Response.StatusCode \= (int)statusCode;

        var problemDetails \= new  
        {  
            type \= $"https://httpstatuses.com/{(int)statusCode}",  
            title \= title,  
            status \= (int)statusCode,  
            detail \= detail,  
            instance \= context.Request.Path.Value  
        };

        var json \= JsonSerializer.Serialize(problemDetails);  
        await context.Response.WriteAsync(json);  
    }  
}  
En resumen, este componente transforma una caída inesperada del servidor en una respuesta controlada y profesional, permitiendo que el cliente reaccione adecuadamente y mantenga una experiencia de usuario consistente. 

### **Semana 2: Mapeo Objeto-Relacional (EF Core 10), Fluent API & Siembra de Datos**

**Objetivos Pedagógicos:** Dominar el modelado relacional mediante el enfoque Code-First con Entity Framework Core 10 (Entity Framework Core Team, 2026); implementar configuraciones de mapeo mediante **Fluent API** para garantizar la integridad de datos e índices eficientes; optimizar las operaciones de lectura utilizando consultas sin seguimiento (AsNoTracking); y establecer estrategias sólidas de siembra de datos (Data Seeding) representativas del sector comercial de ferretería y construcción.

**Persistencia Relacional y Modelado Code-First**  
En el desarrollo de aplicaciones empresariales, la capa de persistencia debe abstraer de manera limpia la interacción con el motor de base de datos relacional. Entity Framework Core 10 actúa como el mapeador objeto-relacional (ORM) encargado de traducir las entidades del dominio en tablas y relaciones físicas dentro de PostgreSQL, manteniendo la coherencia conceptual del modelo (ver Figura Nro. 3\).

**Separación de Responsabilidades mediante Fluent API**  
Para desacoplar el modelo de dominio de los detalles de infraestructura, se evita el uso de anotaciones de datos (Data Annotations) directamente sobre las entidades. En su lugar, se utiliza Fluent API mediante clases de configuración dedicadas (Entity Framework Core Team, 2026). Esta aproximación centraliza las reglas relacionales, tales como restricciones de longitud, precisión de tipos decimales monetarios, índices de búsqueda rápida O(1) e integridad referencial foránea, (ver Figura Nro. 3\).

**Estrategias de Siembra de Datos (Data Seeding) y Optimización**  
Para que el sistema de gestión de inventario sea funcional desde el primer despliegue, es indispensable implementar una estrategia de *Data Seeding*. Esto consiste en la inserción automatizada de datos maestros (categorías, marcas, unidades de medida y productos iniciales) durante la creación de la base   
de datos. Pedagógicamente, esto permite al estudiante validar inmediatamente las reglas de negocio, como las alertas de stock mínimo (MinStock) y los cálculos de valorización financiera, sin depender de carga manual, (ver Figura Nro. 3\)

.![][image3]

**Figura Nro. 3\. Diagrama de Arquitectura de Persistencia y Modelado Code-First (EF Core 10\)**

Asimismo, se introduce el concepto de rendimiento mediante .AsNoTracking(). En entornos empresariales con catálogos extensos, esta técnica de Entity Framework Core optimiza la memoria de la API al desactivar el seguimiento de cambios (ChangeTracker) en consultas de solo lectura, una práctica crítica para garantizar que el Dashboard KPI del frontend responda con latencia mínima (ver Figura Nro. 3).

**Implementación Práctica: Configuración del Mapeo Relacional (Fluent API)**

// Archivo: src/backend/Infrastructure/Persistence/Configurations/ProductConfiguration.cs  
namespace Infrastructure.Persistence.Configurations;

using Core.Domain.Entities;  
using Microsoft.EntityFrameworkCore;  
using Microsoft.EntityFrameworkCore.Metadata.Builders;

/// \<summary\>  
/// Configuración relacional explícita de Product mediante Fluent API.  
/// Justificación Didáctica: Mantiene la entidad de dominio libre de atributos de base de datos  
/// y asegura índices únicos, precisión decimal monetaria y restricciones de integridad foránea.  
/// \</summary\>  
public class ProductConfiguration : IEntityTypeConfiguration\<Product\>  
{  
    public void Configure(EntityTypeBuilder\<Product\> builder)  
    {  
        builder.ToTable("Products");  
        builder.HasKey(p \=\> p.Id);

        builder.Property(p \=\> p.Name).IsRequired().HasMaxLength(150);  
        builder.Property(p \=\> p.SKU).IsRequired().HasMaxLength(20);  
        builder.HasIndex(p \=\> p.SKU).IsUnique(); // Búsquedas indexadas O(1)

        builder.Property(p \=\> p.Description).HasMaxLength(500);  
        builder.Property(p \=\> p.Price).IsRequired().HasPrecision(18, 2); // Evita error de redondeo flotante  
        builder.Property(p \=\> p.CostPrice).IsRequired().HasPrecision(18, 2);

        builder.Property(p \=\> p.Stock).IsRequired();  
        builder.Property(p \=\> p.MinStock).IsRequired().HasDefaultValue(5);  
        builder.Property(p \=\> p.MaxStock).IsRequired().HasDefaultValue(100);

        builder.Property(p \=\> p.Location).HasMaxLength(100).HasDefaultValue("Almacén Principal");  
        builder.Property(p \=\> p.UnitOfMeasure).HasMaxLength(30).HasDefaultValue("Unidad");  
        builder.Property(p \=\> p.Brand).HasMaxLength(80);  
        builder.Property(p \=\> p.IsActive).IsRequired().HasDefaultValue(true);

        // Relación 1:N con Category e integridad referencial restrictiva  
        builder.HasOne(p \=\> p.Category)  
            .WithMany(c \=\> c.Products)  
            .HasForeignKey(p \=\> p.CategoryId)  
            .OnDelete(DeleteBehavior.Restrict);  
    }  
}  
El archivo ProductConfiguration.cs actúa como el **"traductor" técnico** entre el modelo de dominio (las clases C\# en la capa Core) y la estructura física de la base de datos (PostgreSQL).

Su función principal es aplicar el patrón **Fluent API** para configurar las reglas de mapeo de la entidad Product. A diferencia de usar atributos sobre la clase (Data Annotations), esta estrategia es preferida en arquitecturas profesionales como la **Onion Architecture** por las siguientes razones:

* **Desacoplamiento total (Separación de Intereses):** Al separar la configuración del mapeo de la definición de la clase Product, logras que tu entidad de negocio se mantenga "limpia" y agnóstica de la base de datos. Esto es fundamental para la mantenibilidad a largo plazo.  
* **Integridad y Reglas de Negocio:**  
  * **Precisión Financiera:** Define HasPrecision(18, 2\) para los precios y costos. Esto evita errores de redondeo en los cálculos financieros del inventario, algo crítico cuando manejas valores monetarios.  
  * **Integridad Referencial:** Configura la relación DeleteBehavior.Restrict. Esto es vital en un sistema de inventario: impide, por ejemplo, que un usuario elimine accidentalmente una categoría si todavía contiene productos asociados, protegiendo la consistencia de tus datos.  
* **Optimización de Rendimiento:**  
  * Al definir HasIndex(p \=\> p.SKU).IsUnique(), le indicas a la base de datos que genere un índice optimizado. Esto permite que las búsquedas de productos por su código SKU sean operaciones de tiempo constante **O(1)**, garantizando que el sistema sea rápido incluso cuando el catálogo crezca a miles de ítems.  
* **Validación de Capa de Infraestructura:**  
  * Establece restricciones de longitud (HasMaxLength) y valores por defecto (HasDefaultValue) a nivel de base de datos. Esto funciona como una "red de seguridad" adicional; aunque la aplicación valide los datos, la base de datos rechaza cualquier entrada malformada que intente corromper la integridad de tu inventario.

En síntesis, este archivo **garantiza que los datos de la ferretería sean precisos, seguros y eficientes**, centralizando todas las reglas de persistencia en un solo lugar y manteniendo el núcleo de tu aplicación libre de dependencias tecnológicas. 

### 

### **Semana 3: Autenticación Stateless (JWT), Autorización Granular (RBAC) & FluentValidation**

**Objetivos Pedagógicos:** Comprender e implementar esquemas de autenticación stateless basados en tokens JSON Web Tokens (JWT) firmados criptográficamente; estructurar esquemas de autorización granular basados en roles (RBAC); y desacoplar las reglas de validación defensiva mediante FluentValidation para proteger la API contra entradas malformadas y vulnerabilidades OWASP comunes (OWASP Foundation, 2021).

**Pipeline Secuencial de Autenticación y Validación Defensiva:** Para garantizar un entorno seguro y robusto en la API, la Figura Nro. 4 detalla el pipeline secuencial de autenticación y validación defensiva. Este diagrama ilustra cómo las solicitudes HTTP entrantes son filtradas primero por mecanismos de seguridad stateless mediante JWT y autorización granular RBAC, asegurando la identidad y los permisos del usuario antes de cualquier procesamiento. Posteriormente, se aplica una validación defensiva desacoplada a través de FluentValidation, la cual actúa como un filtro de integridad de datos crítico, bloqueando entradas malformadas o maliciosas antes de que alcancen la lógica de negocio en el núcleo de la aplicación.   
![][image4]  
**Figura Nro. 4\. Diagrama de Flujo de Autenticación, Autorización y Validación Defensiva** 

**Autenticación Stateless y Seguridad Criptográfica**  
En arquitecturas web modernas orientadas a microservicios y clientes SPA, la gestión de sesiones en servidor genera cuellos de botella de escalabilidad. La autenticación mediante JWT resuelve esto al transmitir la identidad del usuario y sus privilegios (claims) en un token autocontenido y firmado con HMAC SHA-256, permitiendo la verificación inmediata en cada petición HTTP sin necesidad de consultar el almacenamiento central de sesiones (ver Figura Nro. 4).

**Validación Defensiva Decoupled con FluentValidation**  
El aseguramiento de datos de entrada es la primera línea de defensa frente a vulnerabilidades como Mass Assignment o Inyección de Código. Separar la lógica de validación de los controladores y entidades de dominio mediante la librería FluentValidation asegura que las peticiones se verifiquen rigurosamente antes de ingresar a la lógica del sistema, emitiendo respuestas claras y estructuradas cuando los datos no cumplen con las reglas establecidas (ver Figura Nro. 4).

**Implementación Práctica \- Validador de Negocio (FluentValidation):**

// Archivo: src/backend/Core.Application/Validations/CreateProductValidator.cs  
namespace Core.Application.Validations;

using Core.Application.DTOs;  
using FluentValidation;

/// \<summary\>  
/// Validador desacoplado para la creación y edición de productos.  
/// Justificación Didáctica: Valida reglas de negocio complejas antes de que los datos ingresen  
/// a los servicios de dominio, blindando la API contra datos anómalos o malformados.  
/// \</summary\>  
public class CreateProductValidator : AbstractValidator\<CreateProductDto\>  
{  
    public CreateProductValidator()  
    {  
        RuleFor(x \=\> x.Name)  
            .NotEmpty().WithMessage("El nombre del producto es obligatorio.")  
            .MaximumLength(150).WithMessage("El nombre no puede exceder 150 caracteres.");

        RuleFor(x \=\> x.SKU)  
            .NotEmpty().WithMessage("El código SKU es obligatorio.")  
            .MaximumLength(20).WithMessage("El SKU no puede superar 20 caracteres.");

        RuleFor(x \=\> x.Price)  
            .GreaterThan(0).WithMessage("El precio de venta debe ser mayor a 0.");

        RuleFor(x \=\> x.CostPrice)  
            .GreaterThanOrEqualTo(0).WithMessage("El costo de adquisición no puede ser negativo.");

        RuleFor(x \=\> x.Stock)  
            .GreaterThanOrEqualTo(0).WithMessage("El stock no puede ser negativo.");

        RuleFor(x \=\> x.MinStock)  
            .GreaterThanOrEqualTo(0).WithMessage("El stock mínimo no puede ser negativo.");

        RuleFor(x \=\> x.MaxStock)  
            .GreaterThan(x \=\> x.MinStock).WithMessage("El stock máximo debe ser mayor al stock mínimo.");

        RuleFor(x \=\> x.CategoryId)  
            .NotEmpty().WithMessage("Debe asignar una categoría válida al producto.");  
    }  
}

### **Semana 4: Frontend SPA (React \+ Vite \+ Tailwind CSS), Dashboard de Indicadores KPI & Pruebas Unitarias (xUnit & Moq)**

**Objetivos Pedagógicos:** Diseñar una interfaz de usuario reactiva en React SPA estructurada con Vite y Tailwind CSS (React, 2026); gestionar el estado global (autenticación y temas) mediante la Context API; implementar un **Dashboard de Indicadores KPI** interactivo para analítica operativa; y redactar pruebas unitarias deterministas en C\# utilizando xUnit y Moq para validar el correcto comportamiento de los servicios del backend.

La Figura Nro. 5 ilustra la estructura arquitectónica y metodológica de la Semana 4, caracterizada por un enfoque dual que balancea el diseño de interfaces de usuario altamente reactivas con el aseguramiento de la calidad mediante pruebas automatizadas. En esta fase del proyecto integrador, el estudiante converge el desarrollo visual del cliente (Frontend SPA) con la validación rigurosa del comportamiento lógico en el servidor (Backend). Esto garantiza que las funcionalidades de gestión de inventario y analítica de negocio operen de manera predecible, segura y bajo estándares de nivel corporativo.  
El primer bloque de la arquitectura, situado en la parte superior, detalla la estructura del Frontend SPA construido sobre React, Vite y Tailwind CSS (ver [React Dev](https://react.dev/)). Este ecosistema proporciona una interfaz ágil, responsiva y adaptada a la identidad visual de la UNET. A través de la Context API, se administra de forma descentralizada el estado global de la aplicación, controlando de manera persistente en localStorage la sesión de autenticación (JWT) y las preferencias del tema visual de la institución. Este estado alimenta directamente al Dashboard de Indicadores KPI, un componente crítico encargado de procesar y renderizar en tiempo real las métricas financieras (costos vs. precios de venta) y las alertas logísticas de existencias críticas (mínimos y máximos de seguridad), traduciendo datos crudos en información de valor para la toma de decisiones.  
Ubicado en la parte inferior, el segundo bloque describe la estrategia de calidad basada en pruebas unitarias deterministas implementadas con xUnit y Moq. El motor xUnit actúa como el entorno de ejecución (Test Runner) que evalúa de forma automatizada las reglas de negocio en la capa de aplicación. Para lograr un aislamiento absoluto de la lógica que se desea evaluar, se utiliza el framework de simulación Moq. Este componente genera réplicas controladas (mocks) de las abstracciones de infraestructura, como la interfaz del repositorio de productos (IProductRepository), inyectando comportamientos predecibles que simulan la persistencia sin requerir conexiones físicas a la base de datos PostgreSQL. Esto asegura que la lógica de negocio de los servicios se valide de forma instantánea, rápida y libre de efectos colaterales.  
En conjunto, este esquema metodológico modela un flujo de trabajo moderno de integración de software donde la presentación visual y el rigor de las pruebas lógicas avanzan en paralelo. Al desacoplar la interfaz de usuario del backend y blindar las reglas de negocio mediante pruebas aisladas, se logra un sistema altamente mantenible. Esta aproximación minimiza la deuda técnica y dota al futuro ingeniero informático de la UNET de las destrezas necesarias para estructurar, probar y evolucionar arquitecturas de software sostenibles en entornos reales de producción (ver Figura Nro. 5).  
![][image5]  
**Figura Nro. 5\. Esquema de Cliente React SPA y Pruebas Unitarias Aisladas**

**Desarrollo de Interfaces SPA y Visualización Analítica**  
El frontend de una aplicación empresarial debe traducir modelos de datos complejos en experiencias dinámicas e intuitivas. La integración de React con Tailwind CSS (React, 2026\) facilita la creación de componentes modulares y responsivos. Además, la incorporación de un Dashboard KPI permite transformar los datos del inventario en métricas operativas clave (como alertas de stock mínimo y valorización total), respaldando la toma de decisiones estratégicas.

**Calidad de Software mediante Pruebas Unitarias Automatizadas**  
Para verificar de forma aislada las reglas del negocio sin depender de la base de datos ni de servicios externos, se aplican pruebas unitarias automatizadas. Utilizando xUnit junto con Moq, es posible simular las dependencias de infraestructura y comprobar que los servicios del dominio reaccionen correctamente ante diversos escenarios, asegurando un código estable ante evoluciones futuras.

**Implementación Práctica \- Pruebas Unitarias de Servicios (xUnit & Moq):**

// Archivo: tests/UnitTests/Services/ProductServiceTests.cs  
namespace UnitTests.Services;

using System;  
using System.Threading.Tasks;  
using Core.Application.DTOs;  
using Core.Application.Interfaces;  
using Core.Application.Services;  
using Core.Domain.Entities;  
using Moq;  
using Xunit;

/// \<summary\>  
/// Pruebas unitarias para validar la lógica de negocio de ProductService en total aislamiento.  
/// \</summary\>  
public class ProductServiceTests  
{  
    private readonly Mock\<IProductRepository\> \_mockRepo;  
    private readonly ProductService \_service;

    public ProductServiceTests()  
    {  
        \_mockRepo \= new Mock\<IProductRepository\>();  
        \_service \= new ProductService(\_mockRepo.Object);  
    }

    \[Fact\]  
    public async Task GetProductByIdAsync\_WhenNotFound\_ThrowsKeyNotFoundException()  
    {  
        // Arrange  
        var nonExistentId \= Guid.NewGuid();  
        \_mockRepo.Setup(r \=\> r.GetByIdAsync(nonExistentId)).ReturnsAsync((Product?)null);

        // Act & Assert  
        await Assert.ThrowsAsync\<KeyNotFoundException\>(() \=\> \_service.GetProductByIdAsync(nonExistentId));  
        \_mockRepo.Verify(r \=\> r.GetByIdAsync(nonExistentId), Times.Once);  
    }  
}

### **Semana 5: Contenerización Multi-stage (Docker Compose), DevOps, CI/CD & Sustentación Técnica**

**Objetivos Pedagógicos:** Empaquetar aplicaciones web utilizando el patrón de construcción multietapa (Multi-stage Dockerfile) (Docker Inc., 2026); orquestar un ecosistema multicapa de microservicios mediante Docker Compose; estructurar pipelines de integración y despliegue continuo (CI/CD) con GitHub Actions; y llevar a cabo la sustentación técnica del proyecto integrador (ver Figura Nro. 6).  
**![][image6]**  
**Figura Nro. 6\. Diagrama de Flujo de DevOps, Contenerización Multi-stage y Orquestación**

Este diagrama de arquitectura y flujo ilustra la integración de las prácticas DevOps, la contenerización eficiente y la orquestación del entorno de desarrollo y producción para el proyecto integrador. El proceso está estructurado de manera jerárquica y secuencial para asegurar la entrega continua de valor, manteniendo la portabilidad del sistema en cualquier entorno.  
En la parte superior, el primer bloque representa el flujo de integración y despliegue continuo (CI/CD) automatizado mediante GitHub Actions. Cuando un desarrollador realiza un envío (push) al repositorio, se activa de forma automática un pipeline de compilación y pruebas unitarias que corre la suite completa de xUnit y Moq, validando la estabilidad lógica del backend antes de que cualquier cambio sea liberado.  
El segundo bloque describe el empaquetamiento optimizado mediante construcción de contenedores multietapa (Multi-stage Docker builds). Esta técnica separa rigurosamente la etapa de compilación (que utiliza herramientas pesadas como el SDK de .NET y Node.js) de la etapa de producción definitiva. Al descartar el SDK y conservar solo los ejecutables y archivos estáticos optimizados, se reduce drásticamente el tamaño de la imagen final de producción a menos de 120MB, alojándola en servidores ligeros y seguros como Nginx y runtimes limpios de .NET.  
Finalmente, en la base de la arquitectura, el motor de Docker Compose asume la orquestación local y de despliegue en una red interna unificada y reproducible. Esta orquestación coordina de manera ordenada la persistencia volumétrica y el arranque del contenedor de PostgreSQL, la API en ASP.NET Core 10 (con su respectiva verificación de salud interna o healthcheck) y el Frontend en React SPA servido por Nginx en el puerto 8080, permitiendo que todas las dependencias interactúen de forma segura y predecible.  
**Contenerización Eficiente y Orquestación de Servicios**  
La variabilidad en los entornos de desarrollo e infraestructura suele generar fallos impredecibles. Mediante el uso de imágenes Docker multietapa (Multi-stage builds) (Docker Inc., 2026), se separa la fase de compilación del entorno final de ejecución, obteniendo artefactos ligeros, seguros y portables. Por su parte, Docker Compose permite articular la API, el cliente frontend servido por Nginx y el motor PostgreSQL en una red interna unificada y reproducible.

**Automatización DevOps y Sustentación Técnica**  
La adopción de prácticas DevOps garantiza la entrega continua de valor a través de flujos de trabajo automatizados. La integración de pipelines en GitHub Actions permite validar la construcción y suite de pruebas en cada actualización. La unidad culmina con la defensa del proyecto integrador, donde los estudiantes justifican sus elecciones arquitectónicas y demuestran la operatividad del sistema en producción.

**Configuración Práctica \- Orquestación Local de Contenedores (**docker-compose.yml**):**

\# Archivo: ./docker-compose.yml  
version: '3.8'

services:  
  \# Base de Datos Relacional PostgreSQL  
  db:  
    image: postgres:15-alpine  
    container\_name: inventory\_db\_container  
    restart: always  
    environment:  
      POSTGRES\_USER: postgres  
      POSTGRES\_PASSWORD: postgrespassword  
      POSTGRES\_DB: inventory\_db  
    ports:  
      \- "5432:5432"  
    volumes:  
      \- postgres\_data:/var/lib/postgresql/data  
    healthcheck:  
      test: \["CMD-SHELL", "pg\_isready \-U postgres \-d inventory\_db"\]  
      interval: 5s  
      timeout: 5s  
      retries: 5

  \# Backend RESTful API en ASP.NET Core 10  
  api:  
    build:  
      context: .  
      dockerfile: src/backend/Presentation.API/Dockerfile  
    container\_name: inventory\_api\_container  
    restart: always  
    ports:  
      \- "5000:5000"  
    environment:  
      \- ASPNETCORE\_ENVIRONMENT=Development  
      \- ASPNETCORE\_URLS=http://+:5000  
      \- ConnectionStrings\_\_DefaultConnection=Host=db;Port=5432;Database=inventory\_db;Username=postgres;Password=postgrespassword  
      \- JwtSettings\_\_Key=UNET\_DESARROLLO\_DE\_APLICACIONES\_WEB\_SECRET\_KEY\_2026\_JWT\_SUPER\_SECURE\!  
      \- JwtSettings\_\_Issuer=UNET\_Inventory\_API  
      \- JwtSettings\_\_Audience=UNET\_Inventory\_Clients  
    depends\_on:  
      db:  
        condition: service\_healthy

  \# Frontend React SPA servido por Nginx  
  spa:  
    build:  
      context: .  
      dockerfile: src/frontend/Dockerfile  
    container\_name: inventory\_spa\_container  
    restart: always  
    ports:  
      \- "8080:80"  
    depends\_on:  
      \- api

volumes:  
  postgres\_data:

## **4\. Explicación Exhaustiva de las Mejores Prácticas de Ingeniería de Software**

**Arquitectura de Cebolla & DIP:** Core.Domain es el núcleo puro del sistema y permanece libre de librerías externas o acoplamientos a bases de datos.  
**Inyección de Dependencias y Ciclos de Vida:**

* Scoped: Para DbContext, IProductService, ICategoryService y repositorios (un ciclo de vida por cada solicitud HTTP entrante).  
  * Transient: Para validadores de FluentValidation (instancias ligeras creadas bajo demanda).  
  * Singleton: Para generadores de tokens y cachés inmutables compartidas en el runtime.

**Optimización con** .AsNoTracking()**:** Todas las operaciones de lectura en repositorios omiten el ChangeTracker (Entity Framework Core Team, 2026), reduciendo el consumo de memoria en más del 35%.  
**Manejo Centralizado de Excepciones (RFC 7807):** Ningún controlador utiliza bloques try-catch dispersos; el middleware global captura y traduce excepciones a respuestas estandarizadas application/problem+json (IETF Network Working Group, 2016).

* **Seguridad Defensiva OWASP (OWASP Foundation, 2021):**  
  * DTOs inmutables que previenen ataques de *Mass Assignment*.  
  * Cifrado de contraseñas con hashing criptográfico SHA-256.  
  * Autorización granular basada en roles (\[Authorize(Roles \= "Admin")\]).  
  * Políticas de CORS estrictas que restringen los orígenes permitidos.

**Frontend Responsivo y Accesible:**

* Gestión de estado con Context API (AuthContext, ThemeContext) (React, 2026).  
  * Modo Oscuro/Claro persistente en localStorage con Tailwind CSS.  
  * Protección contra desbordamiento en gráficos estadísticos mediante overflow-x-auto.

**DevOps y Resiliencia:**

* Multi-stage Docker builds que reducen las imágenes de producción a \<120MB (Docker Inc., 2026).  
  * Inicialización autocurable en Program.cs para sincronizar automáticamente el esquema de PostgreSQL.

## **5\. Análisis de Información Crítica en Sistemas de Inventario**

| Dimensión | Atributos de Dominio | Impacto Operacional y Financiero   |
| :---- | :---- | :---- |
| **1\. Identificación Comercial** | Nombre comercial, SKU único, Marca, Código de Barras (EAN-13). | Garantiza trazabilidad unívoca y búsquedas indexadas ultra-rápidas O(1). |
| **2\. Gestión Financiera** | Costo Unitario ($ CostPrice), Precio de Venta ($ Price), Margen Bruto (%). | Permite calcular la valorización total del almacén y el retorno financiero proyectado. |
| **3\. Control y Umbrales de Stock** | Stock Físico Actual, Stock Mínimo de Seguridad (MinStock), Capacidad Máxima (MaxStock). | Dispara alertas de reposición inmediata y previene quiebres de inventario. |
| **4\. Logística y Almacén** | Ubicación Física (Pasillo / Estantería / Nivel), Unidad de Medida (Unidad, Saco, Galón, Tubo). | Optimiza tiempos de despacho físico en bodega y estandariza conversiones de medida. |

## **6\. Guía de Despliegue, Contenerización y CI/CD**

Comandos para la inicialización y prueba del sistema contenerizado en el entorno local (Docker Inc., 2026):

\# 1\. Detener y limpiar contenedores previos  
docker-compose down \-v

\# 2\. Compilar imágenes y levantar la red completa  
docker-compose up \--build \-d

\# 3\. Verificar estado saludable de los contenedores  
docker ps

> * **Frontend SPA (React \+ Indicadores KPI):** [http://localhost:8080](http://localhost:8080)  
> * **Backend REST API (.NET 10):** [http://localhost:5000/api](http://localhost:5000/api)  
> * **Base de Datos Relacional:** localhost:5432 (PostgreSQL)

## **7. Anexo: Código de Boilerplate Completo y Comentado Línea por Línea**

A continuación se presenta el código fuente íntegro del proyecto modelo, organizado estrictamente según los principios de la **Onion Architecture** y las mejores prácticas de la ingeniería de software moderna (.NET 10, EF Core 10, React 18, Tailwind CSS, xUnit, Moq y Docker). Cada archivo se encuentra documentado y comentado línea por línea con fundamentación técnica y justificaciones arquitectónicas orientadas a la asignatura de Desarrollo de Aplicaciones Web de la UNET.

---

### **7.1 Capa Core.Domain**

El núcleo del sistema alberga las entidades de negocio puras, enumeraciones e invariantes, totalmente desacoplado de dependencias externas, frameworks web o motores de base de datos.

#### **`src/backend/Core.Domain/Entities/BaseEntity.cs`**
```csharp
using System; // Importa tipos fundamentales de .NET (Guid, DateTime)

namespace Core.Domain.Entities; // Espacio de nombres de las entidades de dominio

/// <summary>
/// Clase base abstracta que estandariza la identidad única y auditoría temporal.
/// Justificación Pedagógica: Evita la duplicación de código (DRY) y garantiza que todas
/// las tablas relacionales posean una clave primaria inmutable y trazabilidad temporal en UTC.
/// </summary>
public abstract class BaseEntity
{
    /// <summary>
    /// Identificador único universal (UUID v4) autogenerado.
    /// Previene ataques de enumeración secuencial en URLs públicas.
    /// </summary>
    public Guid Id { get; set; } = Guid.NewGuid();

    /// <summary>
    /// Fecha y hora exacta de creación del registro en formato inmutable UTC.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Fecha y hora de la última modificación (nullable si nunca ha sido editado).
    /// </summary>
    public DateTime? UpdatedAt { get; set; }
}
```

#### **`src/backend/Core.Domain/Entities/Product.cs`**
```csharp
using System; // Importa tipos base de C#

namespace Core.Domain.Entities; // Espacio de nombres del Dominio

/// <summary>
/// Entidad de Dominio que modela los artículos en el inventario empresarial de ferretería y construcción.
/// Hereda Id, CreatedAt y UpdatedAt de BaseEntity.
/// </summary>
public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty; // Nombre comercial del producto
    public string SKU { get; set; } = string.Empty; // Código SKU único e inmutable
    public string Description { get; set; } = string.Empty; // Especificaciones técnicas y detalles
    public decimal Price { get; set; } // Precio de venta al público ($ PVP)
    public decimal CostPrice { get; set; } // Costo unitario de adquisición ($ Compra)
    public int Stock { get; set; } // Cantidad física disponible actualmente en bodega
    public int MinStock { get; set; } = 5; // Stock mínimo de seguridad (dispara alerta de reorden)
    public int MaxStock { get; set; } = 100; // Capacidad máxima recomendada en almacén
    public string Location { get; set; } = "Almacén Principal"; // Ubicación física (Pasillo / Estante)
    public string UnitOfMeasure { get; set; } = "Unidad"; // Unidad, Saco, Galón, Tubo, etc.
    public string Brand { get; set; } = string.Empty; // Marca o fabricante comercial
    public bool IsActive { get; set; } = true; // Estado operativo (Activo/Inactivo)
    public Guid CategoryId { get; set; } // Clave foránea hacia la categoría
    public virtual Category? Category { get; set; } // Propiedad de navegación relacional (Lazy/Eager loading)
}
```

#### **`src/backend/Core.Domain/Entities/Category.cs`**
```csharp
using System.Collections.Generic; // Importa colecciones genéricas

namespace Core.Domain.Entities;

/// <summary>
/// Entidad de Dominio para clasificar rubros del catálogo de ferretería.
/// </summary>
public class Category : BaseEntity
{
    public string Name { get; set; } = string.Empty; // Nombre de la categoría (ej. Herramientas Eléctricas)
    public string Description { get; set; } = string.Empty; // Descripción del rubro comercial
    public virtual ICollection<Product> Products { get; set; } = new List<Product>(); // Colección de productos 1:N
}
```

#### **`src/backend/Core.Domain/Entities/User.cs`**
```csharp
using System;
using Core.Domain.Enums; // Enumeraciones de roles de usuario

namespace Core.Domain.Entities;

/// <summary>
/// Representa un usuario dentro del sistema para autenticación y autorización RBAC.
/// </summary>
public class User : BaseEntity
{
    public string Username { get; set; } = string.Empty; // Nombre de usuario único
    public string Email { get; set; } = string.Empty; // Correo electrónico institucional
    public string PasswordHash { get; set; } = string.Empty; // Hash criptográfico de contraseña (SHA-256)
    public UserRole Role { get; set; } = UserRole.Employee; // Rol asignado (Admin / Employee)
}
```

#### **`src/backend/Core.Domain/Enums/UserRole.cs`**
```csharp
namespace Core.Domain.Enums;

/// <summary>
/// Roles de usuario permitidos dentro del sistema de inventario (RBAC).
/// Justificación Pedagógica: Evita el antipatrón 'Primitive Obsession' y asegura tipado fuerte.
/// </summary>
public enum UserRole
{
    Admin = 1,    // Rol Administrador: Acceso total al sistema y mutaciones críticas
    Employee = 2  // Rol Empleado: Consulta y actualización de inventario operativo
}
```

---

### **7.2 Capa Core.Application**

La capa de aplicación define las interfaces de abstracción, los contratos DTO, los validadores desacoplados y los servicios que orquestan los casos de uso.

#### **Interfaces de Persistencia y Casos de Uso (`Interfaces/`)**

* **`IRepository.cs`:**
```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Domain.Entities;

namespace Core.Application.Interfaces;

/// <summary>
/// Contrato genérico para operaciones CRUD básicas sobre entidades que heredan de BaseEntity.
/// </summary>
public interface IRepository<T> where T : BaseEntity
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(Guid id);
    Task AddAsync(T entity);
    void Update(T entity);
    void Delete(T entity);
    Task<bool> SaveChangesAsync();
}
```

* **`IProductRepository.cs`:**
```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Domain.Entities;

namespace Core.Application.Interfaces;

/// <summary>
/// Repositorio especializado para productos con consultas optimizadas Eager Loading.
/// </summary>
public interface IProductRepository : IRepository<Product>
{
    Task<IEnumerable<Product>> GetProductsWithCategoryAsync();
    Task<Product?> GetProductWithCategoryByIdAsync(Guid id);
    Task<bool> ExistsSKUAsync(string sku, Guid? excludeId = null);
}
```

* **`IProductService.cs` y `ICategoryService.cs`:**
```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Application.DTOs;

namespace Core.Application.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllProductsAsync();
    Task<ProductDto?> GetProductByIdAsync(Guid id);
    Task<ProductDto> CreateProductAsync(CreateProductDto dto);
    Task<bool> UpdateProductAsync(Guid id, CreateProductDto dto);
    Task<bool> DeleteProductAsync(Guid id);
}

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
    Task<CategoryDto?> GetCategoryByIdAsync(Guid id);
    Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto);
    Task<bool> UpdateCategoryAsync(Guid id, CreateCategoryDto dto);
    Task<bool> DeleteCategoryAsync(Guid id);
}

public interface IUserService
{
    Task<AuthResponseDto?> AuthenticateAsync(LoginDto dto);
}

public interface ITokenService
{
    string GenerateJwtToken(string username, string role);
}
```

#### **Objetos de Transferencia de Datos (`DTOs/`)**

* **`ProductDto.cs` y `CreateProductDto.cs`:**
```csharp
using System;

namespace Core.Application.DTOs;

public class ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal CostPrice { get; set; }
    public int Stock { get; set; }
    public int MinStock { get; set; }
    public int MaxStock { get; set; }
    public string Location { get; set; } = string.Empty;
    public string UnitOfMeasure { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal CostPrice { get; set; }
    public int Stock { get; set; }
    public int MinStock { get; set; } = 5;
    public int MaxStock { get; set; } = 100;
    public string Location { get; set; } = "Almacén Principal";
    public string UnitOfMeasure { get; set; } = "Unidad";
    public string Brand { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public Guid CategoryId { get; set; }
}
```

* **`CategoryDto.cs` y `CreateCategoryDto.cs`:**
```csharp
using System;

namespace Core.Application.DTOs;

public class CategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int ProductsCount { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateCategoryDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
```

* **`LoginDto.cs` y `AuthResponseDto.cs`:**
```csharp
namespace Core.Application.DTOs;

public class LoginDto
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
```

#### **Validadores Desacoplados (`Validations/`)**

* **`CreateProductValidator.cs`:**
```csharp
using FluentValidation;
using Core.Application.DTOs;

namespace Core.Application.Validations;

/// <summary>
/// Reglas de validación desacopladas para el DTO de creación/edición de productos.
/// </summary>
public class CreateProductValidator : AbstractValidator<CreateProductDto>
{
    public CreateProductValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty().WithMessage("El nombre del producto es obligatorio.")
            .MaximumLength(150).WithMessage("El nombre no puede exceder los 150 caracteres.");

        RuleFor(p => p.SKU)
            .NotEmpty().WithMessage("El código SKU es obligatorio.")
            .MaximumLength(20).WithMessage("El SKU no puede exceder los 20 caracteres.");

        RuleFor(p => p.Price)
            .GreaterThan(0).WithMessage("El precio de venta debe ser mayor a cero.");

        RuleFor(p => p.CostPrice)
            .GreaterThanOrEqualTo(0).WithMessage("El costo de adquisición no puede ser negativo.");

        RuleFor(p => p.Stock)
            .GreaterThanOrEqualTo(0).WithMessage("El stock físico no puede ser negativo.");

        RuleFor(p => p.MinStock)
            .GreaterThanOrEqualTo(0).WithMessage("El stock mínimo no puede ser negativo.");

        RuleFor(p => p.MaxStock)
            .GreaterThan(p => p.MinStock).WithMessage("El stock máximo debe ser mayor al stock mínimo.");

        RuleFor(p => p.CategoryId)
            .NotEmpty().WithMessage("Debe seleccionar una categoría válida.");
    }
}
```

* **`CreateCategoryValidator.cs`:**
```csharp
using FluentValidation;
using Core.Application.DTOs;

namespace Core.Application.Validations;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryDto>
{
    public CreateCategoryValidator()
    {
        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("El nombre de la categoría es obligatorio.")
            .MaximumLength(100).WithMessage("El nombre no puede exceder los 100 caracteres.");

        RuleFor(c => c.Description)
            .MaximumLength(300).WithMessage("La descripción no puede exceder los 300 caracteres.");
    }
}
```

#### **Servicios de Aplicación (`Services/`)**

* **`ProductService.cs`:**
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Application.DTOs;
using Core.Application.Interfaces;
using Core.Domain.Entities;

namespace Core.Application.Services;

/// <summary>
/// Orquesta la lógica de negocio y mapeo entre DTOs y entidades de producto.
/// </summary>
public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IRepository<Category> _categoryRepository;

    public ProductService(
        IProductRepository productRepository, 
        IRepository<Category> categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        var products = await _productRepository.GetProductsWithCategoryAsync();
        return products.Select(MapToDto);
    }

    public async Task<ProductDto?> GetProductByIdAsync(Guid id)
    {
        var product = await _productRepository.GetProductWithCategoryByIdAsync(id);
        return product == null ? null : MapToDto(product);
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
        if (category == null)
            throw new KeyNotFoundException($"La categoría con ID '{dto.CategoryId}' no existe.");

        if (await _productRepository.ExistsSKUAsync(dto.SKU))
            throw new InvalidOperationException($"El código SKU '{dto.SKU}' ya se encuentra registrado.");

        var product = new Product
        {
            Name = dto.Name.Trim(),
            SKU = dto.SKU.Trim().ToUpperInvariant(),
            Description = dto.Description?.Trim() ?? string.Empty,
            Price = dto.Price,
            CostPrice = dto.CostPrice,
            Stock = dto.Stock,
            MinStock = dto.MinStock,
            MaxStock = dto.MaxStock,
            Location = string.IsNullOrWhiteSpace(dto.Location) ? "Almacén Principal" : dto.Location.Trim(),
            UnitOfMeasure = string.IsNullOrWhiteSpace(dto.UnitOfMeasure) ? "Unidad" : dto.UnitOfMeasure.Trim(),
            Brand = dto.Brand?.Trim() ?? string.Empty,
            IsActive = dto.IsActive,
            CategoryId = dto.CategoryId
        };

        await _productRepository.AddAsync(product);
        await _productRepository.SaveChangesAsync();

        product.Category = category;
        return MapToDto(product);
    }

    public async Task<bool> UpdateProductAsync(Guid id, CreateProductDto dto)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null) return false;

        var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
        if (category == null)
            throw new KeyNotFoundException($"La categoría con ID '{dto.CategoryId}' no existe.");

        if (await _productRepository.ExistsSKUAsync(dto.SKU, id))
            throw new InvalidOperationException($"El código SKU '{dto.SKU}' ya se encuentra registrado por otro producto.");

        product.Name = dto.Name.Trim();
        product.SKU = dto.SKU.Trim().ToUpperInvariant();
        product.Description = dto.Description?.Trim() ?? string.Empty;
        product.Price = dto.Price;
        product.CostPrice = dto.CostPrice;
        product.Stock = dto.Stock;
        product.MinStock = dto.MinStock;
        product.MaxStock = dto.MaxStock;
        product.Location = string.IsNullOrWhiteSpace(dto.Location) ? "Almacén Principal" : dto.Location.Trim();
        product.UnitOfMeasure = string.IsNullOrWhiteSpace(dto.UnitOfMeasure) ? "Unidad" : dto.UnitOfMeasure.Trim();
        product.Brand = dto.Brand?.Trim() ?? string.Empty;
        product.IsActive = dto.IsActive;
        product.CategoryId = dto.CategoryId;
        product.UpdatedAt = DateTime.UtcNow;

        _productRepository.Update(product);
        return await _productRepository.SaveChangesAsync();
    }

    public async Task<bool> DeleteProductAsync(Guid id)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null) return false;

        _productRepository.Delete(product);
        return await _productRepository.SaveChangesAsync();
    }

    private static ProductDto MapToDto(Product p) => new()
    {
        Id = p.Id,
        Name = p.Name,
        SKU = p.SKU,
        Description = p.Description,
        Price = p.Price,
        CostPrice = p.CostPrice,
        Stock = p.Stock,
        MinStock = p.MinStock,
        MaxStock = p.MaxStock,
        Location = p.Location,
        UnitOfMeasure = p.UnitOfMeasure,
        Brand = p.Brand,
        IsActive = p.IsActive,
        CategoryId = p.CategoryId,
        CategoryName = p.Category?.Name ?? "Sin Categoría",
        CreatedAt = p.CreatedAt
    };
}
```

* **`CategoryService.cs`:**
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Application.DTOs;
using Core.Application.Interfaces;
using Core.Domain.Entities;

namespace Core.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly IRepository<Category> _categoryRepository;
    private readonly IProductRepository _productRepository;

    public CategoryService(
        IRepository<Category> categoryRepository,
        IProductRepository productRepository)
    {
        _categoryRepository = categoryRepository;
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        var products = await _productRepository.GetAllAsync();

        return categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            Description = c.Description,
            ProductsCount = products.Count(p => p.CategoryId == c.Id),
            CreatedAt = c.CreatedAt
        });
    }

    public async Task<CategoryDto?> GetCategoryByIdAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null) return null;

        var products = await _productRepository.GetAllAsync();

        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            ProductsCount = products.Count(p => p.CategoryId == category.Id),
            CreatedAt = category.CreatedAt
        };
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
    {
        var category = new Category
        {
            Name = dto.Name.Trim(),
            Description = dto.Description.Trim()
        };

        await _categoryRepository.AddAsync(category);
        await _categoryRepository.SaveChangesAsync();

        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            ProductsCount = 0,
            CreatedAt = category.CreatedAt
        };
    }

    public async Task<bool> UpdateCategoryAsync(Guid id, CreateCategoryDto dto)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null) return false;

        category.Name = dto.Name.Trim();
        category.Description = dto.Description.Trim();
        category.UpdatedAt = DateTime.UtcNow;

        _categoryRepository.Update(category);
        return await _categoryRepository.SaveChangesAsync();
    }

    public async Task<bool> DeleteCategoryAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null) return false;

        var products = await _productRepository.GetAllAsync();
        if (products.Any(p => p.CategoryId == id))
        {
            throw new InvalidOperationException("No se puede eliminar una categoría que contiene productos asociados.");
        }

        _categoryRepository.Delete(category);
        return await _categoryRepository.SaveChangesAsync();
    }
}
```

* **`UserService.cs`:**
```csharp
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Core.Application.DTOs;
using Core.Application.Interfaces;
using Core.Domain.Entities;

namespace Core.Application.Services;

public class UserService : IUserService
{
    private readonly IRepository<User> _userRepository;
    private readonly ITokenService _tokenService;

    public UserService(IRepository<User> userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto?> AuthenticateAsync(LoginDto dto)
    {
        var users = await _userRepository.GetAllAsync();
        var user = users.FirstOrDefault(u => u.Username.Equals(dto.Username, StringComparison.OrdinalIgnoreCase));

        if (user == null) return null;

        var computedHash = HashPassword(dto.Password);
        if (user.PasswordHash != computedHash) return null;

        var token = _tokenService.GenerateJwtToken(user.Username, user.Role.ToString());

        return new AuthResponseDto
        {
            Token = token,
            Username = user.Username,
            Role = user.Role.ToString()
        };
    }

    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }
}
```

---

### **7.3 Capa Infrastructure**

La capa de infraestructura implementa la persistencia física en PostgreSQL mediante EF Core 10, mapeo explícito con Fluent API y registro de dependencias.

#### **`src/backend/Infrastructure/Persistence/ApplicationDbContext.cs`**
```csharp
using Microsoft.EntityFrameworkCore;
using Core.Domain.Entities;
using Core.Domain.Enums;
using System;

namespace Infrastructure.Persistence;

/// <summary>
/// Contexto relacional de EF Core 10 con siembra de datos de ferretería y construcción.
/// </summary>
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Escanea y aplica automáticamente todas las configuraciones IEntityTypeConfiguration
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        // UUIDs Fijos para Categorías de Ferretería
        var catHerramientasElectricas = Guid.Parse("10000000-0000-0000-0000-000000000001");
        var catHerramientasManuales    = Guid.Parse("10000000-0000-0000-0000-000000000002");
        var catMaterialesConstruccion = Guid.Parse("10000000-0000-0000-0000-000000000003");
        var catPinturasAcabados       = Guid.Parse("10000000-0000-0000-0000-000000000004");
        var catPlomeriaTuberias        = Guid.Parse("10000000-0000-0000-0000-000000000005");
        var catElectricidadIlum       = Guid.Parse("10000000-0000-0000-0000-000000000006");
        var catSeguridadIndustrial    = Guid.Parse("10000000-0000-0000-0000-000000000007");
        var catFijacionesTornillos    = Guid.Parse("10000000-0000-0000-0000-000000000008");

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = catHerramientasElectricas, Name = "Herramientas Eléctricas y Maquinaria", Description = "Taladros, esmeriladoras, rotomartillos y sierras" },
            new Category { Id = catHerramientasManuales, Name = "Herramientas Manuales", Description = "Martillos, llaves combinadas, alicates y destornilladores" },
            new Category { Id = catMaterialesConstruccion, Name = "Materiales de Construcción y Albañilería", Description = "Cemento, bloques, arena, cabillas y morteros" },
            new Category { Id = catPinturasAcabados, Name = "Pinturas, Acabados y Adhesivos", Description = "Pinturas látex, esmaltes sintéticos, selladores y brochas" },
            new Category { Id = catPlomeriaTuberias, Name = "Plomería, Grifería y Tuberías", Description = "Tubos PVC/CPVC, llaves de paso y grifos" },
            new Category { Id = catElectricidadIlum, Name = "Electricidad e Iluminación", Description = "Cables THW, breakers, reflectores LED e interruptores" },
            new Category { Id = catSeguridadIndustrial, Name = "Seguridad Industrial y EPP", Description = "Cascos, botas, guantes de carnaza y lentes de seguridad" },
            new Category { Id = catFijacionesTornillos, Name = "Tornillería, Pernos y Anclajes", Description = "Tornillos drywall, pernos hexagonales y ramplugs" }
        );

        // Siembra de Productos de Ferretería
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                Name = "Taladro Percutor DeWalt 1/2'' 800W VVR",
                SKU = "TAL-DEW-800W",
                Description = "Taladro de impacto profesional para concreto, madera y metal.",
                Price = 89.50m,
                CostPrice = 62.00m,
                Stock = 22,
                MinStock = 6,
                MaxStock = 45,
                Location = "Pasillo 1 - Estante A1",
                UnitOfMeasure = "Unidad",
                Brand = "DeWalt",
                IsActive = true,
                CategoryId = catHerramientasElectricas
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000007"),
                Name = "Cemento Portland Tipo I Saco 42.5 Kg",
                SKU = "CEM-PORT-42KG",
                Description = "Cemento estructural de alta resistencia para mampostería.",
                Price = 9.80m,
                CostPrice = 7.40m,
                Stock = 150,
                MinStock = 40,
                MaxStock = 400,
                Location = "Patio de Carga - Bahía 1",
                UnitOfMeasure = "Saco",
                Brand = "Vencemos",
                IsActive = true,
                CategoryId = catMaterialesConstruccion
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000009"),
                Name = "Pego Gris para Cerámica Saco 20 Kg",
                SKU = "PEG-CER-20KG",
                Description = "Mortero adhesivo base cemento para instalación de pisos.",
                Price = 5.50m,
                CostPrice = 3.60m,
                Stock = 0, // Stock Agotado para probar alertas
                MinStock = 20,
                MaxStock = 150,
                Location = "Patio de Carga - Bahía 2",
                UnitOfMeasure = "Saco",
                Brand = "Pegomax",
                IsActive = true,
                CategoryId = catMaterialesConstruccion
            }
        );

        // Siembra de Usuarios
        modelBuilder.Entity<User>().HasData(
            new User { Id = Guid.Parse("44444444-4444-4444-4444-444444444444"), Username = "admin", Email = "admin@unet.edu.ve", PasswordHash = "JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=", Role = UserRole.Admin },
            new User { Id = Guid.Parse("55555555-5555-5555-5555-555555555555"), Username = "empleado", Email = "empleado@unet.edu.ve", PasswordHash = "zME+irCBnjq2FxneQHHsrmwdPNNdxIuRytNIHyCSL58=", Role = UserRole.Employee }
        );
    }
}
```

#### **`src/backend/Infrastructure/Persistence/Configurations/ProductConfiguration.cs`**
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Core.Domain.Entities;

namespace Infrastructure.Persistence.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name).IsRequired().HasMaxLength(150);
        builder.Property(p => p.SKU).IsRequired().HasMaxLength(20);
        builder.HasIndex(p => p.SKU).IsUnique(); // Índice único B-Tree

        builder.Property(p => p.Description).HasMaxLength(500);
        builder.Property(p => p.Price).IsRequired().HasPrecision(18, 2);
        builder.Property(p => p.CostPrice).IsRequired().HasPrecision(18, 2);

        builder.Property(p => p.Stock).IsRequired();
        builder.Property(p => p.MinStock).IsRequired().HasDefaultValue(5);
        builder.Property(p => p.MaxStock).IsRequired().HasDefaultValue(100);

        builder.Property(p => p.Location).HasMaxLength(100).HasDefaultValue("Almacén Principal");
        builder.Property(p => p.UnitOfMeasure).HasMaxLength(30).HasDefaultValue("Unidad");
        builder.Property(p => p.Brand).HasMaxLength(80);
        builder.Property(p => p.IsActive).IsRequired().HasDefaultValue(true);

        builder.HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
```

#### **`src/backend/Infrastructure/Persistence/Repositories/Repository.cs`**
```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Application.Interfaces;
using Core.Domain.Entities;

namespace Infrastructure.Persistence.Repositories;

/// <summary>
/// Implementación genérica del patrón repositorio utilizando .AsNoTracking() para optimizar lectura.
/// </summary>
public class Repository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAllAsync() =>
        await _dbSet.AsNoTracking().ToListAsync();

    public async Task<T?> GetByIdAsync(Guid id) =>
        await _dbSet.FindAsync(id);

    public async Task AddAsync(T entity) =>
        await _dbSet.AddAsync(entity);

    public void Update(T entity) =>
        _dbSet.Update(entity);

    public void Delete(T entity) =>
        _dbSet.Remove(entity);

    public async Task<bool> SaveChangesAsync() =>
        await _context.SaveChangesAsync() > 0;
}
```

#### **`src/backend/Infrastructure/Persistence/Repositories/ProductRepository.cs`**
```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Application.Interfaces;
using Core.Domain.Entities;

namespace Infrastructure.Persistence.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IEnumerable<Product>> GetProductsWithCategoryAsync() =>
        await _dbSet.AsNoTracking().Include(p => p.Category).ToListAsync();

    public async Task<Product?> GetProductWithCategoryByIdAsync(Guid id) =>
        await _dbSet.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);

    public async Task<bool> ExistsSKUAsync(string sku, Guid? excludeId = null) =>
        await _dbSet.AnyAsync(p => p.SKU == sku && (!excludeId.HasValue || p.Id != excludeId.Value));
}
```

#### **`src/backend/Infrastructure/DependencyInjection.cs`**
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Core.Application.Interfaces;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Repositories;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped<IProductRepository, ProductRepository>();

        return services;
    }
}
```

---

### **7.4 Capa Presentation.API**

La capa de presentación expone los controladores RESTful, administra el pipeline HTTP con middleware global y configura la inyección de dependencias y seguridad JWT.

#### **`src/backend/Presentation.API/Program.cs`**
```csharp
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FluentValidation;
using Core.Application.Interfaces;
using Core.Application.Services;
using Core.Application.Validations;
using Infrastructure;
using Infrastructure.Persistence;
using Presentation.API.Middleware;
using Presentation.API.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. REGISTRO DE SERVICIOS EN EL CONTENEDOR IoC
builder.Services.AddControllers();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddValidatorsFromAssemblyContaining<CreateProductValidator>();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["Key"] ?? throw new InvalidOperationException("Clave JWT no configurada.");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// 2. PIPELINE DE MIDDLEWARES HTTP
app.UseMiddleware<ExceptionMiddleware>(); // Captura global de excepciones (RFC 7807)
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// 3. INICIALIZACIÓN Y AUTO-CURACIÓN INTELIGENTE DE LA BASE DE DATOS
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        bool requiresRecreation = false;
        try
        {
            var testProduct = context.Products.FirstOrDefault();
            if (testProduct == null) requiresRecreation = true;
        }
        catch
        {
            requiresRecreation = true; // Columna inexistente -> Recreación limpia
        }

        if (requiresRecreation)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
        }
        else
        {
            context.Database.EnsureCreated();
        }

        var adminUser = context.Users.FirstOrDefault(u => u.Username == "admin");
        if (adminUser != null)
        {
            adminUser.PasswordHash = "JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=";
            context.Users.Update(adminUser);
        }
        var empUser = context.Users.FirstOrDefault(u => u.Username == "empleado");
        if (empUser != null)
        {
            empUser.PasswordHash = "zME+irCBnjq2FxneQHHsrmwdPNNdxIuRytNIHyCSL58=";
            context.Users.Update(empUser);
        }
        context.SaveChanges();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Error durante la inicialización de la base de datos.");
    }
}

app.Run();
```

#### **`src/backend/Presentation.API/Controllers/ProductsController.cs`**
```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.Application.DTOs;
using Core.Application.Interfaces;

namespace Presentation.API.Controllers;

[Authorize] // Requiere token JWT válido
public class ProductsController : ApiControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
    {
        var products = await _productService.GetAllProductsAsync();
        return Ok(products);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetById(Guid id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null)
            return NotFound(new { message = $"El producto con ID {id} no existe." });
        return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto dto)
    {
        var product = await _productService.CreateProductAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateProductDto dto)
    {
        var updated = await _productService.UpdateProductAsync(id, dto);
        if (!updated)
            return NotFound(new { message = $"El producto con ID {id} no fue encontrado." });
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")] // Restricción RBAC solo para Administrador
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _productService.DeleteProductAsync(id);
        if (!deleted)
            return NotFound(new { message = $"El producto con ID {id} no fue encontrado." });
        return NoContent();
    }
}
```

#### **`src/backend/Presentation.API/Controllers/CategoriesController.cs`**
```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.Application.DTOs;
using Core.Application.Interfaces;

namespace Presentation.API.Controllers;

[Authorize]
public class CategoriesController : ApiControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();
        return Ok(categories);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CategoryDto>> GetById(Guid id)
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);
        if (category == null)
            return NotFound(new { message = $"La categoría con ID {id} no existe." });
        return Ok(category);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CategoryDto>> Create([FromBody] CreateCategoryDto dto)
    {
        var category = await _categoryService.CreateCategoryAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateCategoryDto dto)
    {
        var updated = await _categoryService.UpdateCategoryAsync(id, dto);
        if (!updated)
            return NotFound(new { message = $"La categoría con ID {id} no fue encontrada." });
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _categoryService.DeleteCategoryAsync(id);
        if (!deleted)
            return NotFound(new { message = $"La categoría con ID {id} no fue encontrada." });
        return NoContent();
    }
}
```

#### **`src/backend/Presentation.API/Controllers/AuthController.cs`**
```csharp
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.Application.DTOs;
using Core.Application.Interfaces;

namespace Presentation.API.Controllers;

[AllowAnonymous]
public class AuthController : ApiControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
    {
        var response = await _userService.AuthenticateAsync(dto);
        if (response == null)
            return Unauthorized(new { message = "Credenciales inválidas. Verifique su usuario y contraseña." });

        return Ok(response);
    }
}
```

#### **`src/backend/Presentation.API/Services/TokenService.cs`**
```csharp
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Core.Application.Interfaces;

namespace Presentation.API.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateJwtToken(string username, string role)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role)
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

---

### **7.5 Capa Frontend React**

SPA desarrollada con React 18, Vite y Tailwind CSS, incorporando la paleta institucional UNET (`#003366`), modo oscuro/claro persistente y el **Dashboard de Indicadores KPI**.

#### **`src/frontend/src/components/PowerBIDashboard.jsx` (Dashboard de Indicadores KPI)**
```jsx
import React, { useState } from 'react';
import { DollarSign, Package, Truck } from 'lucide-react';

export const PowerBIDashboard = ({ products = [], categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter(p => (p.categoryName || 'Sin Categoría') === selectedCategory || p.categoryId === selectedCategory);

  const totalCost = filteredProducts.reduce((acc, p) => acc + ((Number(p.costPrice) || Number(p.price) * 0.7) * (Number(p.stock) || 0)), 0);
  const totalValuation = filteredProducts.reduce((acc, p) => acc + ((Number(p.price) || 0) * (Number(p.stock) || 0)), 0);
  const totalUnits = filteredProducts.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
  const totalMinStock = filteredProducts.reduce((acc, p) => acc + (Number(p.minStock) || 5), 0);
  const totalMaxStock = filteredProducts.reduce((acc, p) => acc + (Number(p.maxStock) || 100), 0);

  const unitsToReorder = filteredProducts.reduce((acc, p) => {
    const stock = Number(p.stock) || 0;
    const min = Number(p.minStock) || 5;
    return stock < min ? acc + (min - stock) : acc;
  }, 0);

  const safetyStockSurplus = Math.max(0, totalUnits - totalMinStock);
  const optimalProductsCount = filteredProducts.filter(p => (Number(p.stock) || 0) >= (Number(p.minStock) || 5)).length;
  const criticalProductsCount = filteredProducts.filter(p => (Number(p.stock) || 0) < (Number(p.minStock) || 5)).length;
  const healthPercentage = filteredProducts.length > 0 ? Math.round((optimalProductsCount / filteredProducts.length) * 100) : 0;

  const categoryData = filteredProducts.reduce((acc, p) => {
    const name = p.categoryName || 'Sin Categoría';
    if (!acc[name]) acc[name] = { name, cost: 0, valuation: 0, stock: 0, minStock: 0, count: 0 };
    const stock = Number(p.stock) || 0;
    const price = Number(p.price) || 0;
    const cost = Number(p.costPrice) || price * 0.7;
    acc[name].cost += cost * stock;
    acc[name].valuation += price * stock;
    acc[name].stock += stock;
    acc[name].minStock += Number(p.minStock) || 5;
    acc[name].count += 1;
    return acc;
  }, {});

  const categoryList = Object.values(categoryData);
  const maxCategoryCost = Math.max(...categoryList.map(c => c.cost), 1);
  const maxCategoryStock = Math.max(...categoryList.map(c => c.stock), 1);

  const formatCurrency = (val) => '$' + Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const getShortLabel = (str, maxChars = 11) => str && str.length > maxChars ? str.slice(0, maxChars) + '…' : str;

  return (
    <div className="bg-slate-100 dark:bg-slate-900/90 p-3 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 transition-colors duration-300 overflow-hidden">
      {/* Header Analítico */}
      <div className="bg-gradient-to-r from-unet-900 via-unet-800 to-sky-700 text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
            <Truck className="h-7 w-7 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">INVENTARIO</h2>
              <span className="bg-cyan-400 text-unet-950 text-xs font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">Dashboard de Indicadores KPI</span>
            </div>
            <p className="text-xs text-cyan-100 font-medium mt-0.5">Sistema de Analítica & Control de Almacén UNET</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 flex items-center space-x-2">
            <span className="text-xs text-cyan-200 font-semibold shrink-0">Categoría:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer [&>option]:text-slate-800"
            >
              <option value="ALL">Todas las Categorías ({products.length} productos)</option>
              {categories.map(c => <option key={c.id || c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tarjetas Superiores de KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-800 shrink-0"><DollarSign className="h-6 w-6" /></div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider truncate">Costo Total Inventario</p>
            <h3 className="text-xl font-black text-slate-800 dark:text-white truncate">{formatCurrency(totalCost)}</h3>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">PVP: {formatCurrency(totalValuation)}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-2xl border border-cyan-100 dark:border-cyan-800 shrink-0"><Package className="h-6 w-6" /></div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider truncate">Stock Disponible</p>
            <h3 className="text-xl font-black text-slate-800 dark:text-white">{totalUnits.toLocaleString()} <span className="text-xs font-normal text-slate-400">unid</span></h3>
            <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">{filteredProducts.length} referencias activas</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rotación (Días)</p>
          <span className="text-base font-black text-purple-700 dark:text-purple-400 mt-2">9.66</span>
          <span className="text-[9px] text-slate-400 mt-1">Ciclo óptimo</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Salud de Existencias</p>
          <span className="text-base font-black text-unet-700 dark:text-unet-400 mt-2">{healthPercentage}%</span>
          <span className="text-[9px] text-slate-400 mt-1">{optimalProductsCount} refs normales</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ocupación Almacén</p>
          <span className="text-base font-black text-amber-600 dark:text-amber-400 mt-2">{totalMaxStock > 0 ? Math.round((totalUnits / totalMaxStock) * 100) : 0}%</span>
          <span className="text-[9px] text-slate-400 mt-1">{totalUnits} de {totalMaxStock} max</span>
        </div>
      </div>

      {/* Gráficos con Protección contra Desbordamiento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between overflow-hidden">
          <div className="overflow-x-auto pb-2">
            <div className="h-44 flex items-end justify-between gap-2 pt-6 min-w-[320px]">
              {categoryList.map((cat) => {
                const heightPercent = maxCategoryCost > 0 ? Math.max((cat.cost / maxCategoryCost) * 100, 10) : 10;
                return (
                  <div key={cat.name} className="flex-1 min-w-[38px] flex flex-col items-center h-full justify-end group">
                    <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 mb-1 opacity-0 group-hover:opacity-100">${(cat.cost / 1000).toFixed(1)}k</span>
                    <div className="w-full max-w-[28px] bg-gradient-to-t from-unet-800 to-cyan-500 rounded-t-md shadow-sm" style={{ height: `${heightPercent}%` }} title={`${cat.name}: ${formatCurrency(cat.cost)}`}></div>
                    <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 truncate w-full text-center mt-2 px-0.5" title={cat.name}>{getShortLabel(cat.name, 7)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-1 border-t border-slate-100 dark:border-slate-700 pt-2">Inversión ponderada en adquisición por rubro</p>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto pb-2">
            <div className="h-44 flex items-end justify-between gap-2.5 pt-4 min-w-[480px]">
              {categoryList.map((cat) => {
                const isHealthy = cat.stock >= cat.minStock;
                const barHeight = maxCategoryStock > 0 ? Math.max((cat.stock / maxCategoryStock) * 100, 12) : 12;
                const thresholdHeight = maxCategoryStock > 0 ? Math.min((cat.minStock / maxCategoryStock) * 100, 92) : 30;
                return (
                  <div key={cat.name} className="flex-1 min-w-[50px] flex flex-col items-center h-full justify-end relative group">
                    <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 mb-1">{cat.stock}</span>
                    <div className={`w-full max-w-[34px] rounded-t-lg shadow-sm ${isHealthy ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : 'bg-gradient-to-t from-rose-600 to-amber-500'}`} style={{ height: `${barHeight}%` }} title={`${cat.name}: Stock ${cat.stock} / Mínimo: ${cat.minStock}`}></div>
                    <div className="absolute w-full max-w-[42px] border-t-2 border-dashed border-slate-800 dark:border-white pointer-events-none" style={{ bottom: `${thresholdHeight}%` }}></div>
                    <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 truncate w-full text-center mt-2 px-0.5" title={cat.name}>{getShortLabel(cat.name, 10)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-1 border-t border-slate-100 dark:border-slate-700 pt-2">Línea punteada indica el umbral mínimo de seguridad</p>
        </div>
      </div>
    </div>
  );
};
```

---

### **7.6 Pruebas Unitarias Automatizadas (xUnit & Moq)**

Las pruebas unitarias verifican la lógica del negocio aislando completamente la capa de persistencia mediante simulación de repositorios con Moq.

#### **`tests/UnitTests/Services/ProductServiceTests.cs`**
```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Application.DTOs;
using Core.Application.Interfaces;
using Core.Application.Services;
using Core.Domain.Entities;
using Moq;
using Xunit;

namespace UnitTests.Services;

public class ProductServiceTests
{
    private readonly Mock<IProductRepository> _mockProductRepo;
    private readonly Mock<IRepository<Category>> _mockCategoryRepo;
    private readonly ProductService _service;

    public ProductServiceTests()
    {
        _mockProductRepo = new Mock<IProductRepository>();
        _mockCategoryRepo = new Mock<IRepository<Category>>();
        _service = new ProductService(_mockProductRepo.Object, _mockCategoryRepo.Object);
    }

    [Fact]
    public async Task CreateProductAsync_WhenCategoryNotFound_ThrowsKeyNotFoundException()
    {
        // Arrange
        var createDto = new CreateProductDto
        {
            Name = "Taladro Percutor",
            SKU = "TAL-001",
            Price = 50.0m,
            CostPrice = 30.0m,
            Stock = 10,
            CategoryId = Guid.NewGuid()
        };

        _mockCategoryRepo.Setup(r => r.GetByIdAsync(createDto.CategoryId))
            .ReturnsAsync((Category?)null);

        // Act & Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _service.CreateProductAsync(createDto));
    }

    [Fact]
    public async Task CreateProductAsync_WhenSKUAlreadyExists_ThrowsInvalidOperationException()
    {
        // Arrange
        var categoryId = Guid.NewGuid();
        var createDto = new CreateProductDto
        {
            Name = "Taladro Percutor",
            SKU = "TAL-001",
            Price = 50.0m,
            CostPrice = 30.0m,
            Stock = 10,
            CategoryId = categoryId
        };

        _mockCategoryRepo.Setup(r => r.GetByIdAsync(categoryId))
            .ReturnsAsync(new Category { Id = categoryId, Name = "Herramientas" });

        _mockProductRepo.Setup(r => r.ExistsSKUAsync("TAL-001", null))
            .ReturnsAsync(true);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => _service.CreateProductAsync(createDto));
    }

    [Fact]
    public async Task DeleteProductAsync_WhenProductExists_ReturnsTrue()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = new Product { Id = productId, Name = "Martillo", SKU = "MAR-001" };

        _mockProductRepo.Setup(r => r.GetByIdAsync(productId))
            .ReturnsAsync(product);
        _mockProductRepo.Setup(r => r.SaveChangesAsync())
            .ReturnsAsync(true);

        // Act
        var result = await _service.DeleteProductAsync(productId);

        // Assert
        Assert.True(result);
        _mockProductRepo.Verify(r => r.Delete(product), Times.Once);
        _mockProductRepo.Verify(r => r.SaveChangesAsync(), Times.Once);
    }
}
```

---

### **7.7 Contenerización (Dockerfiles & docker-compose.yml)**

#### **`src/backend/Presentation.API/Dockerfile`**
```dockerfile
# Stage 1: Build y Restauración con SDK .NET 10
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copia selectiva de csproj para aprovechar caché de Docker
COPY src/backend/Core.Domain/Core.Domain.csproj src/backend/Core.Domain/
COPY src/backend/Core.Application/Core.Application.csproj src/backend/Core.Application/
COPY src/backend/Infrastructure/Infrastructure.csproj src/backend/Infrastructure/
COPY src/backend/Presentation.API/Presentation.API.csproj src/backend/Presentation.API/

RUN dotnet restore src/backend/Presentation.API/Presentation.API.csproj

# Copia de código fuente y publicación binaria
COPY src/backend/ src/backend/
RUN dotnet publish src/backend/Presentation.API/Presentation.API.csproj -c Release -o out

# Stage 2: Runtime Ultraligero ASP.NET Core 10
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 5000
ENTRYPOINT ["dotnet", "Presentation.API.dll"]
```

#### **`src/frontend/Dockerfile`**
```dockerfile
# Stage 1: Compilación de la SPA con Node.js 20 Alpine
FROM node:20-alpine AS build
WORKDIR /app
COPY src/frontend/package*.json ./
RUN npm install
COPY src/frontend/ ./
RUN npm run build

# Stage 2: Servidor Web Nginx Alpine de Alto Rendimiento
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY src/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### **`docker-compose.yml`**
```yaml
version: '3.8'

services:
  # Base de Datos Relacional PostgreSQL 15
  db:
    image: postgres:15-alpine
    container_name: inventory_db_container
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
      POSTGRES_DB: inventory_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d inventory_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Backend RESTful API en ASP.NET Core 10
  api:
    build:
      context: .
      dockerfile: src/backend/Presentation.API/Dockerfile
    container_name: inventory_api_container
    restart: always
    ports:
      - "5000:5000"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:5000
      - ConnectionStrings__DefaultConnection=Host=db;Port=5432;Database=inventory_db;Username=postgres;Password=postgrespassword
      - JwtSettings__Key=UNET_DESARROLLO_DE_APLICACIONES_WEB_SECRET_KEY_2026_JWT_SUPER_SECURE!
      - JwtSettings__Issuer=UNET_Inventory_API
      - JwtSettings__Audience=UNET_Inventory_Clients
    depends_on:
      db:
        condition: service_healthy

  # Frontend React SPA servido por Nginx
  spa:
    build:
      context: .
      dockerfile: src/frontend/Dockerfile
    container_name: inventory_spa_container
    restart: always
    ports:
      - "8080:80"
    depends_on:
      - api

volumes:
  postgres_data:
```

## **8\. Actividades Pedagógicas Complementarias**

> * **Semana 1:** Simulación de caídas del servidor y verificación de respuestas RFC 7807 mediante cURL y Postman.  
> * **Semana 2:** Laboratorio de perfilado de memoria RAM comparando consultas LINQ con y sin .AsNoTracking().  
> * **Semana 3:** Taller de Ethical Hacking defensivo: detección de manipulaciones de Payload en JWT.io y mitigación de ataques *Mass Assignment*.  
> * **Semana 4:** Taller práctico de UI/UX reactiva: desarrollo de Custom Hooks para cálculo de rotación de existencias y márgenes brutos.  
> * **Semana 5:** Auditoría automatizada de CI/CD ejecutando pruebas de integración en runners virtuales de GitHub Actions.

## **9\. Propuestas de Proyectos Finales para Estudiantes**

### **Propuesta A: MediStock ERP (Gestión Farmacéutica y Hospitalaria)**

**Descripción:** Sistema para el control de inventario clínico con trazabilidad de medicamentos, lotes y fechas de caducidad.  
**Entidades:** Medication, Batch, Prescription, PrescriptionDetail, Supplier.  
**Roles:** Doctor, Pharmacist, Admin.  
**KPI Dashboard:** Semáforo de medicamentos próximos a expirar (\<30 días), tasa de rotación y reposición crítica.

### **Propuesta B: LogiTrack Enterprise (Trazabilidad Logística y Encomiendas)**

**Descripción:** Plataforma para la administración de paquetes, capacidad de bodegas y rastreo de envíos terrestres.  
**Entidades:** Shipment, Warehouse, TrackingCheckpoint, Courier.  
**Roles:** Dispatcher, Courier, LogisticsAdmin.  
**KPI Dashboard:** Porcentaje de ocupación volumétrica de bodegas, tiempo promedio de entrega y paquetes retenidos.

## **10\. Glosario de Términos y Acrónimos**

| Término / Acrónimo | Definición Técnica   |
| :---- | :---- |
| API | Application Programming Interface. Protocolo estructurado para intercambio de datos entre sistemas de software. |
| BOLA | Broken Object Level Authorization. Vulnerabilidad donde un actor accede a recursos ajenos modificando el identificador. |
| CORS | Cross-Origin Resource Sharing. Mecanismo de seguridad que regula las solicitudes HTTP entre distintos orígenes. |
| DTO | Data Transfer Object. Objeto para transportar datos entre capas sin exponer las entidades de base de datos. |
| EF Core 10 | Entity Framework Core 10\. ORM moderno de alto rendimiento para el ecosistema .NET. |
| Fluent API | Patrón basado en encadenamiento de métodos para la configuración explícita y desacoplada del ORM. |
| JWT | JSON Web Token (RFC 7519). Estándar criptográfico compacto para transmisión de identidad y claims. |
| KPI | Key Performance Indicator. Métrica cuantitativa clave para evaluar el desempeño de un proceso de negocio. |
| Onion Architecture | Arquitectura de software concéntrica donde el dominio central permanece agnóstico a frameworks e infraestructura. |
| RBAC | Role-Based Access Control. Mecanismo de seguridad que restringe el acceso a operaciones según roles asignados. |
| RFC 7807 | Estándar internacional que define un esquema JSON uniforme (Problem Details) para reportar errores en APIs HTTP. |
| SPA | Single Page Application. Aplicación web interactiva que actualiza dinámicamente sus vistas sin recargar el navegador. |

## 

## 

## **11\. Referencias Bibliográficas**

> 1. **Microsoft.** (2026). *ASP.NET Core Architecture, Dependency Injection and Web APIs*. Microsoft Learn. [https://learn.microsoft.com/es-es/dotnet/core/](https://learn.microsoft.com/es-es/dotnet/core/)  
> 2. **Entity Framework Core Team.** (2026). *EF Core Performance Tuning, Fluent API & Relational Modeling*. Microsoft Learn. [https://learn.microsoft.com/es-es/ef/core/](https://learn.microsoft.com/es-es/ef/core/)  
> 3. **React.** (2026). *Modern React State Management, Hooks and Context API*. Meta Open Source. [https://react.dev/](https://react.dev/)  
> 4. **Docker Inc.** (2026). *Docker Multi-stage Builds and Containerization Best Practices*. Docker Docs. [https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)  
> 5. **IETF Network Working Group.** (2016). *RFC 7807: Problem Details for HTTP APIs*. Internet Engineering Task Force. [https://datatracker.ietf.org/doc/html/rfc7807](https://datatracker.ietf.org/doc/html/rfc7807)  
> 6. **OWASP Foundation.** (2021). *API Security Top 10 Enterprise Guidelines*. OWASP. [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqIAAADICAIAAAC8kxSxAAAoGklEQVR4Xu2dbXAUVf7vU/fN+mrLV1v75lr7f2Hdsq5v/nXqzt9xMYkk4AKCPBkNT4pIUKhA9p8YFzAkK4Sny4OwkIAiFAREETEyGyoSESMBkoAx7EAeCGQgOBOykytl/qa83MWa+zt9+mm6ZybzlGHS/f3Wp5rTp0+f7unp6U+fHp1kBBAEQRAEsWgyjBUIgiAIglgl0Lyt09m5FQBgaQ4YP/aIzQLN2zp+/6lAoBcAYFWgeQSat3WgeQCsDTSPQPO2DjQ/Skx0sJo+YyWxKZuJwhxGhe5PVuXcp/LBZlHpPTibpoyxmkttg5d2GFah+taB7taDi3m57DifOnJEfdcD0aHUTFoklydS4+4mKvfJvUntaSvNXmVWWfG4WLEmX+5HLYRE7OocR6Q2gqB+rlWy+VtEmeXzXZoo9cCUnQdJB5pHoHlbB5ofJYYe9IbUPCs5tOkSL8hyfXDSa9J89oaTulW61VXEVO6HK7mt6YE0e60ye3M9dUgtlUVyvdZPRM1LK8aj+aYy3mbw6wrGnqLCJ4uoL7b6i3NUPrP1FSpfuccVrll8cB/LD9J864ZMeo33r1XqXx1IItA8As3bOtD86BFC8w9O0th9muQ8LlfG3ti6j5eDNb+6UVuFhvLKKm18UK4gKbm+V+72KFt1VLpvcJNEVc0PnnhFbR9Z87Ri74MRNd9MO6zuA+0qzX5yw+09wgtSVgQeuBfmPCVJ/XiX0tLUT+/ySfIInlJ7wy0eV4jDApIONI9A87YOND96CM0PNb6l1iwUJhuomrbrjPqMPWDSPJMe2g/dOMrLwtkDVaK+daC7t4F3KD+0Z/JDe/5IIPxD+zkHz42k+d4rm3NG0nwQYle5m7sr2ay3+Ihc2hOarpZuSmav4/tPB8HcT+8XSweV0Xwg+DWCpAPNI9C8rQPNA2BtoHkEmrd1oHkArA00j0Dztg40D4C1geYRaN7WgeYBsDbQPALN2zrQPADWBppHoHlbB5oHwNpA8wg0b+tA8wBYG2gegeZtHWgepJ7sgnUZrIAIBAaIyGWPt1stl+89SuU/TH2bytkFG6hMNeoq1NK8euQydaKWD5ysp/LZy81qs1crqs2rRC6nZG+NxzMy0DwCzds60DxIPa9W/M14IiLRRTp0xuMZGWgegeZtHWgePCSQ+GI+kiMAzSPQvK0DzYOHBBJfzEdyBKB5BJq3daB5kHqyC9YZT0QkuuC7eSSOQPO2DjQPUg80H3egeSSOQPO2DjQPHhJIfDEfyRGA5hFo3taB5tMQv78/fRgc7DfvYTJA4ov5SI4ANI9A87YONJ+GmF37EBkNzeOhfdzBQ3skjkDztg40n4Zwv948yxhbf6Ld7F09bziZuTI0V6qYFGN9KEpcWvnhav5M9TYS25Zmv3FBXOkX//TVUp+Tq5uo2HtwVVALXfo/XWusUiK5NkJaxG/aEHXGRYkGmkfiCDRv60DzaYi/jZTsJMV+23bb7GDiVGlUtg7iSpWxJljn4eqTqPlx4/74/ffq+RZNhh8trKV/fr+uzbhEyRMHfcYqLb6gzTxw/1v1TV7o433uWlX0SyCS5h8J5XKxuZE0zzMnijZxxXhURwSaR6B5WweaT0OygsfcJbnSMDy/ar1UqPimXx2Xq1PKnrb+ElHSVR7uVPoRo/lSl9/PnxMwlumuzpMKxf6vyumf3HfPqmtxzXtcotwXUfNeb4uey5ddEcjMHCf6XLLkFeOJGCr7luhM6eFDcOHXDIc8Vg407pQKqwJD8gC6lzu46F7jzoAkWr2Pnaxg9VRpVtL8lsIimkbQ/JHhwJxGXsjI5+35VNrclj6ueXVnRFZ3y6uoEZp/VGvpU9cSKz4iFR7d7N5XyAvjT/ykrRwpxrdgRKB5BJq3daD5NGQRY9eF4EnYysN2Jsm7JD/T7dVG81RJtlbKxdTeLRldFXZetfLYXzea93zzwfQ1x+/cuV103NPT03N0+XipbWFPz/kTtzxU/5+1d4rFrcaVqsUH/mHew/gYPz6bNvPqqy9H+dD+wuZlavkJxamk3gwmW5zXS8PrJxR9SrPDj6ziD+QNo3nRgD+3lzQvote8sjrPkbc1H2uaDx7N15Vpmv83VqCfDSi7p/O6jz/Ab9wp3Tq09GqL+GuhwoV7+rXDRurKeGAjA80j0LytA82nIaqkmeTaeU5emLK1qbZIqlrwwfUDc+nfPVdDjOYNmmdL9nV3d9265fF9t0tU+P23lYLcZrlD/DtZrYl+NB8fUWo+oLrQWR40mtdpXq7UL524k2Y7Hsiri2/HO6pL5A6z94XTvD4ZDr6JwODpRza45X0QsqfCujaxoSCvDzeJBmqCNV8SXvMltG+8QDsWRaRNG49nZKB5BJq3daD5NEQddscEuZyM3tHRwaXuu2NuEB9J/G4+GKtl14CxZnRiPpIjAM0j0LytA82nIWbXGiCL9/T0CKOblyYXaD6a/P7VamPVaMV8JEcAmkegeVsHmk9DDKK9e/eHnp7ua9eu3r496lI3Mxqaj/6hPWIIHtojcQSat3Wg+TRk796NU6dOKihYYF5kDaD5uAPNI3EEmrd1oPk0wettIbszxmhqXmoxzl7+xngiItHGeDBHBJpHoHlbB5p/iNjH66FA4ov5SI4ANI9A87YONJ9K7O11DTy0jzt4aI/EEWje1oHmR5uCggUW/pY9PqD5uAPNI3EEmrd1oPlRQtj98mWXeREo33uIzj2Pd5AQ56Eoi1l9OWSz+MpiVl8O2Sz6spjVl0M2i68sZvVlMXvg5Bfm4xkZaB6B5m0daD5ZkNHxQD4mPN7viXBlMasvh2wWX1nM6sshm0VfFrP6cshm8ZXNszEBzSPQvK0Tq+bFL3QGAj8S4cqvVuxVywdONlCZpmqz7IKN5lUilz3em2q5fO8xKv9h6ttUpimVqUZdhVqaV49cTtLeGg8UAGkCNI9A87ZOTJr/w9S3jOsjPHfNxwqANAGaR6B5WweaT0ageZC+QPMING/rxKR5CcQYPLQH6Qw0j0Dztg40n3igeZDOQPMING/rxKR5PLQPEzy0B+kLNI9A87YONJ+MQPMgfYHmEWje1olJ8xKIMXhoD9IZaB6B5m0daD7xQPMgnYHmEWje1olJ89E/tOc/GpOzylgbY35p2CaXvt9Hk99vdeuXRoxP/GoNsaVPq80oPF1XVqDNq3ng7jdW8WTk1xqrQgcP7UH6As0j0LytM0qaf+Kg796NljmNxnpz6owVQVn2vTTNVtzcuDOaPkUy2E5jFW0upObDBJoHFgCaR6B5WycmzUtEFaH51d2BwFCL8nOwgUeUQsfBcnmonS+Nucta1BV7DwY9A+DtH7gzFtWRnqlPsRbdGTyqDNb1jQ07JzS/axFvtm+A90wbEpqnSt7AwZ8WZLAS0Y/6AEArR6f5VyuqTUcJgHQBmkegeVtn9DT/qOTLJzR3DquSzmCayw2jeYPm+0+spaH8L1KZ+lRH83olqzHsnND8vzt4M74u1Siap52pG2oKDNS17So5MhwI9HGdi954g0b5MUCUmpdWNB8oANICaB6B5m2dmDQf00N7mmbMrw14amUfDzeJwuprpNIiVdJSodywuj7qWJ/3OVBH7f/9iE/RfElw26AIzcstS87yclkL3TeIDjPYWj7N5t/6GzWvrhWd5j3eLvOxAiBNgOYRaN7WGSXN2yz4bh6kL9A8As3bOjFpXgIx5uzli6ajBEC6AM0j0LytA80nHnw3D9IZaB6B5m2dmDSPh/YhU773qPlYAZAmQPMING/rQPPJCL6bB+kLNI9A87ZOTJqXQMyB5mPBlQES5b9OG49qeKB5BJq3daD5xIPv5mPjq/8euO8D8eN+E5pHYgo0b+vEpHk8tA+Z7IIN5mMFwgLNJwg0j8QYaN7WiU/zHu/g2cvdaidUVmfjK1OHhnLIZvGVxd6GXBRfWb+HUhkP7WMBmk8QaB6JMdC8rROT5kFITp7czxjbu3ejeREIATSfINA8EmOgeVsHmk8uXm9LRUXx1KmTzIuADDSfINA8EmOgeVsHmh9VxECfpuZF9gWaTxBoHokx0LytA82nBhriw/cy0HyCQPNIjIHmbR1oPvWoD/YvX3aZl1ofaD5BoHkkxkDztg40/9Ah6xcULCDx28X6sWveVZZRt3WcuV5dKgoD9Y83tRmXRsB1qEYut80QK7reW9O2PYM6PPPhCj5b9rh5Lc4v+7p+ktofVnoIg6v8d+bKRIHmkRgDzds60Hy6Iaxv5bF+7JqXHVz2mHmRVJ8czZ8t5/2Q5gekyrYfwmr+h9rfucpn8B7KDBZvdm1fY26fZKB5JMZA87YONJ/O7N27kTFGA33zojFMvJo/LemcpE54fpELak3dMRdpXpQHfvGdLucFfYNfpR6oQP6ukwoGzZ/5piugaN5TP84TfjR/cW1Gyybq+bQ09bW9J/VWmd8kdXu6vpk2RDvQ9kON6MGwz2e+aW+p5IWLHcaeowKaR2IMNG/rQPOpx+/vjw+f705v783u7q47d26blz4s7t3zml9jJOLVvN7ZvGa42bUhR1f/uDqad723RlZ4G425u8Qq15UbBa1DneZd5TkXK4NG86JPuYG0FfK3Un4ycL/RXZXxayv1XyP6l3ZDHs2rG6Ierh/iNxZqJxypDRX8w9prjAFoHokx0LytA82nHrMp4+buXS+Jv6Ojo6enh24CzA1SQAo0L+xIY/TAfY8o19eerpfNGqR5ueV93Wj+p92i0HJDb19paZjv5kNqXk/dMRdfemA3ed1PNw0bpN74rNRzeb5e8+p9hjqap1uKrgNSYdd6c+cjA80jMQaat3Wg+dTjrs5jUszKDMJVbKwRdB401gTRfqjTS8N96p/0n1NWF3novyeP78a3lbnmRQacjtBtUqB5EAQ0j8QYaN7WgeZTD2l+zxUuSDENSzjNjwRb8AGfFn2m1tCgn2QvHvgTNPSnshj9C80nQjSaHxpyP/dcjjwLzScINI/EGGje1oHmU49+NJ8nTZfn0tTFHNP93o686vYsxg5futGwIY83qHTJDa5U5e1q8npuaPq/26oU+Nhd9W6Jg/k7uen56tXt6iJRUGePFWf6Fc2rsr97eTfpn+4Jbt3ysMxV57fNemruuu4rZzo6Ohibyac5b9DspMqGno+XH2nsWJHDWlsvVFQUE3v3bgzH3/62VrzkiRPHQ/OJAs0jMQaat3Wg+dQjRvMVXO0k3cmKnl0sr4rXlLoYm8trJJ1vuaCMm6/wpWq9x1V8yiPkzZ+lB38F0JSlzJLmaeo+VLjoUIdO802rT7TSbviNmr/hETcE01d6ectiqm+4K3fLGG9f8ZVUzq8Su0GdRDmap+2+/PJMPgvNJwg0j8QYaN7WgeZTj/rQnjlInHwgvv5Ik17z/ptnsxysopTL3n1indwgSPN8LSl5teV5WbNeqy2fLi+VmHegQxRI8yVzc1nWdM/dfu+lD5gzU8jeydjh5ia+G3dbqQ3XfJ9L6bJq+VQny8pd9KyTWtaWz6W1+I5Jmv+2ulDMxqT5IKD5BIHmkRgDzds60Hzq0fvYAoxFzYf8EZv/6ljjkv73evMiPTH9As+oAM0jMQaat3Wg+dRjNuWYxjKad5XxH7aTaFb/nzoz0Dwy5gLN2zrQfOohL1oM82uMxMPUfPuZk8cCkuab1vKB+/+9e+w6/9/xOb/+Hxf//+x5WdZ83YGtvHHZY9cP/ab/nuf/DfB1SfN16v9w/1CA5pEYA83bOtA8SDUPUfMdC8UzedK8YnQjp083K5pv9kh3ANSySde47sDucD+bkyKgeSTGQPO2DjQPUs1D1Lz6+3fb1wycZqJsWCTG8VS4qdTQ2P3XPn5bIBrTaP7XGytOn2o0d54ioHkkxkDztg40D1LNQ9W8FYDmkRgDzds60DxINdB8gkDzSIyB5m0daB6kGmg+QaB5JMZA87YONA9SDTSfINA8EmOgeVsHmgepBppPEGgeiTHQvK0DzYNUA80nCDSPxBho3taB5kGqgeYTBJpHYgw0b+tA8yDVQPMJAs0jMQaat3WgeZBqSPMdJSB+oHkkxkDztg40D4C1geYRaN7WgeYBsDbQPALN2zrQPADWBppHoHlbB5oHwNpA8wg0b+tA8wBYG2gegeZtHWgeAGsDzSPQvK0DzQNgbaB5BJq3daB5AKwNNI9A87YONA+AtYHmEWje1oHmAbA20DwCzds60DwA1gaaR6B5WweaB8DaQPMING/rQPMAWBtoHoHmbR1oHgBrA80j0Lytc+HCWwAACwPNI9A8giAIglg20DyCIAiCWDbQPIIgCIJYNtA8giAIglg20DyCIAiCWDbQPIIgCIJYNtA8giAIglg20DyCIAiCWDbQPIIgCIJYNtA8giAIglg20DyCIAiCWDbQPIIgCIJYNtA8giAIglg20DyCIAiCWDbQPIIgCIJYNtA8giAIglg20DyCIAiCWDbQPIIgCIJYNtA8giAIglg20DyCIAiCWDZ6zfcCAAAAYOyjBZoHAAAALIYWaB6AZLJ6fmZ23lJTfTNjzJkzicqtWzOpPPHVFby+UZoGelnZcT6V4g301sznhTN93WJp6wa+IlFT8oIz5wW1W8bkTlY39tbkz9ZVNnuV3nikzjdd4ku9n75CFdl5r/De8vm2+FoDVWJdb8Nq5shU+w8Hy98hCjV9QfVOR465sYEzqxgvDB8yLwIAJA8t0DwAyeP+uXcbznXtl42ro5nUeH+omTmWNpWxpkBv16dLuWKDNd+ktCcB80omGVEp3K9fOrHsqL7bYM2zIa2Sa14s0ho7+M2H9+BscnPv+YqmB5rmN2UrG3KY9zwE4TQvL1V2OyRvSUvpIJgXAQCShxZoHoAkQyo1VSqaz16tav5+wKh5aejN1yUBU5ruyat3yULljwTuP9C6NWi+Zj7XdkjNt27IpLuEgE7zvE9F8281dIsdmOhgrYPyIwQTbroJ6JVeml7zyhMD0vZxsfPSnLzdTxZxndNtBH+xyj63PqD7iRXSPY1bWVd+gCHKAICE0QLNA5BkQo1xueZFWWheHjdHHM337ufP53dPF/rLlLu6Vql2a9C81HlOKM2fEV1suiRrnjH+dF1o/n7DUrF0UO7WXeOV+59j8O6Dc3P2n+PbzdsiaoTmA8qdjap5bZVA75nh3uzN9fKsd8ecI9K9zoPeabvOKGN62ttm8VoM6wIA4kULNA9AMhHKnHOwmRzGnKuVeqPmyabvnufjZtG+VxqjizL/bl4azVMCw0flFb9fHejbIVcq29o+SWmm3BlInRg1/5ZDHrVnU+eS5qlMuhWaVzpsI/uK3tSRdxBDx9n8HUONK4YCvcud2nbFVK/5hcoigb58ZhW7Eujtqub/qYHU2K328+5ErU8AQMJogeYBAKPI9olmc4f7XgCjeQCShRZoHgAwWtAo33vfWBkBaB6AJKEFmgcAAAAshhZoHgAAALAYWqB5AAAAwGJogeYBAAAAi6EFmgcAAAAshhZoHoCU4vf32xPzoQAAjBpaoHkAUorZfzbBfCgAAKOGFmgegJRi9p9NMB8KAMCooQWaByCl+P3t8s+6lrpIfsy5xGxEI32txhqBq1j0dMpjWhTcLK+63VgZmna3sYaT++5ZqcB3OHrecDL9rPlQAABGDS3QPAAphWs+r0qWn+RpKuwvnUuF63d5ZZaTOZ+dqxiXNxYu54voH2em5k5XMZ92fkB3DCRyWibXiOndDmr+rYfPzijeLFacJ3V1+NJtKlNhXqGyJ/7+9YsnTylcSRv1nPvAydj6LzrURXm7PvPwAtc8LWXKUtrV5W9M3n+1//oX65hD3rGSublZ0187VSrv86Lpmblzy/3QPAApRQs0DyLxyy+dg4NtXm9zd/fX333394sXP29qOv711x9/+eXhv//9wBdf7Pv00z0ffbSrpmbHhx9u2bt347Zt5Rs3rlqz5j/femvpsmWvLV48f+HC/HnzXnzppRkvvvjC9OlTpkx57rnncnNzn83KeuaPf3xaCEyfp592PvPMH595Zlx2duazz2ZRywkTxtMqkyZNoHWff/5P06ZNpn5mzpw6a9a0F1+cTj3n58+aM2f2/Pl5Cxa8RJtbuHDO66/Po02nJz09TeKV9vRcJ6TCtd1ftory8kzW3nH9Uu12anaeN2his7b3nNsuGnM6Wle5lPLHy0VX33TxdTva26lG1PPeHLNomkP9f7x8Uumx9q+P5ZTVaRv9eHmH2mfP9d1zWX7l5x2Ne2mjOct2Uc26F+U9JGZta5J6O8Y7VJd+ua720rVZDtYgttXRypYdpl1dV9v6TU2JvBX3YZqt/d8LaJH5UIwt6KR67bW5r76aT6cZnWxz575IJ97LL8/My+PnNp2QM2Y8T2fmtGmT6CydPHkinbF03tLZS+fw+PHZdD5nZo6jc5tOe6fzKfHG6TNu3NPUhhrTWnSqv/DClNmzX6DOaUOvvPIyndUFBQvoM1VUVFBc/OZf/lL4zjtFf/1rybp1b2/atHrr1vKdO9fu3l1JH8OjR3fRB7O+/tC3335Kn9murjMez7l//vO74eFr5g84sC5a4tT88C/dNsH82tMW8vGFCyf2799aWfk2XYnoqkHXGro2lZS8SdeCXbvWkYwbG4/19vK/JQoeFkGjeWlITaNkb9CsKLc382krb3xFtCfXTufDZVfwaF4MuMVjeVHzRTHfyuTNajOxVHowkHu9T93K7Sxlc0qBP0JY/ikf6+sRq+dKbfRLhZ+oMO8AH9wzx0p3dZ5+qbKHtOcrzYcCpC3Dwx0+X8vNm410o3DmzNHPPnv/0KH3Nm9+Z8mSV+iWhd5Zup/esGHlwYPbW1pqf/yx3dzDQ+f+/W6LYX6NEdESp+YzWIFvKGB5fjehxPzaUwndgNMt+Xvv/XX58sU0CKD7+rKyP3/++Qe3b583NwZjAuN387qH9qeucIM6Gct6bq5feiS+5dRZcU9AS6/7+/cUTs6dW+xkikrNmpdafndCqvfyDR1uvkHNao8Us6xcqqwtz2PMWVs+3X/lKC1dXi2+dCduz3vWOUM8tP+GP7Qvqea7Z+jcLy1l8lLpsYRzssff7z5Rrj60n/dcZtas18Se8FnqdvE6Px7a2wyP59zHH+/+85+XPP/8n2bOnLpp02oaY3i9zeaWo0RFRcWQhVJQUGB+jRHRAs1HYrQ1f/Xq6d27K998c+HTTztXrlz+5Zc1P/xw0dwMWAnVl0KEuZLsxyb14nZlzxXzohCYDwWwObduNe3Zs+GFF6b86U+5NJjp7v7a3CZuoHk10Hwkkqj5778/deTIzsWL52dnZ1ZUFB87Vj0wcNncDFges/9sgvlQAGDg/v3uEyfep+vkpEkTaOTT2HjM3CZKoHk10HwkYtX8P/5Rv2HDynHjnqab0+rqDT5fi7kNAACAWGltPblixWIa+m/ZUtbf32puIOjs/EoUoHk10HwkQmr+55+v7d+/ddKkif/xH44331z45Zc15jYAAABGm8HBts2b33E6n9qzZ0N391mqEV8k/etfN6B5NdB8JEjz06ZNppNm2bLXEnl8BAAAIAUIzVOgeTXQfCRCjuYBAACkJ1lZzxQUzA/gob0u0HwkoHkAABiLQPNqoPlIQPMAADAWgebVpErznbWisOal0CvWBM9mvCS3NzZbGbT6ms6Ab3A4w7HT3DIpQPMAADAWiVLzjJXSdIGTGRfowtjLxio53d18Olh68pZxSbKTvprPcJTT9ElHgUHzp282UQ8uX+BxVlAjVRo6FJrvaq4T9e111bz9QICm+pZc89SYraIemnmNj6aP7bj55Phlk9/vpFmxYpfokxX8ZsZa0XmU+w/NAwDAWCQmzd+qWTBUX+r+qIg5nh/yXWSM+e7xpXUbFzunFZHmu9/npqfpvk7Sejc1uHhnSPrzTPz+oPSkT/Tmaz5ENZvquPUb7rnZtO2MLaDy8+I/C1zZQOWZ453MmUWFQysXsKyZt6QNjZj01bxPkisvBGt+Rr1YtI1MLMbxIUbzDdzQEqvWzCnYd2WYNwsezavW12s+g/HBfQ6vlzvPKDqrdFVAdwYZbKO+kwhA8wAAMBaJWvM8+76+RZqXa7LWinrSesOAaBOkeZK3srYYzfPUvTvz4j25N2ndoU3N0oJG3tuhm0NDnftI82UO9bFBg77xiElfzbsqi9o/WvvbSrdvyP1YZYvnplusqGh+lWriGZ/79StyzQ80ZUzgPm5UK1e2kOY9umbyaL7oLN0HzDjp31deomp+hl7zL9VOdhR47gU8V5vkzk27GhJoPrn8zxdXWZKffu40v1iQCOaDDCJgPoAgas3Ldtc0L3mXsedp2D6h9OOhgVtc8x++fGtwaKaDcc1LDfiwfqi7qm1QrDV4q3Ht+SE2YSmVywqraMpH7qJDoXZJ8x8vZW7f4NCAm9ZY+n4jFaralHYRk76aH+tA88nl9o//Mh/ksc6M0n3QfNKxyRUmKfyPmX8xH0AQpebHSqD50QKaTy7QPIgSm1xhkgI0HxJoXg00HwloPrlA8yBKbHKFSQrQvJ7Dh3eKAjSvBpqPBGm+oGDB1KmTKiqKL192mY8DiAloHkSJTa4wSQGa16P+d23QvBpoPhLhRvMnT+6H/uMAmgdRYpMrTFKws+a93ha6FJPU9+7dKC7FwvEBjOZ1geYjEU7zBuj0It/TuUXipzsAcwMggOZBlNjkCpMUbKV58joZnS62ZPeQQ6zMzGf6+s4HoHldoPlIRKl5Fb+/X8/du947d2739PR0dHT09t6ksqHBWOfnn++YD0IEoPm4MR/8h8iPP/rMe5hcbHKFSQqxat78hqYnPt8dumzSxfPWLQ+Vqcb8WiIAzauB5iORoOYjoL8D6O7uUs/jsQU074PmRwebXGGSwljXPF39hM7pekhlcwMV82uJADSvBpqPRByab9hayJhzz5cd5nNU8G114ZTKen/nQfMiFXETQKc+3QEQVBD3AVkOxrKmm9snl/XfGGvCMUqaf3zaR+bKkGSIHzeM+veOomTNS/w3mM31IUmN5mvL57Ks3O+8xrcgiM6DuZVn9TXrn2PGNlFwylSjUuLi0zTS/L2m3QO8kFHeZlwkI/9GlokWPu3kv3uds4P/alY4RtyTYxuLqM368z+ZF4Xl5mljTQLEqvk9efGcFWbEt+C1V0Z+SEkXNLqC6Uc1fr+LlbrMLQ284QzaVfNriQA0ryZOzf+3/7XEJphfewT8/hu5b1T5vR2574Q9g5kjz3/XWBkNUxi72ee9efEToX/xgRHfBdAdAH2QzKuYoY+luTJ6DAKIUvMtLbWiEKXm5QtrZ636A4jhePx9n7kycdJQ8yz/PfPbESsR/M3pO3pKOjNLvjAtUhhtzS9aNFcURpSrwPP5toyVXNjity9DMYLmabq+tCijOKzpI+yJ/EPd0i9w/zZ8s7AoPwGeIKOtecaKzZW8Pq+KpjMcWm/q+CSK55RRad6A+bVEYInlYn6NEdESp+ZBSA6/pvv8eFzibtej3PZS3NV5QrTqlDJjR6v44NHUzSsL+dKvysVStcMZu1rVstwd3THQp0UXbZGuvOvi7Z2zeWHWtvNSRWHH8bfFIvocioKczNV/pvatt1t2vSgq6HPLHKI4eQ/fd0YfzlOlubyQWxyl5sX6r78+L0rNP77tI1bjz2EFT37o813l4y1xqf2t8ocJ1JbqLF1qRUGtmaE0llimLspvGG6vkf6CkdSM0VS3iQy2jQpC8xmOcv1ehSNFmmfsujSUL5HeWTEVB1ak4is+m1fdLr9N6ml2bh2fySoX9eI0U5eKguDbdzOpWfPmycyxUl2aS9di5Uzm23X103s/epoXG8rJyda/yxFYmFWwYgq1vPkGn/K/kkUrPvl+X1f9TuU95Zrft7LIJ929tWvrappfs7ToN5XujJf4KjUr+dBcORnU801qPMR/b3vNHLlS/YNbmubv9YlFNQMBn7YDAbnPCTu3LuU14z76Sd+/WqDdFqcxbWXySf4nPLZIP+Y9IvFpvlgcazb5g/msyXfHd6fu5p3bcl1OaW/Pt6LY3X2O/7P8qHqtIHMLeQvN8zPqinoq5qpXpLzq1u+kyx0TJ5tyGdHO21KX0iA3ZIOGu0HXSX+Mmrc9WqD5ZEIXSvWiKS7EBF15xTl6qlQ6ZcU9rKuYl/PWeZvfY1M3B2ueL5JVqrsKs8KjWufSoErq0EWr0N0DfdL8V/inTnz2qIaQV2TF6v27sida5/JUWkuUdR9adkpZlCdWlDvhPVOf/4xa85MmTezqOhOl5um6PNlRQCN1ku7jyuV+Rr08dtf/LWN1NK/8TaNh+Tor/1GDQPP7q3izoKu29CcP6oebh/yeSx/R9VTeRP1O2oRYKl3Bi96+atyxkKRG8/zt8xxl+VVBmpfeGv7Wi/PKVSw0Lxq4lXctL4tVnGhX3z75ZLjbKt5it3JSUePmreT4Yqlzfl6JStGJgNrn7Wodbc0vWfKK8N+IZLBycvzW1wt8dTv5E3h5ZC/rU4LOoiLpz2cY1tU0L3c1+1NpXdHS16z+RYxgzeu/IdKN5n1rruruLGk36sXTBd6J6FOct28sKXHd4SebtnVlH/h5q/xpLjr/xakbDfFpXpxC4s1ljsISPih3yR97xtTLl/SmF+tPGK1eaP5ufbN0YihL5TNHrWHBlxHlusRH8yEbiOuksmmmP1HNrwWERws0n0y0k9s51zCa94fS/DxlgC5G+XQ/q2p+uXxvq53xp96R3aw9HpBG80bNy5FukKXsaVOu7LRFqUbfuTwN1ry6LXWRfDngyYt1NK8SleZ7zvLpAH+Imu8wDLXly6ja2Kj5Af4HjokVl8JqXnyV+5hcw0f5wZuQNU9X59PbStQNRSA1mhdvR8Wp26dKMw1vzQia7/tMa08nw1XlZGjeLOqPeZRLalY5TWv7+t1786iZWMpH821Vag/8/vLC5tHTvIr+XY7Ab/ifxQpIj9z5X6dUR/ON75cr76lsa7ppCzeaFwh/hxnNy7eP5O8ZE7STkKZrrsvn3r7SZT5fi1jE/7xWqNF8444SXsjaJ2v+nvynvERLMZpX9udmhiPc1xBGEte890QhnTnKB5yxos/0j3Ckf/PUE0acLVpjB/+vhZRyoXqvUOK6EeYyckNuXOqSG/C1QjSQR/O6E9X8WkB4tEDzyUT9AERJrsnliaM+SUsBo6L5kdCP5tOB1GjefPAfIumjeYHnnrHm4SOP5uNnYaOxJhyxat78hvr9Z68ba+JGHs2PBubXAsKjBZpPJubzMjKHK19jzsyGTmN9IkDzKQaaHw1i0nw6kpjmfzt7m7kyHAlq3l2dN6/8M/O7HC/QfJqgBZpPJubz0to8FM2nG9D8aDDmNZ9CEtT8GML8WkB4tEDzIHVA8yBKoPnoiVXzwB5ogeZB6oDmQZRA89EDzYNQaIHmQeqA5kGUQPPRA82DUGiB5kHqgOZBlEDz0QPNg1BogeZB6oDmQZRA89EDzYNQaIHmQeqA5kGUQPPRA82DUGiB5kHquNxxwZJA80nHfJBBBMwHENgeLdA8AAAAYDG0QPMAAACAxdACzQMAAAAWQws0DwAAAFgMLdA8AAAAYDG0QPMAAACAxdACzQMAAAAWQws0DwAAAFgMLdA8AAAAYDG0QPMAAACAxdACzQMAAAAWQws0DwAAAFgMLdA8AAAAYDG0aJq/cKEUAAAAAGMdneWDRvMIgiAIglgq0DyCIAiCWDb/H4NmJVEPgTIJAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,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>