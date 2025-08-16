import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Adoption Recommendation System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Navigation */}
                <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        🏡 Adoption Services
                                    </h1>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                                        <span className="block xl:inline">Sistem Rekomendasi</span>{' '}
                                        <span className="block text-blue-600 xl:inline">Adopsi Anak</span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 dark:text-gray-300">
                                        Platform digital untuk calon orang tua yang ingin mengadopsi anak. 
                                        Proses yang transparan, aman, dan mudah dipantau untuk mewujudkan keluarga bahagia.
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <Link
                                                href={auth.user ? route('dashboard') : route('register')}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                                            >
                                                {auth.user ? 'Ke Dashboard' : 'Mulai Sekarang'}
                                            </Link>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <Link
                                                href="#features"
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                                            >
                                                Pelajari Lebih Lanjut
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <div className="h-56 w-full bg-gradient-to-r from-blue-400 to-indigo-500 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
                            <div className="text-center text-white">
                                <div className="text-8xl mb-4">👨‍👩‍👧‍👦</div>
                                <p className="text-xl font-semibold">Keluarga Bahagia</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-12 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                                Fitur Utama
                            </h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Proses Adopsi yang Mudah dan Terpantau
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                <div className="relative">
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        📝
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        Pendaftaran Online
                                    </p>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Daftar dan ajukan aplikasi adopsi secara online dengan formulir yang mudah diikuti.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        📋
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        Verifikasi Dokumen
                                    </p>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Upload dan verifikasi dokumen yang diperlukan dengan sistem yang aman.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        📊
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        Progress Tracking
                                    </p>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Pantau status aplikasi Anda secara real-time dengan progress bar interaktif.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        👥
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        Survey & Wawancara
                                    </p>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Jadwal otomatis untuk survey dan wawancara dengan tim ahli.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        📧
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        Notifikasi Email
                                    </p>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Dapatkan notifikasi email otomatis setiap ada perubahan status aplikasi.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        📄
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        Surat Rekomendasi
                                    </p>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Generate otomatis surat rekomendasi atau penolakan dalam format PDF.
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-blue-600">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                Dipercaya oleh Dinas Sosial Indonesia
                            </h2>
                            <p className="mt-3 text-xl text-blue-200 sm:mt-4">
                                Platform yang membantu mewujudkan keluarga bahagia melalui proses adopsi yang transparan
                            </p>
                        </div>
                        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
                            <div className="flex flex-col">
                                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                                    Aplikasi Diproses
                                </dt>
                                <dd className="order-1 text-5xl font-extrabold text-white">1000+</dd>
                            </div>
                            <div className="flex flex-col mt-10 sm:mt-0">
                                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                                    Keluarga Bahagia
                                </dt>
                                <dd className="order-1 text-5xl font-extrabold text-white">500+</dd>
                            </div>
                            <div className="flex flex-col mt-10 sm:mt-0">
                                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                                    Anak Teradopsi
                                </dt>
                                <dd className="order-1 text-5xl font-extrabold text-white">750+</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            <span className="block">Siap untuk memulai?</span>
                            <span className="block text-blue-600">Daftarkan diri Anda hari ini.</span>
                        </h2>
                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Daftar Sekarang
                                </Link>
                            </div>
                            <div className="ml-3 inline-flex rounded-md shadow">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Sudah Punya Akun?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}