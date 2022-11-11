import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ username, password }: ICreateClient) {
        // Validate if the user exists
        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    // mode: "insensitive"
                }
            }
        })

        if (clientExists) {
            throw new Error("Client already exists!")
        }

        // Cryptograph the password
        const hashPassword = await hash(password, 10);

        // Save the client
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return client;
    }
}