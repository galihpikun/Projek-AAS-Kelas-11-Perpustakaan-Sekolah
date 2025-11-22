"use server"

import connection from "./db"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"
import path from "path"
import { writeFile } from "fs/promises"

export async function register(formData) {
    const username = formData.get("username")
    const email = formData.get("email")
    const password = bcrypt.hashSync(formData.get("password"), 10)

    await connection.execute('insert into users (username, email, password) values (?,?,?)', [username,email,password])

    redirect("/login")
}

export async function findUserByEmail(email) {
    const [user] = await connection.execute("select * from users where email = ?",[email])

    if(!user.length) return null

    return user[0]

}
export async function getAllUsers() {
    const [users] = await connection.execute("select * from users")
    const totalUsers = users.length

    return {users, totalUsers}
}
export async function addUser(formData) {
   const username = formData.get("username")
    const email = formData.get("email")
    const role = formData.get("role")
    const password = bcrypt.hashSync(formData.get("password"), 10)

    await connection.execute('insert into users (username, email, role, password) values (?,?,?,?)', [username,email,role,password])

    revalidatePath("/admin/users")
}
export async function fetchBooks() {
    const [books] = await connection.execute("select * from books")
    const totalBooks = books.length

    return {books, totalBooks}
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

  revalidatePath("/items");
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
  const [rows] = await connection.query("SELECT * FROM books WHERE id_buku = ?", [id]);
  return rows[0];
}