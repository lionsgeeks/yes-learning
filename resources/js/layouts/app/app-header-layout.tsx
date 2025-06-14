import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import TransText from '@/components/TransText';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const sponsors = ['kamlin.jpeg', 'lionsgeek.png', 'iecd.png', 'mediterranée.jpg'];
    const organized = ['Jadaralogo.png', 'pan.jpeg'];

    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
            <footer className="mt-12 w-full border-t border-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-4 flex items-center md:mb-0">
                            <img src="/assets/images/yes-learning.png" width="150" height="40" alt="Yes Learning Logo" className="mr-2" />
                        </div>

                        <div className="flex gap-4">
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/company/yes-summit-africa/"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <span className="sr-only">linkedin</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-linkedin"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                </svg>
                            </a>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/yes_summit_africa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <span className="sr-only">Instagram</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            <TransText
                                en="Empowering NGOs across Africa through education and capacity building."
                                fr="Autonomiser les ONG à travers l'Afrique par l'éducation et le renforcement des capacités."
                                ar="تمكين المنظمات غير الحكومية عبر أفريقيا من خلال التعليم وبناء القدرات."
                            />{' '}
                            <TransText
                                en="By Jadara Foundation and the Pan-African Youth Union."
                                fr="Par la Fondation Jadara et l'Union Panafricaine de la Jeunesse."
                                ar="بواسطة مؤسسة جدارة والاتحاد الإفريقي للشباب."
                            />
                        </p>
                    </div>
                    <div className='flex justify-evenly lg:flex-row flex-col gap-10'>
                        <div className="mt-12 flex flex-col items-center justify-center">
                            <h2 className="mb-4 text-center text-lg font-semibold text-gray-700">
                                <TransText en="Co-Organized" fr="Co-Organized" ar="تم تنظيمه بالتعاون بين" />
                            </h2>
                            <div className="grid grid-cols-2 items-center justify-items-center gap-4 px-4">
                                {organized.map((filename, index) => (
                                    <img
                                        key={index}
                                        src={`/assets/images/sponsors/${filename}`}
                                        alt={`Sponsor ${index + 1}`}
                                        className="w-15 object-contain transition hover:grayscale-0"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 flex flex-col items-center justify-center">
                            <h2 className="mb-4 text-center text-lg font-semibold text-gray-700">
                                <TransText en="Co-Produced" fr="Co-Produced" ar="تم إنتاجه بالتعاون مع" />
                            </h2>
                            <div className="grid grid-cols-4 items-center justify-items-center gap-6 px-4">
                                {sponsors.map((filename, index) => (
                                    <img
                                        key={index}
                                        src={`/assets/images/sponsors/${filename}`}
                                        alt={`Sponsor ${index + 1}`}
                                        className="w-15 object-contain transition hover:grayscale-0"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
                        <a href="https://youthempowermentsummit.africa/contact" className="hover:underline">
                            <TransText en="Contact Us" fr="Contactez-nous" ar="اتصل بنا" />
                        </a>
                    </div>

                    <div className="mt-4 text-center text-xs text-gray-400">
                        <p>
                            © {new Date().getFullYear()} Yes Learning.{' '}
                            <TransText en="All Rights Reserved" fr="Tous Droits Réservés" ar="جميع الحقوق محفوظة" />
                        </p>
                    </div>
                </div>
            </footer>
        </AppShell>
    );
}
