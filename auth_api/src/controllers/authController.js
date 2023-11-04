import { UserModel } from "../models/User.js";
import {Token} from "../models/Token.js";
import jwt from 'jsonwebtoken';
import {compare} from "bcrypt";
import {BadRequestError} from "../errors/BadRequestError.js";
import {ConflictError, NotFoundError, UnauthenticatedError} from "../errors/index.js";


export const signIn = async (req, res, next) => {
    try {
        const userAgent = req.headers['user-agent'];
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password');
        }

        const userModel = new UserModel();
        const tokenMode = new Token();

        const user = await userModel.findByEmail(email);
        if(!user){
            throw new NotFoundError(`User with email: ${email} does not exists`);
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Please provide correct credentials');
        }

        const accessToken = jwt.sign({userId: user.id, email}, process.env.JWT_ACCESS_SECRET, { expiresIn: '60m'});
        const refreshToken = jwt.sign({userId: user.id, email}, process.env.JWT_REFRESH_SECRET);

        await tokenMode.save({userId: user.id, refreshToken, userAgent});

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
        res.json({
            success: true,
            data: {
                id: user.id,
                accessToken,
                refreshToken
            }
        });
    }
    catch (e) {
        next(e);
    }
};

export const signUp = async (req, res, next ) => {
    try {
        const userAgent = req.headers['user-agent'];
        const { email, password } = req.body;
        if (!email || !password || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new BadRequestError('Please provide email and password');
        }

        const userModel = new UserModel();
        const tokenMode = new Token();

        const user = await userModel.findByEmail(email);
        if(user){
            throw new ConflictError('User with this email already exists');
        }

        const { id: userId} = await userModel.create({ email, password });

        const accessToken = jwt.sign({userId, email}, process.env.JWT_ACCESS_SECRET, { expiresIn: '60m'});
        const refreshToken = jwt.sign({userId, email}, process.env.JWT_REFRESH_SECRET);

        await tokenMode.save({userId, refreshToken, userAgent});

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
        res.json({
            success: true,
            data: {
                id: userId,
                accessToken,
                refreshToken
            }
        });
    }
    catch (e) {
        next(e);
    }
};