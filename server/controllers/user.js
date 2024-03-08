import User from '../models/user.js'
import { errorHandler } from '../utils/error.js'
import { comparePassword, hashPassword } from '../utils/bcrypt.js'

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(errorHandler(400, 'Please provide all the required fields'));
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(401, "Invalid Email or Password"));
        }
        const isValidPass = await comparePassword(password, user.password);
        if (!isValidPass) {
            return next(errorHandler(401, "Invalid Email or Password"));
        }
        res.status(201).send({
            success: true,
            message: 'Login Successfull',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar
            }
        });
    } catch (err) {
        next(err);
    }
}

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return next(errorHandler(400, 'Please provide all the required fields'));
        }
        const existingUser = await User.findOne({ email, phone });
        if (existingUser) {
            return next(errorHandler(409, "Email already in use"));
        }
        const hashedPassword = await hashPassword(password);
        const user = await new User({
            name,
            email,
            phone,
            password: hashedPassword
        }).save();
        res.status(201).send({
            success: true,
            message: 'Register Successfull',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar
            }
        });
    } catch (err) {
        next(err);
    }
}

export const getFriends = async (req, res, next) => {
    try {
        const users = await User.findById(req.body._id).populate('friends', 'name email avatar');
        const friends = users.friends;
        res.status(200).json({ success: true, friends });
    } catch (err) {
        next(err);
    }
};
