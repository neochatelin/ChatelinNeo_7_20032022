const express = require('express');
const router = express.Router();

const controller  = require('../controllers/authController');
const authMidlewares = require('../middlewares/auth');

router.get("/", authMidlewares.auth, authMidlewares.end);
router.post("/signup", controller.signup);
router.post("/login", controller.login);

module.exports = router;