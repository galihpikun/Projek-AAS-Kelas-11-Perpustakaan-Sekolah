import Navbar from "@/components/NavBar";
import { Calendar, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default async function Profile() {
  return (
    <div className="flex flex-col w-full h-full items-center px-30">
      <Navbar></Navbar>
      <section className="w-full rounded-2xl h-[200px] bg-linear-65 from-[#C89F68] to-[#A57744] mt-30 text-white flex justify-between px-5 items-center gap-4 shadow-lg shadow-orange-300/50">
        <div className="flex gap-5 items-center">
          <img
            src="/images/profile.png"
            alt="Avatar Profile"
            className="w-35 h-35"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">Username</h1>
            <h1 className="text-lg">Email@gmail.com</h1>
            <h1 className="flex gap-2 items-center">
              <Calendar size={25}></Calendar> Bergabung Sejak{" "}
              <strong>2025-03-08</strong>
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center text-center">
          <h1>Id Member :</h1>
          <h1 className="font-semibold text-lg">12</h1>
        </div>
      </section>

      <section className="flex flex-col shadow-xl w-10/12 rounded-2xl p-10 gap-5">
        <h1 className="text-2xl font-semibold">Informasi Profil</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <img
              src="/images/profile.png"
              alt="Avatar Profile"
              className="w-35 h-35"
            />
            <Button>Ubah Profil</Button>
          </div>
          <div className="flex flex-col gap-5 w-1/3">
            <div className="gap-1 flex flex-col">
              <Label>Username</Label>
              <div className="flex gap-5">
                <Input></Input>
                <Button>Edit</Button>
              </div>
            </div>
            <div className="gap-1 flex flex-col">
              <Label>Email</Label>

              <div className="flex gap-5">
                <Input></Input>
                <Button>Edit</Button>
              </div>
            </div>
          </div>
        </div>
        <h1 className="font-medium text-lg">Password</h1>
        <Button className='w-fit px-5'>Ganti Password</Button>
      </section>

      <section className="bg-red-200 border-dashed text-red-600 border-2 gap-2 flex flex-col border-red-600 w-full mt-20 p-5 rounded-2xl">
        <h1 className="text-xl font-semibold">Zona Berbahaya</h1>
        <h1>Tindakan ini tidak dapat diundurkan, Berhati hati</h1>
        <Button variant='destructive' className='w-fit px-5'><Trash></Trash> Hapus Akun</Button>
      </section>
    </div>
  );
}
