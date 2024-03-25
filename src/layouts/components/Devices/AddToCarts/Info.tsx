import * as React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

const products = [
  {
    deviceCategoryName: 'Professional plan',
    deviceCategoryId: '123',
    quantityOfDeviceInStorageCanBorrow: 5
  },
  {
    deviceCategoryName: 'Dedicated support',
    deviceCategoryId: '789',
    quantityOfDeviceInStorageCanBorrow: 1
  },
  {
    deviceCategoryName: 'Hardware',
    deviceCategoryId: '788',
    quantityOfDeviceInStorageCanBorrow: 6
  },
  {
    deviceCategoryName: 'Landing page template',
    deviceCategoryId: '7A446C28-2870-42DB-B867-C2FA79D5EEBC',
    quantityOfDeviceInStorageCanBorrow: 9
  }
]

interface InfoProps {
  totalDeviceBorrow: number
}

export default function Info({ totalDeviceBorrow }: InfoProps) {
  return (
    <React.Fragment>
      <Typography variant='subtitle2' color='text.secondary'>
        Total Device Borrow
      </Typography>
      <Typography variant='h4' gutterBottom>
        {totalDeviceBorrow}
      </Typography>
      <List disablePadding>
        {products.map(product => (
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
