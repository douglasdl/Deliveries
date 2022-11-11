import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryman {
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase {
    async execute({ username, password }: ICreateDeliveryman) {
        // Validate if the user exists
        const deliverymanExists = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    // mode: "insensitive"
                }
            }
        })

        if (deliverymanExists) {
            throw new Error("Deliverman already exists!")
        }

        // Cryptograph the password
        const hashPassword = await hash(password, 10);

        // Save the deliveryman
        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return deliveryman;
    }
}