const ProductoModel = require('../models/productoModel');

const ProductoController = {
  async listar(req, res) {
    try {
      const productos = await ProductoModel.getAll();
      res.status(200).json({ ok: true, data: productos });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error interno al listar productos', detalle: error.message });
    }
  },

  async obtenerPorId(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const producto = await ProductoModel.getById(id);
      if (!producto) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
      res.status(200).json({ ok: true, data: producto });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al consultar producto', detalle: error.message });
    }
  },

  async crear(req, res) {
    const { codigo_parte, nombre_producto, precio, stock } = req.body;
    if (!codigo_parte || !nombre_producto || precio === undefined || precio < 0 || (stock !== undefined && stock < 0)) {
      return res.status(400).json({ ok: false, mensaje: 'Datos obligatorios inválidos (codigo_parte, nombre_producto, precio >= 0)' });
    }

    try {
      const nuevo = await ProductoModel.create(req.body);
      res.status(201).json({ ok: true, mensaje: 'Producto registrado correctamente', data: nuevo });
    } catch (error) {
      if (error.number === 2627 || error.number === 547) {
        return res.status(400).json({ ok: false, mensaje: 'Código de parte duplicado o categoría/proveedor inexistente' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error interno al crear producto', detalle: error.message });
    }
  },

  async actualizar(req, res) {
    const id = parseInt(req.params.id, 10);
    const { codigo_parte, nombre_producto, precio, stock } = req.body;
    if (isNaN(id) || !codigo_parte || !nombre_producto || precio === undefined || precio < 0 || stock === undefined || stock < 0) {
      return res.status(400).json({ ok: false, mensaje: 'ID o datos de actualización inválidos' });
    }

    try {
      const actualizado = await ProductoModel.update(id, req.body);
      if (!actualizado) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado para actualizar' });
      res.status(200).json({ ok: true, mensaje: 'Producto actualizado', data: actualizado });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error interno al actualizar producto', detalle: error.message });
    }
  },

  async eliminar(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const eliminados = await ProductoModel.delete(id);
      if (eliminados === 0) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado para eliminar' });
      res.status(200).json({ ok: true, mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
      if (error.number === 547) {
        return res.status(400).json({ ok: false, mensaje: 'No se puede eliminar el producto porque está asociado a un pedido' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error interno al eliminar producto', detalle: error.message });
    }
  }
};

module.exports = ProductoController;