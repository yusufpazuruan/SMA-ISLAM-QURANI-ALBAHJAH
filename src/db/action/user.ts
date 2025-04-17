import { db } from "@/db";
import { fighter, position, user } from "@/db/schema";
import supabase from "@/supabase/client";
import { eq } from "drizzle-orm";
import { redirect } from "react-router";

export async function isEmailExist(email: string): Promise<boolean> {
  const result = await db
    .select({ email: user.email })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  return result.length > 0;
}

export async function isUserIdExist(userId: string): Promise<boolean> {
  const result = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return result.length > 0;
}


export async function isUserStatusPending(userId: string): Promise<boolean> {
  const result = await db
    .select({ status: user.status })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return result.length > 0 && result[0].status === "Belum Aktif";
}


export async function isUserDataComplete(userId: string): Promise<boolean> {
  const result = await db
    .select({
      nipy_nisn: user.nipy_nisn,
      fullname: user.fullname,
      username: user.username,
      gender: user.gender,
      city: user.city,
      bio: user.bio,
      whatsapp: user.whatsapp,
      position_id: fighter.position_id,
      position_name: position.name,
    })
    .from(user)
    .fullJoin(fighter, eq(user.id, fighter.user_id))
    .fullJoin(position, eq(fighter.position_id, position.id))
    .where(eq(user.id, userId));

  if (!result.length) {
    redirect("/onboarding");
    return false;
  }

  const {
    nipy_nisn,
    fullname,
    username,
    gender,
    city,
    bio,
    whatsapp,
    position_id,
  } = result[0];

  const requiredFields = [
    nipy_nisn,
    fullname,
    username,
    gender,
    city,
    bio,
    whatsapp,
    position_id, // tambahkan validasi ini
  ];

  // console.log("Required fields:", requiredFields);


  const isComplete = requiredFields.every(
    (field) => field !== null && field !== undefined && field !== ""
  );

  if (!isComplete) {
    redirect("/onboarding");
    return false;
  }

  return true;
}


type CreateUserInput = {
  id: string;
  nipy_nisn?: string;
  fullname?: string;
  avatar_url?: string;
  gender?: string;
  bio?: string;
  city?: string;
  username?: string;
  status?: string;
  role?: string;
  email: string;
  email_verified?: boolean;
  email_confirmed_at?: string;
  whatsapp?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  created_at?: Date;
  updated_at?: Date;
};

export async function createUser(userData: CreateUserInput) {
  try {
    // Cek dulu apakah user dengan email ini sudah ada
    const existing = await db
      .select()
      .from(user)
      .where(eq(user.email, userData.email));

    if (existing.length > 0) {
      console.log("User sudah ada dengan email:", userData.email);
      const result = {
        status: "exists",
        data: existing[0],
      };
      return result;
    }

    // Insert user baru
    const inserted = await db.insert(user).values(userData).returning();

    const result = {
      status: "created",
      data: inserted[0],
    };
    return result;
  } catch (err) {
    console.error("Gagal membuat user:", err);
    throw err;
  }
}

export async function verifyUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) return false;

  const user = session.user;
  const userMetadata = user.user_metadata || {};

  const sessionData = {
    id: user.id,
    email: user.email,
    avatar_url: userMetadata.avatar_url,
    fullname: userMetadata.full_name,
  };

  return sessionData;
}
