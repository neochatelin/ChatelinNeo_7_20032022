const express = require('express');
const router = express.Router();

const controller = require("../controllers/postController");
const multer = require('../midlewares/multer');

router.post('/', multer, controller.createMessage);
router.post('/like/:id', controller.like);
router.get('/:start/:limit', controller.getMessages);
router.get('/:id', controller.like);
router.get('/:id/privateMessage/:start/:size', controller.getPrivateMessages);
router.delete('/:id', controller.deleteMessage);

module.exports = router;