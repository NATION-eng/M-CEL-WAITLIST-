import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { waitlistSchema } from "@/validations/waitlist";
import { sanitizePhone, sanitizeText } from "@/lib/utils";
import { randomUUID } from "crypto";

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
    // Check if email already exists
    const { data: existing, error: findError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (findError) {
      console.error("[/api/waitlist] Supabase find error:", findError);
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong on our end. Please try again shortly.",
        },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "This email address is already on the waitlist.",
        },
        { status: 409 }
      );
    }

    const now = new Date().toISOString();

    // Insert new waitlist entry
    const { data: entry, error: insertError } = await supabase
      .from("waitlist")
      .insert({
        id: randomUUID(),
        fullName,
        email,
        phone,
        state: data.state,
        occupation: occupation || null,
        consent: Boolean(data.consent),
        status: "WAITLISTED",
        createdAt: now,
        updatedAt: now,
      })
      .select("id, fullName, email, createdAt")
      .single();

    if (insertError) {
      // Handle unique constraint violation
      if (insertError.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            message: "This email address is already on the waitlist.",
          },
          { status: 409 }
        );
      }
      console.error("[/api/waitlist] Supabase insert error:", insertError);
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong on our end. Please try again shortly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "You're officially on the waitlist!",
        data: entry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[/api/waitlist] Unexpected error:", {
      message: (error as Error)?.message,
      name: (error as Error)?.name,
    });

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
