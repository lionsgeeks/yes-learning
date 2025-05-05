import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import africa_50 from '@/assets/africa_50.png';

const NGOsTable = () => {
    const { ngos } = usePage().props;
    // console.log(ngos); 
    const handleInvite = (ngo) => {
        axios.post('http://192.168.100.136:8000/api/register/participant', { name: ngo.name, email: ngo.email, role: 'ngo' })
            .then((response) => {
                console.log(response.data);
                alert(`Invite sent to ${ngo.name}`);
            })
            .catch((error) => {
                console.error(error);
                alert('Error sending invite. Please try again.');
            });
        console.log(`Invite sent to ${ngo.name}`);
        alert(`Invite sent to ${ngo.name}`);
    };
    
    const goToPage = (page) => {
        router.get('/admin/ngos', { page }, {
          preserveScroll: true,
          preserveState: true,
        })
      }
    return (
        <AppLayout>
            <Head title="Ngo's" />
            <div className="p-6">
                <h1 className="mb-4 text-xl font-bold">NGOs List</h1>
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                            <TableBody>
                            {ngos?.data.map((ngo) => (
                                <TableRow key={ngo.id}>
                                    <TableCell>{ngo.name}</TableCell>
                                    <TableCell>{ngo.email}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleInvite(ngo)}>Invite to App</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="w-full flex justify-between items-center mt-4 bg-gray-100 p-4 rounded-md">
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
