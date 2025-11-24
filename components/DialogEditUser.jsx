"use client";

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
import { editProfileAdmin, editUser } from "@/lib/action";
import { useState } from "react";

export function DialogEditUser({ user }) {
  const [preview, setPreview] = useState(user.avatar || null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Edit data user di sistem perpustakaan.
          </DialogDescription>
        </DialogHeader>

        <form action={editProfileAdmin} className="grid gap-4">
          <input type="hidden" name="user_id" value={user.user_id} />

          <input type="hidden" name="currentImage" value={user.avatar || ""} />

          <div className="grid gap-2">
            <Label htmlFor="nama_buku">Nama User</Label>
            <Input
              id="username"
              name="username"
              defaultValue={user.username}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="genre">Email</Label>
            <Input id="email" name="email" defaultValue={user.email} required />
          </div>

          
          <div className="grid gap-2">
            <Label htmlFor="author">Role</Label>
            <select
              id="role"
              name="role"
              defaultValue={user.role}
              className="border p-2 rounded-md"
              required>
              <option value="siswa">Siswa</option>
              <option value="petugas">Petugas</option>
            </select>
          </div>

       
          <div className="grid gap-2">
            <Label htmlFor="image">Avatar</Label>
            <Input
              id="image"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>

          
          {preview && (
            <img
              alt="Preview"
              src={preview}
              className="w-20 h-auto object-cover rounded-md"
            />
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
