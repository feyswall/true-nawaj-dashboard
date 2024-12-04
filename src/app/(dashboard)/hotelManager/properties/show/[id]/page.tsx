import PropertyShowComponent from '@/components/hotelManager/properties/PropertyShowComponent'

interface PropertyPageProps {
  params: {
    id: string
  }
}

const PropertyPage: React.FC<PropertyPageProps> = async ({ params }) => {
  // use collection to monitor rooms
  const { id } = params
  return (
    <PropertyShowComponent propertyId={id} ></PropertyShowComponent>
  )

}

export default PropertyPage
