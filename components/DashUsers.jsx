import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usersBorrowCount } from "@/lib/fetchDashboard"


export async function TableUsers() {
    const datas = await usersBorrowCount();
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
        <Table className=''>
      <TableCaption>List Pengguna dan berapa jumlah buku yang pernah mereka <strong>pinjam</strong>.</TableCaption>
      <TableHeader>
        <TableRow className='text-center'>
          <TableHead className="text-center">User Id</TableHead>
          <TableHead className="text-center">Username</TableHead>
          <TableHead className='text-center'>Jumlah Buku DIpinjam</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((data) => (
          <TableRow key={data.user_id} className='text-center'>
            <TableCell>{data.user_id}</TableCell>
            <TableCell className="flex items-center justify-center gap-5"><img src={data.avatar || "/images/profile.png"} alt="" className="w-10 h-10 rounded-full" /><div className="flex flex-col justify-start"><p>{data.username}</p><p>{data.email}</p></div></TableCell>
            <TableCell>{data.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
