import { AddShoppingCart } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import useAuth from 'src/@core/hooks/useAuth'

const AddToCartDevice = () => {
  const router = useRouter()

  const viewCart = () => {
    router.push('/devices/carts')
  }

  const role = useAuth().role

  if (role === 'Teacher') {
    return (
      <IconButton color='primary' aria-label='add to shopping cart' onClick={viewCart}>
        <AddShoppingCart />
      </IconButton>
    )
  }

  // return (
  //   <IconButton color='primary' aria-label='add to shopping cart' onClick={viewCart}>
  //     <AddShoppingCart />
  //   </IconButton>
  // )
}

export default AddToCartDevice
