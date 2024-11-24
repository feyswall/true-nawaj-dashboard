import ProtectedWrapper from "@/components/authComp/ProtectedWrapper"
import RegisterPropertyFormComponent from "@/components/hotelManager/properties/propertiesRegisterComponent";

const RegisterPropertyForm = () => {
  return (
    <ProtectedWrapper>
      <RegisterPropertyFormComponent />
    </ProtectedWrapper>
  )
}

export default RegisterPropertyForm;
