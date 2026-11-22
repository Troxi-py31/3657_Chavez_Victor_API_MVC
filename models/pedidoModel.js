const { sql, poolPromise } = require('../config/db');

const PedidoModel = {
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT pe.*, u.nombre + ' ' + u.apellido AS cliente
      FROM pedidos pe
      INNER JOIN usuarios u ON pe.id_usuario = u.id_usuario
    `);
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM pedidos WHERE id_pedido = @id');
    return result.recordset[0];
  },

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_usuario', sql.Int, data.id_usuario)
      .input('estado', sql.VarChar(20), data.estado || 'Pendiente')
      .input('total', sql.Decimal(10, 2), data.total ?? 0.00)
      .query(`
        INSERT INTO pedidos (id_usuario, estado, total)
        OUTPUT INSERTED.*
        VALUES (@id_usuario, @estado, @total)
      `);
    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('id_usuario', sql.Int, data.id_usuario)
      .input('estado', sql.VarChar(20), data.estado)
      .input('total', sql.Decimal(10, 2), data.total)
      .query(`
        UPDATE pedidos
        SET id_usuario = @id_usuario,
            estado = @estado,
            total = @total
        OUTPUT INSERTED.*
        WHERE id_pedido = @id
      `);
    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM pedidos WHERE id_pedido = @id');
    return result.rowsAffected[0];
  }
};

module.exports = PedidoModel;