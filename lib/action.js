"use server"

import connection from "./db"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"

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

  await connection.execute(
    "INSERT INTO books (nama_buku, genre_buku, author) VALUES (?, ?, ?)",
    [nama_buku, genre, author]
  );

  revalidatePath("/admin/books");
}