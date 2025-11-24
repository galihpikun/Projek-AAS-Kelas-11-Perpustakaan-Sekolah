"use server";

import connection from "./db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import path from "path";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function fetchAdminStats() {
  const [[result]] = await connection.execute(`
    SELECT
      COUNT(*) AS total_borrows,
      SUM(CASE WHEN status = 'ongoing' THEN 1 ELSE 0 END) AS total_ongoing,
      SUM(CASE WHEN status = 'requested_return' THEN 1 ELSE 0 END) AS total_requested,
      SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END) AS total_returned,
      SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) AS total_late,
      SUM(fine_amount) AS total_fines
    FROM borrows
  `);

  return result;
}
export async function fetchUserStats() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const [[result]] = await connection.execute(`
    SELECT
      COUNT(*) AS total_borrows,
      SUM(CASE WHEN status = 'ongoing' THEN 1 ELSE 0 END) AS total_ongoing,
      SUM(CASE WHEN status = 'requested_return' THEN 1 ELSE 0 END) AS total_requested,
      SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END) AS total_returned,
      SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) AS total_late,
      SUM(fine_amount) AS total_fines
    FROM borrows
    WHERE user_id = ?
  `, [user.id]);

  return result;
}
export async function fetchUsersCount() {
  const [[{userAdmin}]] = await connection.execute(`select count(*) as userAdmin from users where role = 'petugas'`);
  const [[{userSiswa}]] = await connection.execute(`select count(*) as userSiswa from users where role = 'siswa'`);

  return {userAdmin, userSiswa}
}
export async function fetchBooksCount() {
  const [[{Available}]] = await connection.execute(`select count(*) as Available from books where status = 'tersedia'`);
  const [[{Unavailable}]] = await connection.execute(`select count(*) as Unavailable from books where status = 'dipinjam'`);
  
  return{Available,Unavailable}
}
