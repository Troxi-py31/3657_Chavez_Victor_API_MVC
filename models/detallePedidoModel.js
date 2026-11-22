const { sql, poolPromise } = require('../config/db');

const DetallePedidoModel = {
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT dp.*, p.codigo_parte, p.nombre_producto
      FROM detalle_pedido dp
      INNER JOIN productos p ON dp.id_producto = p.id_producto
    `);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM detalle_pedido WHERE id_detalle = @id');
    return result.recordset[0];
  },

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_pedido', sql.Int, data.id_pedido)
      .input('id_producto', sql.Int, data.id_producto)
      .input('cantidad', sql.Int, data.cantidad ?? 1)
      .input('precio_unitario', sql.Decimal(10, 2), data.precio_unitario)
      .query(`
        INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
        OUTPUT INSERTED.*
        VALUES (@id_pedido, @id_producto, @cantidad, @precio_unitario)
      `);
    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('id_pedido', sql.Int, data.id_pedido)
      .input('id_producto', sql.Int, data.id_producto)
      .input('cantidad', sql.Int, data.cantidad)
      .input('precio_unitario', sql.Decimal(10, 2), data.precio_unitario)
      .query(`
        UPDATE detalle_pedido
        SET id_pedido = @id_pedido,
            id_producto = @id_producto,
            cantidad = @cantidad,
            precio_unitario = @precio_unitario
        OUTPUT INSERTED.*
        WHERE id_detalle = @id
      `);
    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM detalle_pedido WHERE id_detalle = @id');
    return result.rowsAffected[0];
  }
};

module.exports = DetallePedidoModel;