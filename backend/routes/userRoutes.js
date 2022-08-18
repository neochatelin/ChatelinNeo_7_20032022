const express = require('express');
const router = express.Router();

const controller  = require('../controllers/userController');
const upload = require('../middlewares/upload');

router.get("/:id", controller.getUser);
router.get("/", controller.getUsers);
router.put('/:id', controller.updateUser);
router.post('/:id/profile_picture', upload, controller.updateUserProfilePicture);
router.delete('/:id', controller.deleteUser);
module.exports = router;