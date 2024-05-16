import { IUser } from "./user";
import { IComment } from "./comment";

export type Location = {
    zipCode?: string;
    city: string;
    state: string;
}

export interface IIncident {
    id: number;
    title: string;
    content: string;
    location: Location;

    //Add user
    originalPoster: IUser;

    //Add comments
    comments: IComment[];

    //Add upvotes
    upvotes: number;
    downvotes: number;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface ICreateIncident {
    title: string;
    content: string;
    location: Location;
    originalPosterId: number;

}

export interface IUpdateIncident {
    content?: string;
    upvotes?: number;
    downvotes?: number;
    comments?: IComment[];
}