import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const requireAuth = (req: any, res: any, next: any) => {
    const token = req.cookies.jwt;
    if (token) {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decoded);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}