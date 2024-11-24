import PropertyOwnerInfoCard from '@/views/admin/properties/PropertyOwnerInfoCardView'
import { Grid, Typography } from '@mui/material'
import type React from 'react'

interface SingleOwnerProps {
  params: {
    param: Record<string, any>; // or whatever the structure of `params` is
  };
}

const SingleOwner: React.FC<SingleOwnerProps> = ({ params }) => {
  const { owner } = params.param
  return (
    <Grid container spacing={6}>
      <Grid item xs={5}>
        <PropertyOwnerInfoCard owner={owner} />
      </Grid>
      <Grid item xs={7}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptate dolorem repellat! Autem aperiam
          expedita voluptatibus ipsa doloremque ex, facilis illo hic quidem deleniti cumque maxime explicabo quas illum
          vel maiores harum. Eum ipsam necessitatibus praesentium quisquam facere nemo perspiciatis?
        </Typography>
      </Grid>
      ;
    </Grid>
  )
}

export default SingleOwner
