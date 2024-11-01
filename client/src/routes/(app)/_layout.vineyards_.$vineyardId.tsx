import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_layout/vineyards/$vineyardId')({
  // In a loader
  //loader: ({ params }) => fetchPost(params.postId),
  // Or in a component
  component: () => <Vineyard />,
})

const Vineyard = () => {
  console.log('CIAOOOOOOOOOOOOOOOOOOO')
  const { vineyardId } = Route.useParams()
  return <div>Vineyard ID: {vineyardId}</div>
}
