import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addUser } from "@/lib/action";

export function DialogAddUser() {
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Add A User</Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Add a user</DialogTitle>
      <DialogDescription>
        Tambahkan user baru ke sistem perpustakaan.
      </DialogDescription>
    </DialogHeader>

    <form action={addUser} className="grid gap-4">

      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Masukkan username"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Masukkan email"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          name="role"
          className="border p-2 rounded-md"
          required
        >
          <option value="siswa">Siswa</option>
          <option value="petugas">Petugas</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Masukkan password"
          required
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className="mr-2">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
        <Button type="submit">Add User</Button>
        </DialogClose>
      </DialogFooter>

    </form>

  </DialogContent>
</Dialog>

  );
}
