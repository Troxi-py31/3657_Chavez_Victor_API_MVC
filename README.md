# CHAVEZCARS - Landing Page & Catálogo Web

Este proyecto es un prototipo estático (mockup) desarrollado para el **Producto Académico 2 (PA2)**. Consiste en una Landing Page para la empresa **CHAVEZCARS**, especializada en el rubro automotriz, la venta de repuestos y soporte en *Fuel Injection*.

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la página.
- **Tailwind CSS (v3)**: Framework de CSS orientado a clases de utilidad.
- **Node.js & npm**: Entorno de ejecución y gestor de paquetes para la compilación de Tailwind CSS CLI.

---

## Estructura del Proyecto

```text
WEB-PA2/
├── node_modules/
├── src/
│   ├── img/                   # Imágenes del catálogo y local
│   ├── index.html             # Estructura principal de la Landing Page
│   ├── styles.css             # Directivas de entrada de Tailwind CSS
│   └── output.css             # CSS final compilado por Tailwind CLI
├── package.json               # Configuración de dependencias npm
├── tailwind.config.js         # Configuración de rutas y paleta de colores
└── README.md                  # Instrucciones de ejecución del proyecto

Instrucciones para Ejecutar el Proyecto
Sigue estos pasos para visualizar el proyecto en local:

1. Instalación de dependencias
Abre la terminal en la raíz del proyecto e instala los paquetes necesarios:

Bash
npm install

2. Compilación de Tailwind CSS
Para compilar el archivo CSS de entrada (src/styles.css) hacia el archivo final (src/output.css), ejecuta:

Bash
npx tailwindcss -i ./src/styles.css -o ./src/output.css --watch

3. Visualización de la página
Abre el archivo src/index.html en tu navegador de preferencia o mediante la extensión Live Server en VS Code.

Contenido e Información Institucional
Empresa: CHAVEZCARS

Especialidad: Fuel Injection, sensores OEM e importación directa (China/Brasil).

Dirección: Ca. Las Prensas 230 - Independencia, Lima.

Contacto: Victor31chc@gmail.com | (+51) 935-240-931