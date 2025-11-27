'use client'

import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function LogOutButton2 () { 

    function keluar () {
        signOut({
            callbackUrl: '/'   // setelah logout berpindah ke landing page
        });
        alert('Anda berhasil keluar.')
    }

    return (
        <Button 
            variant='destructive' 
            onClick={keluar} 
            className='flex items-center justify-center gap-2 hover:bg-red-400 w-fit'
        >
            <LogOut /> Keluar
        </Button>
    )
}
