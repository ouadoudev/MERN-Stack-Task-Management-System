// Import required modules
const express = require('express'); 
const controllers = require('../controllers/authController'); 
const isAuthenticated= require('../middlewares/authMiddleware');


// Creating an instance of Express router
const router = express.Router();


// Route for user registration
router.post("/register", controllers.Register);


router.post("/verify-email", controllers.verifyEmail);

// Route for user login
router.post("/login", controllers.Login);

// Route for user Logout
router.post('/logout',isAuthenticated,controllers.Logout);

// Route to find a specific user by their ID
router.get("/:userId",isAuthenticated, controllers.findUser);

//route for updating user
router.put('/:userId',isAuthenticated,controllers.updateUser) 

// Route to request password reset
router.post('/password/reset',controllers.requestReset);


// Route to verify password reset token
router.get('/api/password/reset/verify/:code', controllers.validateReset);

// Route to reset password
router.post('/api/password/reset/:code', controllers.passwordReset);


// Exporting the router
module.exports = router;