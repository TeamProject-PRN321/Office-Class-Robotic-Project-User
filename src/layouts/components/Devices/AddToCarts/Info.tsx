import * as React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

interface Product {
  deviceCategoryName: string
  deviceCategoryId: string
  quantityOfDeviceInStorageCanBorrow: number
}

interface InfoProps {
  totalDeviceBorrow: number
  cart: Product[]
}

export default function Info({ totalDeviceBorrow, cart }: InfoProps) {
  return (
    <React.Fragment>
      <Typography variant='subtitle2' color='text.secondary'>
        Total Device Borrow
      </Typography>
      <Typography variant='h4' gutterBottom>
        {totalDeviceBorrow}
      </Typography>
      <List disablePadding>
        {cart.map(product => (
          <ListItem key={product.deviceCategoryName} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.deviceCategoryName}
              secondary={`Device Id: ${product.deviceCategoryId}`}
            />
            <Typography variant='body1' fontWeight='medium'>
              {product.quantityOfDeviceInStorageCanBorrow}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  )
}
