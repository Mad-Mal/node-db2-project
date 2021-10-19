const express = require('express');
const router = express.Router();
const db = require("../../data/db-config.js");
const Car = require('./cars-model.js');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

router.get('/api/cars', (req,res) => {
    Car.getAll()
        .then(allCars => {
            res.status(200).json(allCars)
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
})

router.get('/api/cars/:id', checkCarId, (req, res) => {
    const { id } = req.params;
    Car.getById(id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

router.post('/api/cars', checkVinNumberUnique, checkVinNumberValid, checkCarPayload, (req, res) => {
    Car.create(req.body)
        .then(newCar => {
            res.status(201).json(newCar)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})



module.exports = router; 