import express from 'express';
import { getConversation, newConversation } from '../controllers/conversation.js';
const router = express.Router();

router.route('/feed/user').post(newConversation);
router.route('/feed/getconversation').post(getConversation);

export default router;