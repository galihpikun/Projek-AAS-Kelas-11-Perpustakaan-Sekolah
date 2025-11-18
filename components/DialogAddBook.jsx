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

export function DialogAddBook() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add A Book</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Book</DialogTitle>
          <DialogDescription>
            Tambahkan buku baru ke sistem perpustakaan.
          </DialogDescription>
        </DialogHeader>

        <form action={addBook} className="grid gap-4">

          <div className="grid gap-2">
            <Label htmlFor="nama_buku">Nama Buku</Label>
            <Input
              id="nama_buku"
              name="nama_buku"
              placeholder="Masukkan nama buku..."
              required
            />
          </div>

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

          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              placeholder="Masukkan nama author..."
              required
            />
          </div>


          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Book</Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}
