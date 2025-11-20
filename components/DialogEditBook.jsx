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
import { editBook } from "@/lib/action";
import { useState } from "react";

export function DialogEditBook({ book }) {
  const [preview, setPreview] = useState(book.gambar || null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Edit data buku di sistem perpustakaan.
          </DialogDescription>
        </DialogHeader>

        <form action={editBook} className="grid gap-4">
          {/* ID BUKU (HIDDEN) */}
          <input
            type="hidden"
            name="id_buku"
            value={book.id_buku}
          />

          {/* CURRENT IMAGE (HIDDEN) */}
          <input
            type="hidden"
            name="currentImage"
            value={book.gambar}
          />

          {/* NAMA BUKU */}
          <div className="grid gap-2">
            <Label htmlFor="nama_buku">Nama Buku</Label>
            <Input
              id="nama_buku"
              name="nama_buku"
              defaultValue={book.nama_buku}
              required
            />
          </div>

          {/* GENRE */}
          <div className="grid gap-2">
            <Label htmlFor="genre">Genre</Label>
            <select
              id="genre"
              name="genre"
              defaultValue={book.genre_buku}
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
              defaultValue={book.author}
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
