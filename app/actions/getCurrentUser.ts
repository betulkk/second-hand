import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb';
import { User } from "@prisma/client";

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email,
            },
        });

        if (!currentUser) {
            return null;
        }

        // Alanları Date türüne dönüştürüyoruz
        return {
            ...currentUser,
            createdAt: new Date(currentUser.createdAt),
            updatedAt: new Date(currentUser.updatedAt),
            emailVerified: currentUser.emailVerified ? new Date(currentUser.emailVerified) : null,
        } as User;

    } catch (error: any) {
        return null;
    }
}
