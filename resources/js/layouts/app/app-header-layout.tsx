import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import TransText from "@/components/TransText"


export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
            <footer className="bg-transparent text-black text-center py-4 mt-8">
                <p className="text-sm">
                    <TransText
                        en="Empowering NGOs across Africa through education and capacity building. By Jadara Foundation and the Pan-African Youth Union."
                        fr="Renforcer les ONG à travers l'Afrique grâce à l'éducation et au renforcement des capacités. Par la Fondation Jadara et l'Union Panafricaine de la Jeunesse."
                        ar=" تمكين المنظمات غير الحكومية عبر أفريقيا من خلال التعليم وبناء القدرات. بواسطة مؤسسة جدارة والاتحاد الإفريقي للشباب."
                    />
                </p>
            </footer>
        </AppShell>
    );
}
