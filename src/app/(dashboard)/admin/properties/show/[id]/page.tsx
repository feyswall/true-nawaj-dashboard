import PropertyShow from '@/components/admin/properties/propertyShowComponent'
import Property from '@/models/Property'
import type { PropertyType } from '@/types/modelTypes/PropertyType'
import ProtectedWrapper from '@/components/authComp/ProtectedWrapper'

interface ServerPageProps {
  params: {
    id: string
  }
}

const ServerPage = async ({ params }: ServerPageProps) => {
  const { id } = params as { id: string }

  // Extract document data
  const data: PropertyType | null = await Property.find<PropertyType>(Property.collectionName, id)

  // Server component only passes data to client component
  return (
    <ProtectedWrapper>
      <PropertyShow data={data} />
    </ProtectedWrapper>
  )
}

export default ServerPage
