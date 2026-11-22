const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriaController');

router.get('/', CategoriaController.listar);
router.get('/:id', CategoriaController.obtenerPorId);
router.post('/', CategoriaController.crear);
router.put('/:id', CategoriaController.actualizar);
router.delete('/:id', CategoriaController.eliminar);

module.exports = router;