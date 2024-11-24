// MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Divider } from '@mui/material'
import { type OwnerType } from '@/types/modelTypes/OwnerType'
import Link from 'next/link'

type ownerPropType = {
  owner: OwnerType
}

const PropertyOwnerInfoCardView: React.FC<ownerPropType> = ({owner}) => {
  return (
    // <Card>
    //   <CardMedia image='/images/hotelowner.webp' className='bs-[140px]' />
    //   <CardContent>
    //     <Typography variant='h5' className='mbe-2'>
    //       {owner.name}
    //     </Typography>
    //     <Typography className='mbe-2'>Contacts</Typography>
    //     <Typography className='mbe-2'>{owner.contact_info}</Typography>
    //     <Divider />
    //     <Typography className='mte-3'>
    //       <small>
    //         <b>Extra Descriptions</b>
    //       </small>
    //     </Typography>
    //     <Typography>{owner.about_me}</Typography>
    //   </CardContent>
    //   <Button variant='contained' fullWidth className='rounded-none'>
    //     <Link href={`/properties/owners/show/${owner.id}`}>view owner</Link>
    //   </Button>
    // </Card>
    <Card>
      <CardContent>
        <Typography variant='h5' className='mbe-2'>card</Typography>
      </CardContent>
    </Card>
  )
}

export default PropertyOwnerInfoCardView
