interface StatCardProps {
    title: string;
    value: number;
}

export default function StatCard({
    title,
    value,
}: StatCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 border">
            <h3 className="text-gray-600 text-sm font-medium">
                {title}
            </h3>

            <p className="text-4xl font-bold text-gray-900 mt-2">
                {value}
            </p>
        </div>
    );
}