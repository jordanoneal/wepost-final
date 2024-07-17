import { PrismaClient, Incident } from "@prisma/client";
import { ICreateIncident } from "../../common/incident";
import { UserService } from "./user";

const prisma = new PrismaClient();
class IncidentService {
    public async getIncidents(): Promise<Incident[]> {
        return prisma.incident.findMany({
            include: {
                comments: true,
                originalPoster: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    public async createIncident(params: ICreateIncident): Promise<Incident> {
        const user = await UserService.getUserById(params.originalPosterId);
        if (!user) throw new Error('User not found');

        const incident = await prisma.incident.create({
            data: {
                title: params.title,
                content: params.content,
                location: params.location,
                originalPosterId: params.originalPosterId,
                downvotes: 0,
                upvotes: 0,
            }
        })
        if (!incident) throw new Error("Error creating incident");
        return incident;
    }

    public async retrieveIncidentById(id: number): Promise<Incident | null> {
        const incident = await prisma.incident.findFirst({
            where: {
                id: id
            },
            include: {
                comments: {
                    include: {
                        commenter: true
                    }
                },
                originalPoster: true,
            }
        });
        if (!incident) throw new Error('Incident not found');
        return incident;
    }
}

const instance = new IncidentService();
export { instance as IncidentService };