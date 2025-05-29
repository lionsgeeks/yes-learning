import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import { UserInfo } from '@/components/user-info';
import { Eye } from 'lucide-react';



const breadcrumbs = [
    {
        title: 'Users',
        href: '/users',
    },
];

const NGOsTable = () => {

    const { ngos } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const { post, data, setData } = useForm();
    console.log(ngos);

    const handleInvite = (ngo) => {
        axios
            .post('http://192.168.100.136:8000/api/register/participant', { name: ngo.name, email: ngo.email, role: 'ngo' })
            .then((response) => {
                console.log(response.status);
                // alert(`Invite sent to ${ngo.name}`);
                if (response.status === 200) {
                    post(`ngos/${ngo.id}/invite`);
                    toast(`Invite sent to ${ngo.name}`, {
                        style: {
                            backgroundColor: 'var(--green-bg)',
                            color: 'var(--green-text)',
                            border: '1px solid var(--green-border)',
                        },
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                // alert('Error sending invite. Please try again.');
                toast('Error sending invite. Please try again.', {
                    style: {
                        backgroundColor: 'var(--red-bg)',
                        color: 'var(--red-text)',
                        border: '1px solid var(--red-border)',
                    },
                });
            });
    };

    const goToPage = (page) => {
        router.get(
            '/admin/ngos',
            { page },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const filteredNgos = ngos?.data.filter((ngo) => ngo.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-4 text-xl font-bold">Users List</h1>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w- rounded-md border border-gray-300 p-2"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredNgos.map((ngo) => (
                                <TableRow key={ngo.id}>
                                    <TableCell>
                                        <a href={`/admin/ngos/${ngo.id}`} className="text-alpha hover:underline">
                                            {ngo.name}
                                        </a>
                                    </TableCell>
                                    <TableCell>{ngo.email}</TableCell>
                                    <TableCell>
                                        {ngo.invitedToApp ? (
                                            <Button className="bg-green-500" disabled>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 00-2 0v4.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 9.586V5z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Invited
                                            </Button>
                                        ) : (
                                            <Button onClick={() => handleInvite(ngo)}>Invite to App</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> */}
                    {
                        filteredNgos.map((ngo, index) => (
                            <div key={index} className='p-2 relative flex flex-col items-center gap-y-5 shadow space-y-2 border-l-2 border-alpha rounded'

                            >
                                <button
                                    className='text-alpha/80 cursor-pointer absolute top-[3%] right-[3%]'
                                    onClick={() => { router.visit('ngos/' + ngo.id) }}
                                >
                                    <Eye />
                                </button>
                                <UserInfo user={ngo} />
                                {/* <p><span className='font-semibold text-alpha'>Name:</span> {ngo.name}</p> */}
                                {/* <p><span className='font-semibold text-alpha'>Email:</span> {ngo.email}</p> */}
                                {/* <p><span className='font-semibold text-alpha'>Selected Language:</span> {ngo.language == 'en' ? 'English' : ngo.language == "ar" ? 'Arabic' : 'French'}</p> */}
                                {/* <p><span className='font-semibold text-alpha'>Sign-up Date:</span> {new Date(ngo.created_at).toLocaleString()}</p> */}

                                {ngo.invitedToApp ? (
                                    <Button className="bg-green-500" disabled>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 00-2 0v4.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 9.586V5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Invited
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleInvite(ngo)}>Invite to App</Button>
                                )}


                            </div>
                        ))
                    }
                </div>
                <div className="mt-4 flex w-full items-center justify-between rounded-md bg-gray-100 p-4">
                    <Button disabled={!ngos.prev_page_url} onClick={() => goToPage(ngos.current_page - 1)}>
                        Previous
                    </Button>

                    <span>
                        Page {ngos.current_page} of {ngos.last_page}
                    </span>

                    <Button disabled={!ngos.next_page_url} onClick={() => goToPage(ngos.current_page + 1)}>
                        Next
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
};

export default NGOsTable;
