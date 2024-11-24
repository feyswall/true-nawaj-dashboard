// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu,
        remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <MenuItem href='/admin' icon={<i className='ri-home-smile-line' />}>
          aDMIN Dashboard
        </MenuItem>

        <SubMenu label='Apartment / Hotel'>
          <MenuItem href='/admin/properties' icon={<i className='ri-bar-chart-box-line' />}>
            Properties
          </MenuItem>
          <MenuItem href='/admin/bookings' icon={<i className='ri-bar-chart-box-line' />}>
            Bookings & Reservations
          </MenuItem>

          <MenuItem href='/admin/payments' icon={<i className='ri-bar-chart-box-line' />}>
            Payments
          </MenuItem>

          <MenuItem href='/admin/promotions' icon={<i className='ri-bar-chart-box-line' />}>
            Promotions
          </MenuItem>

          <MenuItem href='/admin/reviews' icon={<i className='ri-bar-chart-box-line' />}>
            Reviews & Ratings
          </MenuItem>

          <MenuItem href='/admin/reports' icon={<i className='ri-bar-chart-box-line' />}>
            Reports & Analytics
          </MenuItem>

          <MenuItem href='/admin/properties/owners' icon={<i className='ri-bar-chart-box-line' />}>
            Property Owners
          </MenuItem>
        </SubMenu>

        <MenuSection label='Others'>
          <MenuItem href='/admin/customers' icon={<i className='ri-bar-chart-box-line' />}>
            Users & Customers
          </MenuItem>

          <MenuItem href='/admin/supports' icon={<i className='ri-bar-chart-box-line' />}>
            Support & Helpdesk
          </MenuItem>

          <MenuItem href='/admin/settings' icon={<i className='ri-bar-chart-box-line' />}>
            Settings
          </MenuItem>

          <MenuItem href='/adminmarketings' icon={<i className='ri-bar-chart-box-line' />}>
            Marketing
          </MenuItem>

          <MenuItem href='/logs' icon={<i className='ri-bar-chart-box-line' />}>
            Logs & Activity
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu