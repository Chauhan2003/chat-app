import express from 'express';
import { getFriends, loginUser, registerUser } from '../controllers/user.js';
const router = express.Router();

router.route('/').post(loginUser);
router.route('/register').post(registerUser);
router.route('/feed').post(getFriends);

export default router;