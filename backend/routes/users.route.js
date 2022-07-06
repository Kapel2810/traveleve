module.exports = (app) => {
    const users = require('../controllers/users.controller.js');
    // const users = require('./user.controller');
    // Register a new user
    app.post('/register', users.create);
 
    // Login  user
    app.post('/login', users.findOne);
 
    // Retrieve all users
    app.get('/users', users.findAll);
 
    
 
    
 
    
}