import { AppShell } from '@/components/app-shell';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

interface CreateAdoptionApplicationProps {
    availableChildren: Array<{
        id: number;
        name: string;
        age: number;
        gender: 'male' | 'female';
        background_story?: string;
    }>;
    [key: string]: unknown;
}



export default function CreateAdoptionApplication({ availableChildren }: CreateAdoptionApplicationProps) {
    const { data, setData, post, processing, errors } = useForm({
        child_id: '',
        spouse_name: '',
        spouse_birth_date: '',
        spouse_occupation: '',
        spouse_income: '',
        adoption_reason: '',
        child_preferences: '',
        has_other_children: false as boolean,
        other_children_count: '0',
        requested_child_name: '',
        requested_child_birth_date: '',
        requested_child_gender: '',
        id_card: null,
        family_card: null,
        marriage_certificate: null,
        income_certificate: null,
        health_certificate: null,
        police_certificate: null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('adoption-applications.store'));
    };

    const handleFileChange = (field: string, file: File | null) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (setData as any)(field, file);
    };

    return (
        <>
            <Head title="Buat Aplikasi Adopsi" />
            <AppShell>
                <div className="max-w-4xl mx-auto p-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📝 Aplikasi Adopsi Anak
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Isi formulir ini dengan lengkap dan benar untuk mengajukan permohonan adopsi anak.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {/* Child Selection Section */}
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                👶 Pilihan Anak
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Pilih Anak yang Tersedia (Opsional)
                                    </label>
                                    <select
                                        value={data.child_id}
                                        onChange={(e) => setData('child_id', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih anak atau biarkan kosong</option>
                                        {availableChildren.map((child) => (
                                            <option key={child.id} value={child.id}>
                                                {child.name} - {child.age} tahun ({child.gender === 'male' ? 'Laki-laki' : 'Perempuan'})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.child_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.child_id}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nama Anak yang Diinginkan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.requested_child_name}
                                            onChange={(e) => setData('requested_child_name', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.requested_child_name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.requested_child_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tanggal Lahir Anak
                                        </label>
                                        <input
                                            type="date"
                                            value={data.requested_child_birth_date}
                                            onChange={(e) => setData('requested_child_birth_date', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.requested_child_birth_date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.requested_child_birth_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Jenis Kelamin
                                        </label>
                                        <select
                                            value={data.requested_child_gender}
                                            onChange={(e) => setData('requested_child_gender', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">Pilih jenis kelamin</option>
                                            <option value="male">Laki-laki</option>
                                            <option value="female">Perempuan</option>
                                        </select>
                                        {errors.requested_child_gender && (
                                            <p className="mt-1 text-sm text-red-600">{errors.requested_child_gender}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Spouse Information */}
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                💑 Informasi Pasangan
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nama Pasangan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.spouse_name}
                                        onChange={(e) => setData('spouse_name', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.spouse_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.spouse_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tanggal Lahir Pasangan
                                    </label>
                                    <input
                                        type="date"
                                        value={data.spouse_birth_date}
                                        onChange={(e) => setData('spouse_birth_date', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.spouse_birth_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.spouse_birth_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Pekerjaan Pasangan
                                    </label>
                                    <input
                                        type="text"
                                        value={data.spouse_occupation}
                                        onChange={(e) => setData('spouse_occupation', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.spouse_occupation && (
                                        <p className="mt-1 text-sm text-red-600">{errors.spouse_occupation}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Penghasilan Pasangan (Rp)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.spouse_income}
                                        onChange={(e) => setData('spouse_income', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.spouse_income && (
                                        <p className="mt-1 text-sm text-red-600">{errors.spouse_income}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Motivation & Preferences */}
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                💭 Motivasi & Preferensi
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Alasan Adopsi <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={data.adoption_reason}
                                        onChange={(e) => setData('adoption_reason', e.target.value)}
                                        placeholder="Jelaskan mengapa Anda ingin mengadopsi anak (minimal 50 karakter)"
                                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    <div className="text-xs text-gray-500 mt-1">
                                        {data.adoption_reason.length} / 50 karakter minimum
                                    </div>
                                    {errors.adoption_reason && (
                                        <p className="mt-1 text-sm text-red-600">{errors.adoption_reason}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Preferensi Anak
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.child_preferences}
                                        onChange={(e) => setData('child_preferences', e.target.value)}
                                        placeholder="Deskripsikan preferensi Anda tentang anak yang ingin diadopsi"
                                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.child_preferences && (
                                        <p className="mt-1 text-sm text-red-600">{errors.child_preferences}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.has_other_children}
                                            onChange={(e) => {
                                                setData('has_other_children', e.target.checked);
                                                if (!e.target.checked) {
                                                    setData('other_children_count', '0');
                                                }
                                            }}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                            Sudah memiliki anak lain
                                        </label>
                                    </div>

                                    {data.has_other_children && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Jumlah anak
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={data.other_children_count}
                                                onChange={(e) => setData('other_children_count', e.target.value)}
                                                className="block w-20 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Document Upload */}
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                📄 Upload Dokumen
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Mohon upload semua dokumen yang diperlukan dalam format PDF, JPG, JPEG, atau PNG (maksimal 2MB per file)
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        KTP <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange('id_card', e.target.files?.[0] || null)}
                                        className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        required
                                    />
                                    {errors.id_card && (
                                        <p className="mt-1 text-sm text-red-600">{errors.id_card}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Kartu Keluarga <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange('family_card', e.target.files?.[0] || null)}
                                        className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        required
                                    />
                                    {errors.family_card && (
                                        <p className="mt-1 text-sm text-red-600">{errors.family_card}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Akta Nikah
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange('marriage_certificate', e.target.files?.[0] || null)}
                                        className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {errors.marriage_certificate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.marriage_certificate}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Surat Keterangan Penghasilan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange('income_certificate', e.target.files?.[0] || null)}
                                        className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        required
                                    />
                                    {errors.income_certificate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.income_certificate}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Surat Keterangan Sehat <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange('health_certificate', e.target.files?.[0] || null)}
                                        className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        required
                                    />
                                    {errors.health_certificate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.health_certificate}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        SKCK <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange('police_certificate', e.target.files?.[0] || null)}
                                        className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        required
                                    />
                                    {errors.police_certificate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.police_certificate}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Draft'}
                            </button>
                        </div>
                    </form>
                </div>
            </AppShell>
        </>
    );
}