import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { signOut } from "next-auth/react"
import { AppSidebar } from "@/components/app-sidebar"


export default async function dashboard () {
    const session = await getServerSession(authOptions)

    console.log(session)

    const user = session?.user
    return (
        <main className="flex flex-col justify-center items-center h-screen w-screen">
            <div className="flex-col flex gap-2">
                <span>Welcome back! user ke {user.id} bernama {user.name} dengan email {user.email} (role: {user.role})</span>
                
                
            </div>

        </main>
    )
}

