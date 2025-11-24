"use server";

import connection from "./db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import path from "path";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function register(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = bcrypt.hashSync(formData.get("password"), 10);

  await connection.execute(
    "insert into users (username, email, password) values (?,?,?)",
    [username, email, password]
  );

  redirect("/login");
}

export async function findUserByEmail(email) {
  const [user] = await connection.execute(
    "select * from users where email = ?",
    [email]
  );

  if (!user.length) return null;

  return user[0];
}
export async function getAllUsers() {
  const [users] = await connection.execute("select * from users");
  const totalUsers = users.length;

  return { users, totalUsers };
}
export async function addUser(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const role = formData.get("role");
  const password = bcrypt.hashSync(formData.get("password"), 10);
  const file = formData.get("avatar");
  let imagePath = formData.get("currentImage") || null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;

  }

  await connection.execute(
    "insert into users (username, email, role, password, avatar) values (?,?,?,?,?)",
    [username, email, role, password, imagePath]
  );

  revalidatePath("/admin/users");
}
export async function fetchBooks() {
  const [books] = await connection.execute("select * from books");
  const totalBooks = books.length;

  return { books, totalBooks };
}
export async function addBook(formData) {
  const nama_buku = formData.get("nama_buku");
  const genre = formData.get("genre");
  const author = formData.get("author");
  const file = formData.get("image");
  let imagePath = formData.get("currentImage") || null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;
  }

  await connection.execute(
    "INSERT INTO books (nama_buku, genre_buku, author, gambar) VALUES (?, ?, ?, ?)",
    [nama_buku, genre, author, imagePath]
  );

  revalidatePath("/admin/books");
}
export async function deleteData(formData) {
  const id = formData.get("id");

  await connection.execute(`DELETE FROM books WHERE id_buku = ?`, [id]);

  revalidatePath("/admin/books");
}
export async function deleteUser(formData) {
    const id = formData.get("id");

  await connection.execute(`DELETE FROM users WHERE user_id = ?`, [id]);

  revalidatePath("/admin/users");

}
export async function editBook(formData) {
  const id_buku = formData.get("id_buku");
  const nama_buku = formData.get("nama_buku");
  const genre = formData.get("genre");
  const author = formData.get("author");
  const file = formData.get("image");
  let imagePath = formData.get("currentImage") || null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;
  }

  await connection.execute(
    "UPDATE books SET nama_buku = ?, genre_buku = ?, author = ?, gambar = ? WHERE id_buku = ?",
    [nama_buku, genre, author, imagePath, id_buku]
  );

  revalidatePath("/admin/books");
}

export async function fetchBookById(id) {
  const [rows] = await connection.query(
    "SELECT * FROM books WHERE id_buku = ?",
    [id]
  );
  return rows[0];
}
export async function borrowBook(formData) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const idBuku = formData.get("id");
  const nama = formData.get("nama_buku");

  await connection.execute(
    "insert into borrows (user_id, id_buku) values (?, ?)",
    [user.id, idBuku]
  );

  await connection.execute(
    "update books set status = 'dipinjam' where id_buku = ?",
    [idBuku]
  );

  revalidatePath(`/siswa/detailbuku/${idBuku}`);
}
export async function fetchBorrows() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const [rows] = await connection.execute(
    `SELECT 
      b.borrow_id,
      b.user_id,
      b.id_buku,
      b.borrow_date,
      b.due_date,
      b.return_date,
      b.status,
      b.fine_amount,
      books.nama_buku,
      books.author,
      books.genre_buku,
      books.gambar,
      books.status AS book_status
    FROM borrows b
    JOIN books ON b.id_buku = books.id_buku
    WHERE b.user_id = ?
    ORDER BY b.borrow_date DESC`,
    [user.id]
  );
  const totalBorrows =  rows.length;

  return {rows, totalBorrows};
}
export async function fetchBorrowsAdmin() {
  const [rows] = await connection.execute(
    `SELECT 
      b.borrow_id,
      b.user_id,
      b.id_buku,
      b.borrow_date,
      b.due_date,
      b.return_date,
      b.status,
      b.fine_amount,

      books.nama_buku,
      books.author,
      books.genre_buku,
      books.gambar,
      books.status AS book_status,

      u.username AS user_name,
      u.email AS user_email,
      u.avatar AS user_avatar

    FROM borrows b
    JOIN books ON b.id_buku = books.id_buku
    JOIN users u ON b.user_id = u.user_id
    
    ORDER BY b.borrow_date DESC`,
  );
  const totalBorrows =  rows.length;

  return {rows, totalBorrows};
}

export async function requestReturn(formData) {
  const idBorrow = formData.get("id");

  await connection.execute(
    `UPDATE borrows 
SET status = 'requested_return'
WHERE borrow_id = ?`,
    [idBorrow]
  );

  revalidatePath(`/siswa/history`);
}

export async function confirmReturn(formData) {
  const idBorrow = formData.get("idBorrow");
  const idBuku = formData.get("idBuku");

  await connection.execute(
    `UPDATE borrows 
SET status = 'returned'
WHERE borrow_id = ?`,
    [idBorrow]
  );

  await connection.execute(
    "update books set status = 'tersedia' where id_buku = ?",
    [idBuku]
  );

  revalidatePath(`/admin/borrows`)
}
export async function editProfileAdmin(formData) {
  const user_id = formData.get("user_id");
  const username = formData.get("username");
  const email = formData.get("email");
  const role = formData.get("role");
  const file = formData.get("avatar");
  let imagePath = formData.get("currentImage") || null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;

  }

  await connection.execute(
    "UPDATE users SET username = ?, email = ?, role = ?, avatar = ? WHERE user_id = ?",
    [username, email, role, imagePath, user_id]
  );

  revalidatePath('/admin/users')
}