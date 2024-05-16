import { PrismaClient, Comment } from "@prisma/client";
import { ICreateComment } from "../../common/comment";
import { UserService } from "./user";
import { IncidentService } from "./incident";

const prisma = new PrismaClient();

class CommentService {
    public async retrieveComments(): Promise<Comment[]> {
        return await prisma.comment.findMany({
            include: {
                commenter: true,
                associatedIncident: true
            }
        });
    }

    public async retrieveCommentById(id: number): Promise<Comment> {
        const comment = await prisma.comment.findFirst({
            where: { id: id },
            include: {
                commenter: true,
                associatedIncident: true
            }
        })
        if (!comment) throw new Error('Comment does not exist');
        return comment;
    }

    public async createComment(params: ICreateComment): Promise<Comment> {
        const commenter = await UserService.getUserById(params.commenterId);
        if (!commenter) throw new Error('Commenter does not exist');

        const associatedIncident = await IncidentService.retrieveIncidentById(params.associatedIncidentId);
        if (!associatedIncident) throw new Error('Incident does not exist');

        const comment = await prisma.comment.create({
            data: {
                content: params.content,
                commenterId: params.commenterId,
                associatedIncidentId: params.associatedIncidentId,
                upvotes: 0,
                downvotes: 0
            }
        })
        if (!comment) throw new Error('Error creating comment');
        return comment;
    }
}

const instance = new CommentService();
export { instance as CommentService };