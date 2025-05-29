import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Award, BadgeCheck, BookAIcon, BookOpen, Building2, Folder, LayoutGrid, LibraryBig, MailPlus, Workflow } from 'lucide-react';
import AppLogo from './app-logo';

const userItem: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Courses',
        url: '/course',
        icon: BookOpen,
    },
    {
        title: 'Achievement',
        url: '/achievement',
        icon: Award,
    },
    {
        title: 'Library',
        url: '/library',
        icon: LibraryBig,
    },
];

const adminItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: LayoutGrid,
    },
    // {
    //     title: 'Quiz Components',
    //     url: '/admin/quiz',
    //     icon: LayoutGrid
    // },
    {
        title: 'Ngos',
        url: '/admin/ngos',
        icon: Building2,
    },
    {
        title: 'Courses',
        url: '/admin/courses',
        icon: BookOpen,
    },
    {
        title: 'Workshops',
        url: '/admin/workshops',
        icon: Workflow,
    },
    {
        title: 'Libraries',
        url: '/admin/libraries',
        icon: LibraryBig,
    },
    {
        title: 'Newsletter',
        url: '/admin/newsletter',
        icon: MailPlus,
    },

];



export function AppSidebar() {

    const { auth } = usePage<SharedData>().props;



    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-beta/10">
            <SidebarHeader className='bg-beta/10'>
                <SidebarMenu className=''>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className='bg-beta/10'>
                <NavMain items={auth.user.role == "admin" ? adminItems : userItem} />
            </SidebarContent>


            <SidebarFooter className='bg-beta/10'>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
