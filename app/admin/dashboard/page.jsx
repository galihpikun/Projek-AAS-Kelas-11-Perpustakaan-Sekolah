import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Users, Book, Library } from "lucide-react"
import { getAllUsers, fetchBooks } from "@/lib/action"
import { fetchBorrowsAdmin } from "@/lib/action"
import { ChartAreaDefault } from "@/components/ChartWeek"
import { fetchBorrowsGenre, fetchBorrowsWeek } from "@/lib/fetchDashboard"
import { ChartPieSimple } from "@/components/PieGenre"

export default async function dashboard() {
  const { totalUsers } = await getAllUsers();
  const { totalBooks } = await fetchBooks();
  const { totalBorrows } = await fetchBorrowsAdmin();
  const data = await fetchBorrowsWeek();
  const genre = await fetchBorrowsGenre();

  const formatted = data.map((item) => ({
    day: new Date(item.day).toLocaleDateString("en-US", { weekday: "short" }),
    total: item.total,
  }));

  const session = await getServerSession(authOptions)
  
      console.log(session)
  
      const user = session?.user
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-primary2">
          <h1>Welcome back! user ke {user.id} bernama {user.name} dengan email {user.email} (role: {user.role})</h1>
          <section className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <Users
                size={50}
                className="p-2 bg-blue-100 rounded-md text-blue-500"
              />
              <div>
                <div className="text-sm text-slate-400">Total Users</div>
                <div className="text-2xl font-semibold mt-2">{totalUsers}</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <Book
                size={50}
                className="p-2 bg-amber-100  rounded-md text-amber-500"
              />
              <div>
                <div className="text-sm text-slate-400">Total Buku</div>
                <div className="text-2xl font-semibold mt-2">{totalBooks}</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <Book
                size={50}
                className="p-2 bg-green-100 rounded-md text-green-500"
              />
              <div>
                <div className="text-sm text-slate-400">Total Peminjaman</div>
                <div className="text-2xl font-semibold mt-2">{totalBorrows}</div>
              </div>
            </div>
          </section>
          <section className="flex gap-5 items-center w-full">
            <ChartAreaDefault data={formatted}></ChartAreaDefault>
          </section>
          <section className="grid grid-cols-2">
            <ChartPieSimple genre={genre}></ChartPieSimple>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
