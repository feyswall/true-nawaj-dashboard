// Component Imports
import React from 'react'

import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// import NotFound from '@views/NotFound'

// Util Imports
// import { getServerMode } from '@core/utils/serverHelpers'

const NotFoundPage = () => {
  // Vars
  const direction = 'ltr'

  // const mode = getServerMode()

  return (
    <Providers direction={direction}>
      <BlankLayout>
        {/* <NotFound mode={mode} /> */}
        <div style={{textAlign: 'center'}}>404  Page Not Found</div>
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
