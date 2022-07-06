const Vacation = require("../models/vacation.model");

// Create and Save a new vacation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.target) {
    return res.status(400).send({
      message: "target can not be empty",
    });
  }

  // Create a vacation
  const vacation = new Vacation({
    target: req.body.target,
    price: req.body.price,
    date: req.body.date,
  });
  
  // Save vacation in the database
  vacation
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the vacation.",
      });
    });
};

// Retrieve and return all vacations from the database.
exports.findAll = (req, res) => {
    Vacation.find()
    .then((vacations) => {
      res.send(vacations);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vacations.",
      });
    });
};

// Find a single vacation with a vacationId
exports.findOne = (req, res) => {
    Vacation.findById(req.params.vacationId)
    .then((vacation) => {
      if (!vacation) {
        return res.status(404).send({
          message: "vacation not found with id " + req.params.vacationId,
        });
      }
      res.send(vacation);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "vacation not found with id " + req.params.vacationId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving vacation with id " + req.params.vacationId,
      });
    });
};

// Update a vacation identified by the vacationId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.target) {
    return res.status(400).send({
      message: "account number can not be empty",
    });
  } else if (!req.body.price) {
    return res.status(400).send({
      message: "price can not be empty",
    });
  } else if (!req.body.date) {
    return res.status(400).send({
      message: "date can not be empty",
    });
  } 

  // Find vacation and update it with the request body
  Vacation.findByIdAndUpdate(
    req.params.vacationId,
    {
      target: req.body.target,
      price: req.body.price,
      date: req.body.date,
    },
    { new: true }
  )
    .then((vacation) => {
      if (!vacation) {
        return res.status(404).send({
          message: "vacation not found with id " + req.params.vacationId,
        });
      }
      res.send(vacation);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "vacation not found with id " + req.params.vacationId,
        });
      }
      return res.status(500).send({
        message: "Error updating vacation with id " + req.params.vacationId,
      });
    });
};

// Delete a vacation with the specified noteId in the request
exports.delete = (req, res) => {
  Vacation.findByIdAndRemove(req.params.vacationId)
    .then((vacation) => {
      if (!vacation) {
        return res.status(404).send({
          message: "vacation not found with id " + req.params.vacationId,
        });
      }
      res.send({ message: "vacation deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "vacation not found with id " + req.params.vacationId,
        });
      }
      return res.status(500).send({
        message: "Could not delete vacation with id " + req.params.vacationId,
      });
    });
};
