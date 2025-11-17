"use server"

import connection from "./db"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"

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