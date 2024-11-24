import ProtectedWrapper from '@/components/authComp/ProtectedWrapper'
import RoomShow from '@/components/rooms/roomShowComponent'
import Room from '@/models/Room'
import { type RoomType } from '@/types/modelTypes/RoomType'

interface ServerPageProps {
  params: {
    id: string
  }
}

const ServerPage = async ({ params }: ServerPageProps) => {
  const { id } = params as { id: string }

  // Extract document data
  const data: RoomType | null = await Room.find<RoomType>(Room.collectionName, id)

  if(!data) {
    return <h3>Data Not found</h3>;
  }

  // Server component only passes data to client component
  return (
    <ProtectedWrapper>
      <RoomShow data={data} />
    </ProtectedWrapper>
  )
}

export default ServerPage
