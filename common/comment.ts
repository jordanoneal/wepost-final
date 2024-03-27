import { IIncident } from "./incident";
import { IUser } from "./user";

export interface IComment {
    id: number;
    body: string;
    commenter: IUser;
    associatedIncident: IIncident;
    upvotes: number;
    downvotes: number;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface ICreateComment {
    body: string;
    commenterId: number;
    associatedIncidentId: number;
}

export interface IUpdateComment {
    body?: string;

}