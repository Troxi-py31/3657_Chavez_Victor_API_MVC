IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'chavezcars_db')
BEGIN
    CREATE DATABASE chavezcars_db;
END
GO

USE chavezcars_db;
GO

-- TABLA CATEGORIAS
IF OBJECT_ID('dbo.categorias', 'U') IS NULL
CREATE TABLE categorias (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre_categoria NVARCHAR(100) NOT NULL,
    descripcion NVARCHAR(MAX)
);
GO

-- TABLA PROVEEDORES
IF OBJECT_ID('dbo.proveedores', 'U') IS NULL
CREATE TABLE proveedores (
    id_proveedor INT IDENTITY(1,1) PRIMARY KEY,
    razon_social NVARCHAR(150) NOT NULL,
    ruc VARCHAR(11) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    email VARCHAR(100),
    pais_origen NVARCHAR(50) DEFAULT 'Importado'
);
GO

-- TABLA USUARIOS
IF OBJECT_ID('dbo.usuarios', 'U') IS NULL
CREATE TABLE usuarios (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    apellido NVARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    direccion NVARCHAR(MAX),
    fecha_registro DATETIME DEFAULT GETDATE()
);
GO

-- TABLA PRODUCTOS
IF OBJECT_ID('dbo.productos', 'U') IS NULL
CREATE TABLE productos (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    codigo_parte VARCHAR(50) NOT NULL UNIQUE,
    nombre_producto NVARCHAR(150) NOT NULL,
    descripcion NVARCHAR(MAX),
    precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    id_categoria INT FOREIGN KEY REFERENCES categorias(id_categoria) ON DELETE SET NULL,
    id_proveedor INT FOREIGN KEY REFERENCES proveedores(id_proveedor) ON DELETE SET NULL
);
GO

-- TABLA PEDIDOS
IF OBJECT_ID('dbo.pedidos', 'U') IS NULL
CREATE TABLE pedidos (
    id_pedido INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL FOREIGN KEY REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fecha_pedido DATETIME DEFAULT GETDATE(),
    estado VARCHAR(20) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Procesando', 'Completado', 'Cancelado')),
    total DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (total >= 0)
);
GO

-- TABLA DETALLE_PEDIDO
IF OBJECT_ID('dbo.detalle_pedido', 'U') IS NULL
CREATE TABLE detalle_pedido (
    id_detalle INT IDENTITY(1,1) PRIMARY KEY,
    id_pedido INT NOT NULL FOREIGN KEY REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    id_producto INT NOT NULL FOREIGN KEY REFERENCES productos(id_producto),
    cantidad INT NOT NULL DEFAULT 1 CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2) NOT NULL
);
GO

-- ÍNDICES DE OPTIMIZACIÓN
CREATE INDEX idx_producto_codigo ON productos(codigo_parte);
CREATE INDEX idx_producto_nombre ON productos(nombre_producto);
CREATE INDEX idx_usuario_email ON usuarios(email);
GO

-- PROCEDIMIENTO ALMACENADO 
CREATE PROCEDURE sp_registrar_producto
    @codigo_parte VARCHAR(50),
    @nombre NVARCHAR(150),
    @descripcion NVARCHAR(MAX),
    @precio DECIMAL(10, 2),
    @stock INT,
    @id_categoria INT,
    @id_proveedor INT
AS
BEGIN
    INSERT INTO productos (codigo_parte, nombre_producto, descripcion, precio, stock, id_categoria, id_proveedor)
    VALUES (@codigo_parte, @nombre, @descripcion, @precio, @stock, @id_categoria, @id_proveedor);
END;
GO

-- DATOS DE PRUEBA
INSERT INTO categorias (nombre_categoria, descripcion) VALUES
(N'Inyección Electrónica', N'Componentes del sistema de inyección de combustible'),
(N'Sensores y Actuadores', N'Sensores MAP, MAF, TPS y posición del cigüeñal'),
(N'Módulos y ECUs', N'Unidades de control electrónico y módulos de encendido');

INSERT INTO proveedores (razon_social, ruc, telefono, email, pais_origen) VALUES
(N'Importadora AutoParts Brasil S.A.C.', '20123456789', '987654321', 'ventas@autopartsbrasil.com', N'Brasil'),
(N'China Electronics Injection Corp.', '20987654321', '912345678', 'contacto@chinainjection.cn', N'China');

INSERT INTO usuarios (nombre, apellido, email, telefono, direccion) VALUES
(N'Carlos', N'Mendoza', 'cmendoza@gmail.com', '998877665', N'Av. Los Olivos 123, Lima'),
(N'Ana', N'Torres', 'atorres@hotmail.com', '911223344', N'Calle Las Prensas 45, Independencia');

INSERT INTO productos (codigo_parte, nombre_producto, descripcion, precio, stock, id_categoria, id_proveedor) VALUES
('INJ-BOSCH-01', N'Inyector de Combustible Bosch Multi-Punto', N'Inyector original de alta precisión', 185.00, 15, 1, 1),
('SEN-MAP-02', N'Sensor de Presión Absoluta (MAP)', N'Sensor para medición de presión del múltiple', 95.50, 20, 2, 2),
('ECU-DELPHI-03', N'Módulo ECU Delphi Programable', N'Computadora principal de control de inyección', 750.00, 5, 3, 1);

INSERT INTO pedidos (id_usuario, estado, total) VALUES
(1, 'Completado', 280.50),
(2, 'Pendiente', 750.00);

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 1, 185.00),
(1, 2, 1, 95.50),
(2, 3, 1, 750.00);
GO