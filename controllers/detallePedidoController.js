const DetallePedidoModel = require('../models/detallePedidoModel');

const DetallePedidoController = {
  async listar(req, res) {
    try {
      const data = await DetallePedidoModel.getAll();
      res.status(200).json({ ok: true, data });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al listar detalles de pedido', detalle: error.message });
    }
  },

  async obtenerPorId(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const item = await DetallePedidoModel.getById(id);
      if (!item) return res.status(404).json({ ok: false, mensaje: 'Detalle de pedido no encontrado' });
      res.status(200).json({ ok: true, data: item });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al consultar detalle', detalle: error.message });
    }
  },

  async crear(req, res) {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    if (!id_pedido || !id_producto || !cantidad || cantidad <= 0 || precio_unitario === undefined || precio_unitario < 0) {
      return res.status(400).json({ ok: false, mensaje: 'id_pedido, id_producto, cantidad > 0 y precio_unitario >= 0 son obligatorios' });
    }

    try {
      const nuevo = await DetallePedidoModel.create(req.body);
      res.status(201).json({ ok: true, mensaje: 'Detalle agregado correctamente', data: nuevo });
    } catch (error) {
      if (error.number === 547) {
        return res.status(400).json({ ok: false, mensaje: 'El id_pedido o id_producto indicado no existe' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error al crear detalle de pedido', detalle: error.message });
    }
  },

  async actualizar(req, res) {
    const id = parseInt(req.params.id, 10);
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    if (isNaN(id) || !id_pedido || !id_producto || !cantidad || cantidad <= 0 || precio_unitario === undefined || precio_unitario < 0) {
      return res.status(400).json({ ok: false, mensaje: 'Datos inválidos para actualizar detalle' });
    }

    try {
      const actualizado = await DetallePedidoModel.update(id, req.body);
      if (!actualizado) return res.status(404).json({ ok: false, mensaje: 'Detalle de pedido no encontrado' });
      res.status(200).json({ ok: true, mensaje: 'Detalle actualizado', data: actualizado });
    } catch (error) {
      if (error.number === 547) {
        return res.status(400).json({ ok: false, mensaje: 'El id_pedido o id_producto indicado no existe' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error al actualizar detalle', detalle: error.message });
    }
  },

  async eliminar(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const eliminados = await DetallePedidoModel.delete(id);
      if (eliminados === 0) return res.status(404).json({ ok: false, mensaje: 'Detalle de pedido no encontrado' });
      res.status(200).json({ ok: true, mensaje: 'Detalle eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al eliminar detalle', detalle: error.message });
    }
  }
};

module.exports = DetallePedidoController;