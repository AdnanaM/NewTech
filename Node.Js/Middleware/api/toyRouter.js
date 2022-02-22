const express = require('express');
var toyRouter = express.Router();
var toyController = require('./toyController');

toyRouter.get('/', toyController.getAllToys);
toyRouter.post('/', toyController.createToy);
toyRouter.get('/:id', toyController.getToyById);
toyRouter.patch('/:id', toyController.updateToyById);
toyRouter.delete('/:id', toyController.deleteToyById);

module.exports = toyRouter;