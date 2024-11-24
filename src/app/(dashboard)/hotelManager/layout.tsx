// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@/components/layout/shared/hotelManager/Navigation'
import Navbar from '@/components/layout/shared/hotelManager/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import ProtectedWrapper from '@/components/authComp/ProtectedWrapper'

const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <ProtectedWrapper>
      <Providers direction={direction}>
        <LayoutWrapper
          verticalLayout={
            <VerticalLayout navigation={<Navigation />} navbar={<Navbar />} footer={<VerticalFooter />}>
              {children}
            </VerticalLayout>
          }
        />
      </Providers>
    </ProtectedWrapper>
  )
}

export default Layout
