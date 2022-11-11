import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token missing!",
        });
    }

    // Bearer 098989808-8979879
    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, "202cb962ac59075b964b07152d234b70") as IPayload;

        request.id_client = sub;

        return next();
    } catch (error) {
        return response.status(401).json({
            message: "Token invalid or expired!",
        });
    }
}