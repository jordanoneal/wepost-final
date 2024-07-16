import express from 'express';
import { UserService } from '../services/user';
import { ICreateUser } from '../../common/user';
import { createToken } from '../services/auth';

const userRouter = express.Router();

userRouter.route('/')
    .get(async (req, res) => {
        try {
            const response = await UserService.getUsers();
            res.status(200).json(response);
        } catch (err: any) {
            res.status(400).json(err.toString());
        }
    })
    .post(async (req, res) => {
        try {
            const params: ICreateUser = req.body;
            const user = await UserService.createUser(params);

            const token = await createToken(user.id);

            res.status(201).json({ user, token });
        } catch (err: any) {
            res.status(400).json(err.toString());
        }
    });

userRouter.route('/:id')
    .get(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const response = await UserService.getUserById(id);
            res.status(200).json(response);
        } catch (err: any) {
            res.status(400).json(err.toString());
        }
    })

export { userRouter };