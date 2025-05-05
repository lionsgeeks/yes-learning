import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import TransText from "@/components/TransText"

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {

    const sponsors = [
        'Africa_50.jpg',
        'cnuced.jpeg',
        'iom.jpeg',
        'Jadaralogo.png',
        'oit.jpeg',
        'onusida.jpeg',
        'pan.jpeg',
        'unfpa.jpeg',
        'kamlin.jpeg',
        'lionsgeek.png',
        'iecd.png',
    ];

    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
            <footer className="w-full border-t border-gray-100 py-8 mt-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img
                                src="/assets/images/yes-learning.png"
                                width="150"
                                height="40"
                                alt="Yes Learning Logo"
                                className="mr-2"
                            />
                        </div>

                        <div className="flex gap-4">
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <span className="sr-only">Twitter</span>
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
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <span className="sr-only">Facebook</span>
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
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
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
                        <p className="text-gray-600 text-sm">
                            <TransText
                                en="Empowering NGOs across Africa through education and capacity building."
                                fr="Autonomiser les ONG à travers l'Afrique par l'éducation et le renforcement des capacités."
                                ar="تمكين المنظمات غير الحكومية عبر أفريقيا من خلال التعليم وبناء القدرات."
                            />{" "}
                            <TransText
                                en="By Jadara Foundation and the Pan-African Youth Union."
                                fr="Par la Fondation Jadara et l'Union Panafricaine de la Jeunesse."
                                ar="بواسطة مؤسسة جدارة والاتحاد الإفريقي للشباب."
                            />
                        </p>
                    </div>
                    <div className="mt-12">
                        <h2 className="text-center text-gray-700 font-semibold text-lg mb-4">
                            <TransText
                                en="Our Partners"
                                fr="Nos Partenaires"
                                ar="شركاؤنا"
                            />
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center items-center px-4">
                            {sponsors.map((filename, index) => (
                                <img
                                    key={index}
                                    src={`/assets/images/sponsors/${filename}`}
                                    alt={`Sponsor ${index + 1}`}
                                    className="h-12 w-auto object-contain  hover:grayscale-0 transition"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:underline">
                            <TransText en="Contact Us" fr="Contactez-nous" ar="اتصل بنا" />
                        </a>
                    </div>

                    <div className="mt-4 text-center text-xs text-gray-400">
                        <p>
                            © {new Date().getFullYear()} Yes Learning.{" "}
                            <TransText en="All Rights Reserved" fr="Tous Droits Réservés" ar="جميع الحقوق محفوظة" />
                        </p>
                    </div>
                </div>
            </footer>
        </AppShell>
    );
}
