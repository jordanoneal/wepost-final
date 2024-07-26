import { Router } from 'express';
import { UserService, createToken, verifyToken } from '../services'

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserService.getUserByCredentials(username, password);
        if (!user) throw new Error('Invalid credentials');

        const token = await createToken(user.id);

        res.status(200).json({ token, user });
    } catch (err: any) {
        res.status(400).json(err.toString());
    }
})

authRouter.post('/logout', async (req, res) => {
    try {
        res.status(200).json({ message: 'Logged out' })
    } catch (err: any) {
        res.status(400).json(err.toString());
    }
})

authRouter.get('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('Unauthorized');

        const decoded: any = await verifyToken(token);
        const user = await UserService.getUserById(decoded.id);
        if (!user) throw new Error('User not found');

        res.status(200).json(user);
    } catch (err: any) {
        res.status(401).json({ message: 'Unauthorized' });
    }
})

export { authRouter }