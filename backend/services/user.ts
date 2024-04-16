import { PrismaClient, User } from "@prisma/client";
import { ICreateUser } from "../../common/user";
import { hashPassword } from "./auth";


const prisma = new PrismaClient();

class UserService {
    public async getUsers(): Promise<User[]> {
        return await prisma.user.findMany({
            include: {
                comments: true,
                incidents: true
            }
        });
    }

    public async createUser(params: ICreateUser): Promise<User> {
        const user = await prisma.user.create({
            data: {
                username: params.username,
                password: await hashPassword(params.password, 10),
            }
        })
        if (!user) throw new Error("Error creating user");
        return user;
    }

    public async getUserById(id: number): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            },
            include: {
                comments: true,
                incidents: true
            }
        });
        if (!user) throw new Error('User not found');
        return user;
    }
}

const instance = new UserService();
export { instance as UserService };