import router from 'express';
import { UserService } from '../services/user';
import { createToken, verifyToken } from '../services/auth';

const authRouter = router();

authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserService.getUserByCredentials(username, password);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const token = await createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });


        res.status(200).json(user);

    } catch (err: any) {
        res.status(400).json(err.toString());
    }
})

authRouter.post('/logout', async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ message: 'Logged out' })
    } catch (err: any) {
        res.status(400).json(err.toString());
    }
})

authRouter.get('/check', async (req: any, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        res.status(200).json({ message: 'Authenticated' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
})

export { authRouter }