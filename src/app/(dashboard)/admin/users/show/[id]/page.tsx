import ProtectedWrapper from "@/components/authComp/ProtectedWrapper"


interface ServerPageProps {
  params: {
    id: string
  }
}

const ShowUser = async ({ params }: ServerPageProps) => {
  const { id } = params as { id: string }

  return (
    <ProtectedWrapper>
      <span>User is sign as {id}</span>
    </ProtectedWrapper>
  )
}

export default ShowUser
