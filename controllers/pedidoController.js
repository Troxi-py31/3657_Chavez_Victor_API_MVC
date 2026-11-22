const PedidoModel = require('../models/pedidoModel');
const ESTADOS_VALIDOS = ['Pendiente', 'Procesando', 'Completado', 'Cancelado'];

const PedidoController = {
  async listar(req, res) {
    try {
      const data = await PedidoModel.getAll();
      res.status(200).json({ ok: true, data });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al listar pedidos', detalle: error.message });
    }
  },

  async obtenerPorId(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const item = await PedidoModel.getById(id);
      if (!item) return res.status(404).json({ ok: false, mensaje: 'Pedido no encontrado' });
      res.status(200).json({ ok: true, data: item });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al consultar pedido', detalle: error.message });
    }
  },

  async crear(req, res) {
    const { id_usuario, estado, total } = req.body;
    if (!id_usuario || (estado && !ESTADOS_VALIDOS.includes(estado)) || (total !== undefined && total < 0)) {
      return res.status(400).json({ ok: false, mensaje: 'id_usuario obligatorio; estado debe ser Pendiente, Procesando, Completado o Cancelado' });
    }

    try {
      const nuevo = await PedidoModel.create(req.body);
      res.status(201).json({ ok: true, mensaje: 'Pedido creado correctamente', data: nuevo });
    } catch (error) {
      if (error.number === 547) {
        return res.status(400).json({ ok: false, mensaje: 'El id_usuario indicado no existe' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error al crear pedido', detalle: error.message });
    }
  },

  async actualizar(req, res) {
    const id = parseInt(req.params.id, 10);
    const { id_usuario, estado, total } = req.body;
    if (isNaN(id) || !id_usuario || !ESTADOS_VALIDOS.includes(estado) || total === undefined || total < 0) {
      return res.status(400).json({ ok: false, mensaje: 'Datos inválidos para actualizar pedido' });
    }

    try {
      const actualizado = await PedidoModel.update(id, req.body);
      if (!actualizado) return res.status(404).json({ ok: false, mensaje: 'Pedido no encontrado' });
      res.status(200).json({ ok: true, mensaje: 'Pedido actualizado', data: actualizado });
    } catch (error) {
      if (error.number === 547) {
        return res.status(400).json({ ok: false, mensaje: 'El id_usuario indicado no existe' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error al actualizar pedido', detalle: error.message });
    }
  },

  async eliminar(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const eliminados = await PedidoModel.delete(id);
      if (eliminados === 0) return res.status(404).json({ ok: false, mensaje: 'Pedido no encontrado' });
      res.status(200).json({ ok: true, mensaje: 'Pedido eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al eliminar pedido', detalle: error.message });
    }
  }
};

module.exports = PedidoController;