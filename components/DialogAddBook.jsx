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
import { addBook } from "@/lib/action";
import { useState } from "react";


export function DialogAddBook() {
  const [preview, setPreview] = useState(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='bg-secondary2 text-white hover:bg-accent2 hover:text-white'>Add A Book</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Book</DialogTitle>
          <DialogDescription>
            Tambahkan buku baru ke sistem perpustakaan.
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form
          action={addBook}
          className="grid gap-4"
        >
          {/* NAMA BUKU */}
          <div className="grid gap-2">
            <Label htmlFor="nama_buku">Nama Buku</Label>
            <Input
              id="nama_buku"
              name="nama_buku"
              placeholder="Masukkan nama buku..."
              required
            />
          </div>

          {/* GENRE */}
          <div className="grid gap-2">
            <Label htmlFor="genre">Genre</Label>
            <select
              id="genre"
              name="genre"
              className="border p-2 rounded-md"
              required
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Education">Education</option>
              <option value="Religion">Religion</option>
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
              <option value="Business">Business</option>
              <option value="History">History</option>
            </select>
          </div>

          {/* AUTHOR */}
          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              placeholder="Masukkan nama author..."
              required
            />
          </div>

          {/* THUMBNAIL */}
          <div className="grid gap-2">
            <Label htmlFor="image">Thumbnail</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>

          {/* PREVIEW */}
          {preview && (
            <img
              alt="Preview"
              src={preview}
              className="w-20 h-auto object-cover rounded-md"
            />
          )}

          {/* HIDDEN: currentImage (wajib biar backend ga error) */}
          <input type="hidden" name="currentImage" value="" />

          {/* FOOTER */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            
            <DialogClose asChild>
            <Button type="submit">Add Book</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
