import CreateUserModel from '@/views/admin/users/CreateUserModel'
import UsersTableView from '@/views/admin/users/UsersTableView'
import { Box } from '@mui/material'

const UsersAllComponent = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb:
      2 }}>
        <CreateUserModel />
      </Box>
      <UsersTableView />
    </div>
  )
}

export default UsersAllComponent
