const { sql, poolPromise } = require('../config/db');

const CategoriaModel = {
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM categorias');
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM categorias WHERE id_categoria = @id');
    return result.recordset[0];
  },

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre_categoria', sql.NVarChar(100), data.nombre_categoria)
      .input('descripcion', sql.NVarChar(sql.MAX), data.descripcion || null)
      .query(`
        INSERT INTO categorias (nombre_categoria, descripcion)
        OUTPUT INSERTED.*
        VALUES (@nombre_categoria, @descripcion)
      `);
    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('nombre_categoria', sql.NVarChar(100), data.nombre_categoria)
      .input('descripcion', sql.NVarChar(sql.MAX), data.descripcion || null)
      .query(`
        UPDATE categorias
        SET nombre_categoria = @nombre_categoria,
            descripcion = @descripcion
        OUTPUT INSERTED.*
        WHERE id_categoria = @id
      `);
    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM categorias WHERE id_categoria = @id');
    return result.rowsAffected[0];
  }
};

module.exports = CategoriaModel;