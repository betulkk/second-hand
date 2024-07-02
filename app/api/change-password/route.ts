import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: 'Current password and new password are required' }, { status: 400 });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.email) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: currentUser.email as string },  // Burada tipin string olduğunu garanti altına alıyoruz
    });

    if (!user || !user.hashed_password) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.hashed_password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Current password is incorrect' }, { status: 403 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { email: currentUser.email },
      data: { hashed_password: hashedNewPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
