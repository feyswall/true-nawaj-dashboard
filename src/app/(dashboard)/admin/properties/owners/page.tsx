// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import { CardHeader, CircularProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import PropertyShow from '@/components/admin/properties/propertyShowComponent'

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8} lg={12}>
        <Card className='bs-full'>
          <CardHeader title='Owners Page' />
          <CardContent className='!pbs-5'></CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
