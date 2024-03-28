import express from 'express';
import { CommentService } from '../services/comment';
import { ICreateComment } from '../../common/comment';

const commentRouter = express.Router();

commentRouter.route('/')
    .get(async (req, res) => {
        try {
            const response = await CommentService.retrieveComments();
            res.status(200).json(response);
        } catch (err: any) {
            res.status(400).json(err.toString());
        }
    })
    .post(async (req, res) => {
        try {
            const params = req.body as ICreateComment;
            const response = await CommentService.createComment(params);
            res.status(201).json(response);
        } catch (err: any) {
            res.status(400).json(err.toString());
        }
    })

commentRouter.route('/:id')
    .get(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const response = await CommentService.retrieveCommentById(id);
            res.status(200).json(response);
        } catch (err: any) {
            res.status(400).json(err.toString());
        }
    })

export { commentRouter };