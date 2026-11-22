const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');

router.get('/', PedidoController.listar);
router.get('/:id', PedidoController.obtenerPorId);
router.post('/', PedidoController.crear);
router.put('/:id', PedidoController.actualizar);
router.delete('/:id', PedidoController.eliminar);

module.exports = router;