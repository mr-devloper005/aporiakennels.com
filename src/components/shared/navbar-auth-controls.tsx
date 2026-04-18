'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="hidden h-10 gap-1 rounded-full bg-[#AE2448] px-4 text-white shadow-[0_16px_30px_rgba(174,36,72,0.24)] hover:bg-[#8e1b3b] sm:flex">
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)]">
          {SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 rounded-full border border-[#e8dfd4] bg-[#fffefb] py-1 pl-1 pr-2 sm:pr-3">
          <Avatar className="h-9 w-9 border border-[#ebe3d7]">
            <AvatarImage src={user?.avatar} alt={user?.name ?? 'Profile'} />
            <AvatarFallback className="bg-[#f3ebe2] text-sm font-semibold text-[#3d291c]">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="hidden min-w-0 max-w-[140px] sm:block">
            <p className="truncate text-xs font-semibold text-[#3d291c]">{user?.name}</p>
            <p className="truncate text-[10px] text-[#6a5548]">{user?.email}</p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => logout()}
          className="shrink-0 gap-2 rounded-full border-[#e8dfd4] bg-white text-[#3d291c] hover:bg-[#fff5eb]"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </>
  )
}
