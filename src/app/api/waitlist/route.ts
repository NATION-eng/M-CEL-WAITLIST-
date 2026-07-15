import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { waitlistSchema } from "@/validations/waitlist";
import { sanitizePhone, sanitizeText } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstMessage =
      Object.values(fieldErrors).flat().find(Boolean) ??
      "Please check the form and try again.";

    return NextResponse.json(
      { success: false, message: firstMessage, errors: fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Sanitize free-text fields before persisting.
  const fullName = sanitizeText(data.fullName);
  const email = sanitizeText(data.email).toLowerCase();
  const phone = sanitizePhone(data.phone);
  const occupation = data.occupation ? sanitizeText(data.occupation) : null;

  try {
    const existing = await prisma.waitlist.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "This email address is already on the waitlist.",
        },
        { status: 409 }
      );
    }

    const entry = await prisma.waitlist.create({
      data: {
        fullName,
        email,
        phone,
        state: data.state,
        occupation: occupation || null,
        consent: Boolean(data.consent),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "You're officially on the waitlist!",
        data: entry,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle a race-condition duplicate insert (unique constraint) gracefully.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "This email address is already on the waitlist.",
        },
        { status: 409 }
      );
    }

    console.error("[/api/waitlist] Unexpected error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong on our end. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405 }
  );
}
