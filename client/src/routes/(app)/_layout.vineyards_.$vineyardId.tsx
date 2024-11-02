import { useVineyardById } from '@/hooks/use-vineyards';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/(app)/_layout/vineyards/$vineyardId')({
    // In a loader
    //loader: ({ params }) => fetchPost(params.postId),
    // Or in a component
    component: () => <VineyardComponent />,
});

const VineyardComponent = () => {
    const { vineyardId } = Route.useParams();
    const { vineyard, error } = useVineyardById(Number(vineyardId));

    if (error) return <p>error</p>;

    if (vineyard)
        return (
            <div>
                <p
                    className='text-2xl'
                >
                    {vineyard.name}
                </p>
                <p>vineyard stats</p>
            </div>
        );

    return <p>loading</p>;
};
