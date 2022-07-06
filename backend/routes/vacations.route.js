module.exports = (app) => {
    const vacations = require('../controllers/vacations.controller.js');
    // const vacations = require('./vacation.controller');
    // Create a new vacation
    app.post('/vacations', vacations.create);
 
    // Retrieve all vacations
    app.get('/vacations', vacations.findAll);
 
    // Retrieve a single vacation with vacationId
    app.get('/vacations/:vacationId', vacations.findOne);
 
    // Update an vacation with vacationId
    app.put('/vacations/:vacationId', vacations.update);
 
    // Delete an vacation with vacationId
    app.delete('/vacations/:vacationId', vacations.delete);
}