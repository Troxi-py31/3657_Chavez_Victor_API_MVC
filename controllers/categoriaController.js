const CategoriaModel = require('../models/categoriaModel');

const CategoriaController = {
  async listar(req, res) {
    try {
      const data = await CategoriaModel.getAll();
      res.status(200).json({ ok: true, data });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al listar categorías', detalle: error.message });
    }
  },

  async obtenerPorId(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const item = await CategoriaModel.getById(id);
      if (!item) return res.status(404).json({ ok: false, mensaje: 'Categoría no encontrada' });
      res.status(200).json({ ok: true, data: item });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al consultar categoría', detalle: error.message });
    }
  },

  async crear(req, res) {
    const { nombre_categoria } = req.body;
    if (!nombre_categoria) {
      return res.status(400).json({ ok: false, mensaje: 'El campo nombre_categoria es obligatorio' });
    }

    try {
      const nuevo = await CategoriaModel.create(req.body);
      res.status(201).json({ ok: true, mensaje: 'Categoría creada correctamente', data: nuevo });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al crear categoría', detalle: error.message });
    }
  },

  async actualizar(req, res) {
    const id = parseInt(req.params.id, 10);
    const { nombre_categoria } = req.body;
    if (isNaN(id) || !nombre_categoria) {
      return res.status(400).json({ ok: false, mensaje: 'ID o nombre_categoria inválidos' });
    }

    try {
      const actualizado = await CategoriaModel.update(id, req.body);
      if (!actualizado) return res.status(404).json({ ok: false, mensaje: 'Categoría no encontrada' });
      res.status(200).json({ ok: true, mensaje: 'Categoría actualizada', data: actualizado });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al actualizar categoría', detalle: error.message });
    }
  },

  async eliminar(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const eliminados = await CategoriaModel.delete(id);
      if (eliminados === 0) return res.status(404).json({ ok: false, mensaje: 'Categoría no encontrada' });
      res.status(200).json({ ok: true, mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al eliminar categoría', detalle: error.message });
    }
  }
};

module.exports = CategoriaController;