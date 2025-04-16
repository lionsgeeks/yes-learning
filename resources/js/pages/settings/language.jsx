import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Head, useForm, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Monitor, Moon, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Password settings',
        href: '/settings/language',
    },
];

export default function Language({ className, props }) {
    const {auth} = usePage().props;

    const [lang, setLang] = useState(auth.user.language);

    const { post } = useForm()

    const tabs = [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'Français' },
        { value: 'ar', label: 'عربية' },
    ];


    const changeLanguage = (value) => {
        setLang(value)
        post(route('langugage.update', {
            language: value
        }))
    }



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Update Language" description="Change The Language" />

                    <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
                        {tabs.map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => changeLanguage(value)}
                                className={`
                                flex items-center rounded-md px-3.5 py-1.5 transition-colors cursor-pointer
                                ${lang === value
                                        ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                        : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60'
                                    }`}
                            >
                                <span className="ml-1.5 text-sm">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
