// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'


const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return <Providers direction={direction}>{children}</Providers>
}

export default Layout
