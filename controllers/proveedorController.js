const ProveedorModel = require('../models/proveedorModel');

const ProveedorController = {
  async listar(req, res) {
    try {
      const data = await ProveedorModel.getAll();
      res.status(200).json({ ok: true, data });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al listar proveedores', detalle: error.message });
    }
  },

  async obtenerPorId(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const item = await ProveedorModel.getById(id);
      if (!item) return res.status(404).json({ ok: false, mensaje: 'Proveedor no encontrado' });
      res.status(200).json({ ok: true, data: item });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al consultar proveedor', detalle: error.message });
    }
  },

  async crear(req, res) {
    const { razon_social, ruc } = req.body;
    if (!razon_social || !ruc || ruc.length !== 11) {
      return res.status(400).json({ ok: false, mensaje: 'razon_social y ruc (11 dígitos) son obligatorios' });
    }

    try {
      const nuevo = await ProveedorModel.create(req.body);
      res.status(201).json({ ok: true, mensaje: 'Proveedor registrado correctamente', data: nuevo });
    } catch (error) {
      if (error.number === 2627) {
        return res.status(400).json({ ok: false, mensaje: 'El RUC ingresado ya está registrado' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error al crear proveedor', detalle: error.message });
    }
  },

  async actualizar(req, res) {
    const id = parseInt(req.params.id, 10);
    const { razon_social, ruc } = req.body;
    if (isNaN(id) || !razon_social || !ruc || ruc.length !== 11) {
      return res.status(400).json({ ok: false, mensaje: 'ID, razon_social o ruc (11 dígitos) inválidos' });
    }

    try {
      const actualizado = await ProveedorModel.update(id, req.body);
      if (!actualizado) return res.status(404).json({ ok: false, mensaje: 'Proveedor no encontrado' });
      res.status(200).json({ ok: true, mensaje: 'Proveedor actualizado', data: actualizado });
    } catch (error) {
      if (error.number === 2627) {
        return res.status(400).json({ ok: false, mensaje: 'El RUC ya pertenece a otro proveedor' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error al actualizar proveedor', detalle: error.message });
    }
  },

  async eliminar(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const eliminados = await ProveedorModel.delete(id);
      if (eliminados === 0) return res.status(404).json({ ok: false, mensaje: 'Proveedor no encontrado' });
      res.status(200).json({ ok: true, mensaje: 'Proveedor eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al eliminar proveedor', detalle: error.message });
    }
  }
};

module.exports = ProveedorController;