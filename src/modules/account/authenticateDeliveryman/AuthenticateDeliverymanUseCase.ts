import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        // Receive the username and password

        // Check if the username is registered
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if (!deliveryman) {
            throw new Error("Username or password is invalid!");
        }

        // Check if the password corresponds to the username
        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("Username or password is invalid!");
        }

        // Generate the token
        const token = sign({ username }, "81dc9bdb52d04dc20036dbd8313ed055", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token;
    }
}