'use client'

import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'
import { Banknote, Folder, HomeIcon, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TechnicianSideBar() {
  const pathname = usePathname()

  return (
    <nav className='grid items-start px-4 text-sm font-medium'>
      <Link
        className={clsx(
          'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
          {
            'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50':
              pathname === '/dashboard',
          },
        )}
        href='/dashboard'
      >
        <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
          <HomeIcon className='h-3 w-3' />
        </div>
        Home
      </Link>
      <Link
        className={clsx(
          'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
          {
            'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50':
              pathname === '/dashboard/users',
          },
        )}
        href='/dashboard/users'
      >
        <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
          <Users className='h-3 w-3' />
        </div>
        Farmer List
      </Link>
      <Separator className='my-3' />
      <Link
        className={clsx(
          'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
          {
            'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50':
              pathname === '/dashboard/settings',
          },
        )}
        href='/dashboard/settings'
        id='onboarding'
      >
        <div className='border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white'>
          <Settings className='h-3 w-3' />
        </div>
        Settings
      </Link>
    </nav>
  )
}
