import { AppShell } from '@/components/app-shell';
import { Head, Link, usePage } from '@inertiajs/react';

interface DashboardProps {
    stats: {
        total_applications?: number;
        pending_review?: number;
        approved_applications?: number;
        total_children?: number;
        available_children?: number;
        total_applicants?: number;
        my_applications?: number;
        pending_applications?: number;
    };
    recentApplications?: Array<{
        id: number;
        application_number: string;
        status: string;
        user?: { name: string };
        created_at: string;
    }>;
    myApplications?: Array<{
        id: number;
        application_number: string;
        status: string;
        child?: { name: string } | null;
        created_at: string;
    }>;
    availableChildren?: Array<{
        id: number;
        name: string;
        age: number;
        gender: 'male' | 'female';
    }>;
    [key: string]: unknown;
}

export default function Dashboard({
    stats,
    recentApplications = [],
    myApplications = [],
    availableChildren = [],
}: DashboardProps) {
    const { auth } = usePage<{ auth: { user: { role: string; name: string } } }>().props;
    const isAdmin = auth.user.role === 'admin';

    if (isAdmin) {
        return (
            <>
                <Head title="Admin Dashboard" />
                <AppShell>
                    <div className="p-6">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                📊 Dashboard Admin
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Kelola aplikasi adopsi dan pantau statistik sistem
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                                            📝
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            Total Aplikasi
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stats.total_applications || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-md flex items-center justify-center">
                                            ⏳
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            Menunggu Review
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stats.pending_review || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center">
                                            ✅
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            Disetujui
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stats.approved_applications || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-md flex items-center justify-center">
                                            👶
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            Total Anak
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stats.total_children || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-md flex items-center justify-center">
                                            🏠
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            Anak Tersedia
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stats.available_children || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-md flex items-center justify-center">
                                            👥
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            Total Pelamar
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stats.total_applicants || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <Link
                                href={route('adoption-applications.index')}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors duration-200"
                            >
                                📝 Kelola Aplikasi
                            </Link>
                            <Link
                                href={route('children.index')}
                                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-colors duration-200"
                            >
                                👶 Kelola Data Anak
                            </Link>
                            <Link
                                href={route('children.create')}
                                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors duration-200"
                            >
                                ➕ Tambah Anak
                            </Link>
                            <Link
                                href="#"
                                className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-lg text-center transition-colors duration-200"
                            >
                                📊 Laporan
                            </Link>
                        </div>

                        {/* Recent Applications */}
                        {recentApplications.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        📋 Aplikasi Terbaru
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {recentApplications.map((application) => (
                                            <div
                                                key={application.id}
                                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {application.application_number}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {application.user?.name}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {application.status}
                                                    </span>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {new Date(application.created_at).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </AppShell>
            </>
        );
    }

    // Applicant Dashboard
    return (
        <>
            <Head title="Dashboard Pelamar" />
            <AppShell>
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🏠 Dashboard Pelamar
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Selamat datang, {auth.user.name}! Kelola aplikasi adopsi Anda di sini.
                        </p>
                    </div>

                    {/* Stats for Applicant */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                                        📝
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        Aplikasi Saya
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.my_applications || 0}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-md flex items-center justify-center">
                                        ⏳
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        Dalam Proses
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.pending_applications || 0}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center">
                                        👶
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        Anak Tersedia
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.available_children || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <Link
                            href={route('adoption-applications.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors duration-200"
                        >
                            ➕ Ajukan Adopsi
                        </Link>
                        <Link
                            href={route('adoption-applications.index')}
                            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-colors duration-200"
                        >
                            📋 Aplikasi Saya
                        </Link>
                        <Link
                            href={route('children.index')}
                            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors duration-200"
                        >
                            👶 Lihat Anak
                        </Link>
                    </div>

                    {/* My Applications */}
                    {myApplications.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    📋 Aplikasi Terbaru Saya
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {myApplications.map((application) => (
                                        <div
                                            key={application.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {application.application_number}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {application.child?.name || 'Anak belum dipilih'}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {application.status}
                                                </span>
                                                <div className="mt-1">
                                                    <Link
                                                        href={route('adoption-applications.show', application.id)}
                                                        className="text-xs text-blue-600 hover:text-blue-800"
                                                    >
                                                        Lihat Detail
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Available Children */}
                    {availableChildren.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    👶 Anak yang Tersedia untuk Adopsi
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {availableChildren.map((child) => (
                                        <div
                                            key={child.id}
                                            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                                        >
                                            <div className="text-center mb-4">
                                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                                    {child.gender === 'male' ? '👦' : '👧'}
                                                </div>
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {child.name}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {child.age} tahun • {child.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <Link
                                                    href={route('children.show', child.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </AppShell>
        </>
    );
}