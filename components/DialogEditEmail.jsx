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
import { editEmail} from "@/lib/action";
import { fetchUserProfile } from "@/lib/fetchDashboard";


export async function DialogEditEmail() {
    const userData = await fetchUserProfile();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='bg-secondary2 hover:bg-accent2 hover:text-white text-white'>Edit</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Edit data user di sistem perpustakaan.
          </DialogDescription>
        </DialogHeader>

        <form action={editEmail} className="grid gap-4">
          

          <div className="grid gap-2">
            <Label htmlFor="email">Email User</Label>
            <Input
              id="email"
              name="email"
              defaultValue={userData.email}
              required
            />
          </div>

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
