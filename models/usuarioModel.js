const { sql, poolPromise } = require('../config/db');

const UsuarioModel = {
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM usuarios');
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM usuarios WHERE id_usuario = @id');
    return result.recordset[0];
  },

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre', sql.NVarChar(100), data.nombre)
      .input('apellido', sql.NVarChar(100), data.apellido)
      .input('email', sql.VarChar(150), data.email)
      .input('telefono', sql.VarChar(20), data.telefono || null)
      .input('direccion', sql.NVarChar(sql.MAX), data.direccion || null)
      .query(`
        INSERT INTO usuarios (nombre, apellido, email, telefono, direccion)
        OUTPUT INSERTED.*
        VALUES (@nombre, @apellido, @email, @telefono, @direccion)
      `);
    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.NVarChar(100), data.nombre)
      .input('apellido', sql.NVarChar(100), data.apellido)
      .input('email', sql.VarChar(150), data.email)
      .input('telefono', sql.VarChar(20), data.telefono || null)
      .input('direccion', sql.NVarChar(sql.MAX), data.direccion || null)
      .query(`
        UPDATE usuarios
        SET nombre = @nombre,
            apellido = @apellido,
            email = @email,
            telefono = @telefono,
            direccion = @direccion
        OUTPUT INSERTED.*
        WHERE id_usuario = @id
      `);
    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM usuarios WHERE id_usuario = @id');
    return result.rowsAffected[0];
  }
};

module.exports = UsuarioModel;