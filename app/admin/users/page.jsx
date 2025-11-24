import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser, getAllUsers } from "@/lib/action";
import { DialogAddUser } from "@/components/DialogAddUser";
import { DialogEditUser } from "@/components/DialogEditUser";
import { User, UserStar, Users } from "lucide-react";
import { fetchUsersCount } from "@/lib/fetchDashboard";


export default async function users() {
  const { users, totalUsers } = await getAllUsers();
  const {userAdmin, userSiswa} = await fetchUsersCount();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
              <BreadcrumbItem>Admin</BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Users</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DialogAddUser></DialogAddUser>
        </header>
        <div className="flex flex-col gap-4 p-4 bg-primary2 h-full">
          <section className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <Users
                size={50}
                className="p-2 bg-blue-100 rounded-md text-blue-500"
              />
              <div>
                <div className="text-sm text-slate-400">Total Users</div>
                <div className="text-2xl font-semibold mt-2">
                  {totalUsers}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <UserStar
                size={50}
                className="p-2 bg-amber-100  rounded-md text-amber-500"
              />
              <div>
                <div className="text-sm text-slate-400">Users Petugas</div>
                <div className="text-2xl font-semibold mt-2">
                  {userAdmin}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <User
                size={50}
                className="p-2 bg-green-100 rounded-md text-green-500"
              />
              <div>
                <div className="text-sm text-slate-400">Users Siswa</div>
                <div className="text-2xl font-semibold mt-2">
                  {userSiswa}
                </div>
              </div>
            </div>
            
          </section>

          <div className="p-5 shadow-2xl rounded-xl w-full bg-white">
            <Table>
              <TableCaption>
                List akun yang terdafatar di <strong>Perpus.</strong>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">
                    ID Akun
                  </TableHead>
                  <TableHead className="text-center">Avatar</TableHead>
                  <TableHead className="text-center">Username</TableHead>
                  <TableHead className="text-center">Email</TableHead>
                  <TableHead className="text-center">Role</TableHead>
                  <TableHead className="text-center">Interaksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell className="font-medium text-center">
                      {user.user_id}
                    </TableCell>
                    <TableCell className="flex justify-center items-center">
                      <img
                        src={user.avatar || "/images/profile.png"}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {user.username}
                    </TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell
                      className={`text-center w-fit h-fit font-bold ${
                        user.role === "petugas"
                          ? "text-red-700"
                          : "text-blue-700"
                      }`}>
                      {user.role}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      <div className="flex justify-center gap-4">
                        <form action={deleteUser}>
                          <input type="hidden" value={user.user_id} name="id" />
                          <button className="bg-red-500 text-white px-2 py-2 rounded-md">
                            Hapus
                          </button>
                        </form>

                        <DialogEditUser user={user} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
