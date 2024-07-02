import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    await prisma.user.update({
      where: { email: currentUser.email },
      data: { phone },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error changing phone number:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
