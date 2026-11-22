const UsuarioModel = require('../models/usuarioModel');

const UsuarioController = {
  async listar(req, res) {
    try {
      const data = await UsuarioModel.getAll();
      res.status(200).json({ ok: true, data });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al listar usuarios', detalle: error.message });
    }
  },

  async obtenerPorId(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const item = await UsuarioModel.getById(id);
      if (!item) return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
      res.status(200).json({ ok: true, data: item });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al consultar usuario', detalle: error.message });
    }
  },

  async crear(req, res) {
    const { nombre, apellido, email } = req.body;
    if (!nombre || !apellido || !email || !email.includes('@')) {
      return res.status(400).json({ ok: false, mensaje: 'nombre, apellido y email válido son obligatorios' });
    }

    try {
      const nuevo = await UsuarioModel.create(req.body);
      res.status(201).json({ ok: true, mensaje: 'Usuario registrado correctamente', data: nuevo });
    } catch (error) {
      if (error.number === 2627) {
        return res.status(400).json({ ok: false, mensaje: 'El correo electrónico ya está registrado' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error al crear usuario', detalle: error.message });
    }
  },

  async actualizar(req, res) {
    const id = parseInt(req.params.id, 10);
    const { nombre, apellido, email } = req.body;
    if (isNaN(id) || !nombre || !apellido || !email || !email.includes('@')) {
      return res.status(400).json({ ok: false, mensaje: 'ID o datos de usuario inválidos' });
    }

    try {
      const actualizado = await UsuarioModel.update(id, req.body);
      if (!actualizado) return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
      res.status(200).json({ ok: true, mensaje: 'Usuario actualizado', data: actualizado });
    } catch (error) {
      if (error.number === 2627) {
        return res.status(400).json({ ok: false, mensaje: 'El correo electrónico ya pertenece a otro usuario' });
      }
      res.status(500).json({ ok: false, mensaje: 'Error al actualizar usuario', detalle: error.message });
    }
  },

  async eliminar(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });

    try {
      const eliminados = await UsuarioModel.delete(id);
      if (eliminados === 0) return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
      res.status(200).json({ ok: true, mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: 'Error al eliminar usuario', detalle: error.message });
    }
  }
};

module.exports = UsuarioController;