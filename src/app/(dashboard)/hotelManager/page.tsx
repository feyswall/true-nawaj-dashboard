import ProtectedWrapper from '@/components/authComp/ProtectedWrapper'
import HotelManagerDashboardComponent from '@/components/hotelManager/properties/propertiesAllComponent'

const HotelManagerDashboard = () => {
  return (
    <ProtectedWrapper>
      <HotelManagerDashboardComponent />
    </ProtectedWrapper>
  )
}

export default HotelManagerDashboard
