# CHAVEZCARS - API REST con Arquitectura MVC

Proyecto desarrollado para el 
**Proceso de Aprendizaje 4 (PA4)** del curso **Programación Web Básica (NRC 3657)**
ISIL (Periodo 2026-20).

Consiste en una capa de servicios **API REST** construida bajo el patrón arquitectónico **Modelo - Vista - Controlador (MVC)** con **Node.js**, **Express** y **SQL Server**, orientada a la gestión comercial y de inventario de repuestos de EFI automotriz para **CHAVEZCARS**.

---

## Tecnologías Utilizadas

* **Entorno de ejecución:** Node.js
* **Framework Backend:** Express
* **Motor de Base de Datos:** Microsoft SQL Server Express (`chavezcars_db`)
* **Conector SQL:** `mssql` + `msnodesqlv8` (Autenticación de Windows / ODBC)
* **Variables de entorno:** `dotenv`
* **Pruebas de API:** Thunder Client / Postman

---

## Estructura del Proyecto (Arquitectura MVC)

```text
3657_Chavez_Victor_API_MVC/
├── config/
│   └── db.js                        # Configuración y pool de conexión a SQL Server
├── controllers/                     # Lógica de negocio, validaciones y códigos HTTP
│   ├── categoriaController.js
│   ├── detallePedidoController.js
│   ├── pedidoController.js
│   ├── productoController.js
│   ├── proveedorController.js
│   └── usuarioController.js
├── models/                          # Consultas SQL parametrizadas (CRUD)
│   ├── categoriaModel.js
│   ├── detallePedidoModel.js
│   ├── pedidoModel.js
│   ├── productoModel.js
│   ├── proveedorModel.js
│   └── usuarioModel.js
├── routes/                          # Definición de endpoints REST por módulo
│   ├── categoriaRoutes.js
│   ├── detallePedidoRoutes.js
│   ├── pedidoRoutes.js
│   ├── productoRoutes.js
│   ├── proveedorRoutes.js
│   └── usuarioRoutes.js
├── sql/
│   └── script_base_datos_chavezcars.sql  # Script DDL, índices, SP y datos de prueba
├── .env.example                     # Plantilla de variables de entorno
├── .gitignore                       # Exclusión de node_modules y .env
├── package.json
└── server.js                        # Punto de entrada del servidor Express