import Link from 'next/link'
import AdminSideBar from './(RoleBaseSideBar)/AdminSideBar'
import TechnicianSideBar from './(RoleBaseSideBar)/TechnicianSideBar'
import FarmerSideBar from './(RoleBaseSideBar)/FarmerSideBar'
import { UserRole } from './DashboardNavBar'

function DashboardSideBar() {
  const role: UserRole = 'admin'

  const roleComponentMap = {
    admin: <AdminSideBar />,
    technician: <TechnicianSideBar />,
    farmer: <FarmerSideBar />,
  }

  return (
    <div className='lg:block hidden border-r h-full'>
      <div className='flex h-full max-h-screen flex-col gap-2 '>
        <div className='flex h-[55px] items-center justify-between border-b px-3 w-full'>
          <Link className='flex items-center gap-2 font-semibold ml-1' href='/'>
            <span className=''>GrowSmart</span>
          </Link>
        </div>
        <div className='flex-1 overflow-auto py-2'>
          {roleComponentMap[role]}
        </div>
      </div>
    </div>
  )
}

export default DashboardSideBar
