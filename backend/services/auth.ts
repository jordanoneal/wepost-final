import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserService } from './user';


export const hashPassword = async (password: string, saltRounds: number): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

export const login = async (username: string, password: string) => {
    // Check if user exists
    const validUser = await UserService.getUserByCredentials(username, password);
    return validUser;
    // Generate token
    // Return token
}

export const createToken = async (id: number): Promise<string> => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error('JWT_SECRET not found');
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });

    return token;
}

export const verifyToken = (token: string) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error('JWT_SECRET not found');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}