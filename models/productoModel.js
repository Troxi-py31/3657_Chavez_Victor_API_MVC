const { sql, poolPromise } = require('../config/db');

const ProductoModel = {
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT p.*, c.nombre_categoria, pr.razon_social AS proveedor
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
    `);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM productos WHERE id_producto = @id');
    return result.recordset[0];
  },

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('codigo_parte', sql.VarChar(50), data.codigo_parte)
      .input('nombre_producto', sql.NVarChar(150), data.nombre_producto)
      .input('descripcion', sql.NVarChar(sql.MAX), data.descripcion || null)
      .input('precio', sql.Decimal(10, 2), data.precio)
      .input('stock', sql.Int, data.stock ?? 0)
      .input('id_categoria', sql.Int, data.id_categoria || null)
      .input('id_proveedor', sql.Int, data.id_proveedor || null)
      .query(`
        INSERT INTO productos (codigo_parte, nombre_producto, descripcion, precio, stock, id_categoria, id_proveedor)
        OUTPUT INSERTED.*
        VALUES (@codigo_parte, @nombre_producto, @descripcion, @precio, @stock, @id_categoria, @id_proveedor)
      `);
    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('codigo_parte', sql.VarChar(50), data.codigo_parte)
      .input('nombre_producto', sql.NVarChar(150), data.nombre_producto)
      .input('descripcion', sql.NVarChar(sql.MAX), data.descripcion || null)
      .input('precio', sql.Decimal(10, 2), data.precio)
      .input('stock', sql.Int, data.stock)
      .input('id_categoria', sql.Int, data.id_categoria || null)
      .input('id_proveedor', sql.Int, data.id_proveedor || null)
      .query(`
        UPDATE productos
        SET codigo_parte = @codigo_parte,
            nombre_producto = @nombre_producto,
            descripcion = @descripcion,
            precio = @precio,
            stock = @stock,
            id_categoria = @id_categoria,
            id_proveedor = @id_proveedor
        OUTPUT INSERTED.*
        WHERE id_producto = @id
      `);
    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM productos WHERE id_producto = @id');
    return result.rowsAffected[0];
  }
};

module.exports = ProductoModel;