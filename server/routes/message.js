import express from 'express';
import { getMessage, newMessage } from '../controllers/message.js';
const router = express.Router();

router.route('/feed/newmessage').post(newMessage);
router.route('/feed/getmessage/:id').get(getMessage);

export default router;