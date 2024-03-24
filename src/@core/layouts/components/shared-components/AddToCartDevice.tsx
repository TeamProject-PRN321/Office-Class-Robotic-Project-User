import { AddShoppingCart } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'

const AddToCartDevice = () => {
  const router = useRouter()
  const viewCart = () => {
    router.push('/devices/carts')
  }

  return (
    <IconButton color='primary' aria-label='add to shopping cart' onClick={viewCart}>
      <AddShoppingCart />
    </IconButton>
  )
}

export default AddToCartDevice
