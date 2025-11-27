'use client'

import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { useSidebar } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"

export default function LogOutButton () {
    const { state } = useSidebar()  

    function keluar () {
        signOut({
            callbackUrl: '/'
        });
        alert('Anda berhasil keluar.')
    }

    return (
        <Button 
            variant='destructive' 
            onClick={keluar} 
            className='w-full flex items-center justify-center gap-2 hover:bg-red-400'
        >
            <LogOut />
            {state !== "collapsed" && "Log Out"}
        </Button>
    )
}
