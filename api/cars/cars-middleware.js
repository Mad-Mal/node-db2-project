const Car = require('./cars-model.js');
var vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Car.getById(id)
    .then(findCar => {
        if(!findCar) {
            res.status(404).json({ message: `Car with id ${id} is not found`})
        } else {
            next()
        }
    })
}

const checkCarPayload = (req, res, next) => {
    if (!req.body.vin) {
        res.status(400).json({ message: 'vin is missing!' })
      } else if (!req.body.make) {
        res.status(400).json({ message: 'make is missing!' })
      } else if (!req.body.model) {
        res.status(400).json({ message: 'model is missing!' })
      } else if (!req.body.mileage) {
        res.status(400).json({ message: 'mileage is missing!' })
      } else {
        next()
      }
}

const checkVinNumberValid = (req, res, next) => {
    let isVinValid = vinValidator.validate(req.body.vin);
    if (!isVinValid) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
    }
    else {
      next()
    }
}

const checkVinNumberUnique = (req, res, next) => {
    Car.checkVinUnique(req.body.vin)
    .then(response => {
      if (response) {
        res.status(400).json({ message: `vin ${req.body.vin} already exists` })
      }
      else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
}

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
}