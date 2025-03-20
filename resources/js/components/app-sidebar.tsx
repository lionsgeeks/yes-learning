import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Award, BadgeCheck, BookAIcon, BookOpen, Folder, LayoutGrid, LibraryBig } from 'lucide-react';
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
        title: 'Achivement',
        url: '/achivement',
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
    {
        title: 'Quiz Components',
        url: '/admin/quiz',
        icon: LayoutGrid
    }

];



export function AppSidebar() {

    const { auth } = usePage<SharedData>().props;



    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={auth.user.role == "admin" ? adminItems : userItem} />
            </SidebarContent>


            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
