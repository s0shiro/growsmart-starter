// import { Profile } from '@/components/Profile'
import ToggleThemeButton from '@/components/MyComponents/shadcn/ToggleThemeButton'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { HomeIcon, Settings, Users } from 'lucide-react'
import Link from 'next/link'

export default function AdminNavBar() {
  return (
    <header className='flex h-14 lg:h-[55px] items-center gap-4 border-b px-3'>
      <Dialog>
        <SheetTrigger className='min-[1024px]:hidden p-2 transition'>
          <HamburgerMenuIcon />
          <Link href='/dashboard'>
            <span className='sr-only'>Home</span>
          </Link>
        </SheetTrigger>
        <SheetContent side='left'>
          <SheetHeader>
            <Link href='/'>
              <SheetTitle>GrowSmart</SheetTitle>
            </Link>
          </SheetHeader>

          <div className='flex flex-col space-y-3 mt-[1rem]'>
            <DialogClose asChild>
              <Link href='/dashboard'>
                <Button variant='outline' className='w-full'>
                  <HomeIcon className='mr-2 h-4 w-4' />
                  Dashboard
                </Button>
              </Link>
            </DialogClose>

            <DialogClose asChild>
              <Link href='/dashboard/users'>
                <Button variant='outline' className='w-full'>
                  <Users className='mr-2 h-4 w-4' />
                  Users
                </Button>
              </Link>
            </DialogClose>

            <Separator className='my-3' />
            <DialogClose asChild>
              <Link href='/dashboard/settings'>
                <Button variant='outline' className='w-full'>
                  <Settings className='mr-2 h-4 w-4' />
                  Settings
                </Button>
              </Link>
            </DialogClose>
          </div>
        </SheetContent>
      </Dialog>
      <div className='flex justify-center items-center gap-2 ml-auto'>
        {/* <Profile /> */}
        <ToggleThemeButton />
      </div>
    </header>
  )
}
