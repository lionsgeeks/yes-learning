import { usePage } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { type ReactNode } from "react";
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import AppSidebarLayout from "@/layouts/app/app-sidebar-layout";

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;

    const LayoutComponent = auth?.user?.role === "admin" ? AppSidebarLayout : AppHeaderLayout;

    return (
        <LayoutComponent breadcrumbs={breadcrumbs} {...props}>
            {children}
        </LayoutComponent>
    );
};
