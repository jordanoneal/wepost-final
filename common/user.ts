import { IComment } from "./comment";
import { IIncident } from "./incident";

export interface IUser {
    id: number;
    username: string;
    password: string;

    incidents: IIncident[];
    comments: IComment[];

    createdAt: Date;
    updatedAt: Date;
    delatedAt: Date | null;
}

export interface ICreateUser {
    username: string;
    password: string;
}