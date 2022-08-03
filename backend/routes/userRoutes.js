const express = require('express');
const router = express.Router();

const controller  = require('../controllers/userController');
const multer = require('../midlewares/multer');

router.get("/:id", controller.getUser);
router.get("/", controller.getUsers);
router.put('/:id', controller.updateUser);
router.post('/:id/ProfilePicture', multer, controller.updateUserProfilePicture);
router.delete('/:id', controller.deleteUser);
module.exports = router;