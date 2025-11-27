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
import { editAvatar } from "@/lib/action";
import { useState } from "react";

export function DialogUpdateAvatar() {
  const [preview, setPreview] = useState(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-secondary2 text-white hover:bg-accent2 hover:text-white">
          Update Profile Picture
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Avatar</DialogTitle>
          <DialogDescription>Ubah avatar user.</DialogDescription>
        </DialogHeader>

     
        <form action={editAvatar} className="grid gap-4">

          <div className="grid gap-2">
            <Label htmlFor="image">Avatar Baru</Label>
            <Input
              id="image"
              name="avatar"
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          {preview && (
            <img
              alt="Preview"
              src={preview}
              className="w-24 h-24 object-cover rounded-full border shadow"
            />
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save Avatar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
