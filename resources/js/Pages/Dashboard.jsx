import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    AcademicCapIcon,
    TrophyIcon,
    StarIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth }) {
    const cards = [
        {
            title: 'Scores',
            description: 'Set individual participant scores.',
            href: '/score',
            icon: AcademicCapIcon,
            color: 'bg-blue-200 text-blue-800 hover:bg-blue-200',
        },
        {
            title: 'Leaderboards',
            description: 'See the top-ranking participants.',
            href: '/leaderboards',
            icon: TrophyIcon,
            color: 'bg-green-100 text-green-800 hover:bg-green-200',
        },
        {
            title: 'Finalist',
            description: 'Set who made it to the finals.',
            href: '/finalist',
            icon: StarIcon,
            color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="pb-12 pt-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" pb-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cards.map(({ title, description, href, icon: Icon, color }) => (
                                <Link
                                    key={title}
                                    href={href}
                                    className={`rounded-xl p-6 transition duration-300 shadow hover:shadow-lg ${color} flex flex-col items-start gap-3`}
                                >
                                    <div className="p-2 rounded-full bg-white shadow">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">{title}</h4>
                                        <p className="text-sm">{description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
