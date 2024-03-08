import { errorHandler } from '../utils/error.js'
import Conversation from '../models/conversation.js'

export const newConversation = async (req, res, next) => {
    try {
        const senderId = req.body.senderId;
        const recieverId = req.body.recieverId;
        const exist = await Conversation.findOne({
            members: {
                $all: [recieverId, senderId]
            }
        })
        if (!exist) {
            let newConversation = new Conversation({
                members: [recieverId, senderId]
            });
            await newConversation.save();
            return res.status(200).json({
                success: true,
                message: 'New conversation created!'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Conversation already exist'
        })
    } catch (err) {
        next(err);
    }
}

export const getConversation = async (req, res, next) => {
    try {
        const senderId = req.body.senderId;
        const recieverId = req.body.recieverId;
        const conversation = await Conversation.findOne({
            members: {
                $all: [recieverId, senderId]
            }
        });
        res.status(200).json({
            success: true,
            conversation
        });
    } catch (err) {
        next(err);
    }
};
