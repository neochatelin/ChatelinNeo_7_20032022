const express = require('express');
const router = express.Router();

const controller = require("../controllers/postController");
const { auth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.post('/', upload, controller.createMessage);
router.post('/like/:id', controller.like);
router.get('/:start/:limit', controller.getMessages);
router.get('/:id', controller.like);
router.get('/:id/private_message/:start/:size', controller.getPrivateMessages);
router.delete('/:id', auth, controller.deleteMessage);

module.exports = router;