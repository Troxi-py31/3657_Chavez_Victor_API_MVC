const { sql, poolPromise } = require('../config/db');

const ProveedorModel = {
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM proveedores');
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM proveedores WHERE id_proveedor = @id');
    return result.recordset[0];
  },

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('razon_social', sql.NVarChar(150), data.razon_social)
      .input('ruc', sql.VarChar(11), data.ruc)
      .input('telefono', sql.VarChar(20), data.telefono || null)
      .input('email', sql.VarChar(100), data.email || null)
      .input('pais_origen', sql.NVarChar(50), data.pais_origen || 'Importado')
      .query(`
        INSERT INTO proveedores (razon_social, ruc, telefono, email, pais_origen)
        OUTPUT INSERTED.*
        VALUES (@razon_social, @ruc, @telefono, @email, @pais_origen)
      `);
    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('razon_social', sql.NVarChar(150), data.razon_social)
      .input('ruc', sql.VarChar(11), data.ruc)
      .input('telefono', sql.VarChar(20), data.telefono || null)
      .input('email', sql.VarChar(100), data.email || null)
      .input('pais_origen', sql.NVarChar(50), data.pais_origen || 'Importado')
      .query(`
        UPDATE proveedores
        SET razon_social = @razon_social,
            ruc = @ruc,
            telefono = @telefono,
            email = @email,
            pais_origen = @pais_origen
        OUTPUT INSERTED.*
        WHERE id_proveedor = @id
      `);
    return result.recordset[0];
  },

  async delete(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM proveedores WHERE id_proveedor = @id');
    return result.rowsAffected[0];
  }
};

module.exports = ProveedorModel;