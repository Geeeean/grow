import VineyardActions from '@/components/vineyard/actions';
import { useVineyardById } from '@/hooks/use-vineyards';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/(app)/_layout/vineyards/$vineyardId')({
    // In a loader
    //loader: ({ params }) => fetchPost(params.postId),
    // Or in a component
    validateSearch: (search: Record<string, string>): { bcLast: string } => {
        return {
            bcLast: search.bcLast,
        };
    },
    component: () => <VineyardComponent />,
});

const VineyardComponent = () => {
    const { vineyardId } = Route.useParams();
    const { vineyard, error } = useVineyardById(Number(vineyardId));

    if (error) return <p>error</p>;

    if (vineyard)
        return (
            <div className="h-full flex flex-col gap-4">
                <div>
                    <p className="text-lg font-medium">{vineyard.name}</p>
                    <p className="text-muted-foreground text-sm">
                        View in-depth information and management tools for this vineyard.
                    </p>
                </div>

                <VineyardActions vineyardId={vineyard.id} />
            </div>
        );

    return <p>loading</p>;
};
