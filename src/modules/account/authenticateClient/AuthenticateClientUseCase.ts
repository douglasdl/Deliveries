import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        // Receive the username and password

        // Check if the username is registered
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Username or password is invalid!");
        }

        // Check if the password corresponds to the username
        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Username or password is invalid!");
        }

        // Generate the token
        const token = sign({ username }, "202cb962ac59075b964b07152d234b70", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token;
    }
}