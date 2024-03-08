import Message from '../models/message.js';
import { errorHandler } from '../utils/error.js';
import Conversation from '../models/conversation.js';

export const newMessage = async (req, res, next) => {
    try {
        const { senderId, recieverId, conversationId, type, text } = req.body;

        if (!text) {
            return next(errorHandler(400, 'Text is required'));
        }

        const message = new Message({
            senderId,
            recieverId,
            conversationId,
            type,
            text,
        });

        await message.save();

        await Conversation.findByIdAndUpdate(conversationId, {
            message: text
        })

        res.status(200).json({
            success: true,
            message: 'Message sent',
            text
        });
    } catch (err) {
        next(err);
    }
};

export const getMessage = async (req, res, next) => {
    try {
        const messages = await Message.find({ conversationId: req.params.id })
        res.status(200).json({
            messages
        })
    } catch (err) {
        next(err);
    }
}