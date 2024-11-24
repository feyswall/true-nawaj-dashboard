// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import { CardHeader } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import PropertiesAllComponent from '@/components/admin/properties/propertiesAllComponent'

const Properties = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8} lg={12}>
        <Card className='bs-full'>
          <CardHeader title='Properties Page' />
          <CardContent className='!pbs-5'>
            <PropertiesAllComponent />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Properties
