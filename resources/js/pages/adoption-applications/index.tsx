import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface AdoptionApplicationsIndexProps {
    applications: {
        data: Array<{
            id: number;
            application_number: string;
            status: string;
            status_label: string;
            user?: {
                name: string;
                email: string;
            };
            child?: {
                name: string;
                age: number;
            };
            created_at: string;
            submitted_at: string | null;
            progress_percentage: {
                percentage: number;
                step: number;
                total: number;
            };
        }>;
        links: Array<{
            url: string | null;
            active: boolean;
            label: string;
        }>;
        meta: {
            from: number;
            to: number;
            total: number;
        };
    };
    isAdmin: boolean;
    [key: string]: unknown;
}

export default function AdoptionApplicationsIndex({ applications, isAdmin }: AdoptionApplicationsIndexProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft':
                return 'bg-gray-100 text-gray-800';
            case 'submitted':
                return 'bg-blue-100 text-blue-800';
            case 'document_review':
                return 'bg-yellow-100 text-yellow-800';
            case 'document_verified':
                return 'bg-indigo-100 text-indigo-800';
            case 'survey_scheduled':
            case 'survey_completed':
            case 'interview_scheduled':
            case 'interview_completed':
                return 'bg-purple-100 text-purple-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title={isAdmin ? 'Kelola Aplikasi Adopsi' : 'Aplikasi Adopsi Saya'} />
            <AppShell>
                <div className="p-6">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {isAdmin ? '📋 Kelola Aplikasi Adopsi' : '📋 Aplikasi Adopsi Saya'}
                            </h1>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                {isAdmin 
                                    ? 'Kelola semua aplikasi adopsi dari calon orang tua'
                                    : 'Pantau status dan kelola aplikasi adopsi Anda'
                                }
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            {!isAdmin && (
                                <Link
                                    href={route('adoption-applications.create')}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    ➕ Buat Aplikasi Baru
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                                                    No. Aplikasi
                                                </th>
                                                {isAdmin && (
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                        Pelamar
                                                    </th>
                                                )}
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Anak
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Progress
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                    Tanggal
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                                            {applications.data.map((application) => (
                                                <tr key={application.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                                        {application.application_number}
                                                    </td>
                                                    {isAdmin && (
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                            <div>
                                                                <div className="font-medium">{application.user?.name}</div>
                                                                <div className="text-xs">{application.user?.email}</div>
                                                            </div>
                                                        </td>
                                                    )}
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                        {application.child ? (
                                                            <div>
                                                                <div className="font-medium">{application.child.name}</div>
                                                                <div className="text-xs">{application.child.age} tahun</div>
                                                            </div>
                                                        ) : (
                                                            <span className="italic">Belum dipilih</span>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(application.status)}`}>
                                                            {application.status_label}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                        <div className="flex items-center">
                                                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                                                                <div 
                                                                    className="bg-blue-600 h-2 rounded-full" 
                                                                    style={{ width: `${application.progress_percentage.percentage}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-xs">
                                                                {application.progress_percentage.percentage}%
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            Step {application.progress_percentage.step} of {application.progress_percentage.total}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                        <div>
                                                            <div>{new Date(application.created_at).toLocaleDateString('id-ID')}</div>
                                                            {application.submitted_at && (
                                                                <div className="text-xs">
                                                                    Submit: {new Date(application.submitted_at).toLocaleDateString('id-ID')}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <Link
                                                            href={route('adoption-applications.show', application.id)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            Detail
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {applications.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                {isAdmin ? 'Belum ada aplikasi' : 'Belum ada aplikasi adopsi'}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {isAdmin 
                                    ? 'Aplikasi adopsi yang diajukan akan muncul di sini.'
                                    : 'Mulai dengan membuat aplikasi adopsi pertama Anda.'
                                }
                            </p>
                            {!isAdmin && (
                                <div className="mt-6">
                                    <Link
                                        href={route('adoption-applications.create')}
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        ➕ Buat Aplikasi Pertama
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {applications.links && applications.links.length > 3 && (
                        <div className="mt-6 flex justify-between items-center">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing {applications.meta.from} to {applications.meta.to} of {applications.meta.total} results
                            </div>
                            <div className="flex space-x-2">
                                {applications.links.map((link: { url: string | null; active: boolean; label: string }, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 text-sm rounded-md ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                        }`}
                                        preserveState
                                        preserveScroll
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </AppShell>
        </>
    );
}