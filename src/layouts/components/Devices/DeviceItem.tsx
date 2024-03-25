import { Button, Card, Grid, Slider, TextField, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'
import { toast } from 'react-toastify'
import useAuth from 'src/@core/hooks/useAuth'
import useAxios from 'src/@core/hooks/useAxios'

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&::before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
})
export interface DeviceCategoryModel {
  deviceCategoryName: string
  deviceDescription: string
  devicePictureURL: string
  deviceCategoryId: string
  quantityOfDeviceInStorageCanBorrow: number
  quantityOfDeviceInStorageInTotal: number
  listDevicesOfDeviceCategory: [
    {
      deviceSerialNumber: string
      deviceId: string
      dateOfAcquisition: string
      dateOfLastRepair: string
      deviceStatus: number
      deviceStatusString: string
    }
  ]
}

/*call api*/
const API_GET_ALL_DEVICE_CATEGORY = '/api/v1/device'

export default function DeviceItems() {
  const [deviceCategories, setDeviceCategries] = React.useState<DeviceCategoryModel[]>([])
  const [quantity, setQuantity] = React.useState<number>(1)
  const [cart, setCart] = React.useState([])

  const route = useRouter()
  const axiosClient = useAxios()
  const authen = useAuth()
  const role = authen.role

  const isAdmin = () => role === 'Admin'

  //const isTeacher = () => role === 'Teacher'

  const ViewDetailDeviceItems = (deviceCategoryId: string) => {
    route.push({
      pathname: '/devices/detail',
      query: { deviceCategoryId: deviceCategoryId }
    })
  }

  React.useEffect(() => {
    const fetchAllDeviceInCategory = async () => {
      try {
        const response = await axiosClient.call('get', API_GET_ALL_DEVICE_CATEGORY)
        setDeviceCategries(response as DeviceCategoryModel[])
      } catch (error) {
        console.log(error)
      }
    }

    fetchAllDeviceInCategory()
  }, [])

  const addToCart = (item: DeviceCategoryModel, quantity: number) => {
    if (quantity <= 0) {
      toast.error('Invalid quantity')

      return
    }
    if (quantity > item.quantityOfDeviceInStorageCanBorrow) {
      toast.error('Vượt quá số lượng có sẵn')

      return
    }

    //console.log(`Added to cart: ${item.deviceCategoryName}`)
    const updatedCart = [...cart, { ...item, quantity }]

    //chỗ này gọi API update giỏ hàng chưa mà bảo NULL nè
    setCart(updatedCart) // cái data đang trả null đó

    console.log(updatedCart)

    toast.success('Device đã được thêm vào giỏ hàng')
  }

  const renderButton = (item: DeviceCategoryModel) => {
    if (isAdmin()) {
      return (
        <Button
          sx={{
            backgroundColor: '#9155fd',
            color: 'white',
            ':hover': { backgroundColor: '#008BC5', color: 'white' }
          }}
          onClick={() => {
            ViewDetailDeviceItems(item.deviceCategoryId)
          }}
        >
          View details
        </Button>
      )
    } else {
      return (
        <Grid container alignItems='center' spacing={1}>
          <TextField
            id='quantity'
            type='number'
            variant='outlined'
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            size='small'
            inputProps={{ min: 1 }}
            sx={{
              width: '80px'
            }}
          />
          <Button
            sx={{
              backgroundColor: '#52af77',
              color: 'white',
              ':hover': { backgroundColor: '#006400', color: 'white' },
              marginLeft: '10px',
              width: '72%'
            }}
            onClick={() => {
              addToCart(item, quantity)
            }}
          >
            Add to cart
          </Button>
        </Grid>
      )
    }
  }

  return (
    <Grid container spacing={2}>
      {deviceCategories.map((item, index) => (
        <Card
          sx={{
            padding: '15px',
            display: 'flex',
            gap: 3,
            flexDirection: 'column',
            width: '350px',
            height: 'auto',
            marginBottom: '15px',
            marginRight: '15px'
          }}
          key={index}
        >
          <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '26px' }}>
            {item.deviceCategoryName}
          </Typography>
          <Typography
            sx={{
              border: '2px solid #B0AAAE',
              borderRadius: '10px',
              width: 'fit-content',
              padding: '5px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {item.deviceDescription}
          </Typography>
          <Grid container>
            {/* <ClockOutline></ClockOutline>
        <Typography sx={{ marginRight: '15px' }}>12:40 P:M</Typography>
        <Calendar></Calendar>
        <Typography>05/08/2001</Typography> */}
            {/* check độ bền */}
            <Grid item md={3}>
              <Typography sx={{ marginRight: '10px' }}>Độ bền</Typography>
            </Grid>
            <Grid item md={9} sx={{ paddingRight: '10px' }}>
              <PrettoSlider valueLabelDisplay='auto' aria-label='pretto slider' defaultValue={20} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography sx={{ marginRight: '10px' }}>
                Tổng số lượng sản phẩm: {item.quantityOfDeviceInStorageInTotal}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ marginRight: '10px' }}>
                Số lượng sản phẩm hiện có: {item.quantityOfDeviceInStorageInTotal}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            sx={{
              border: '1px solid #CECFD7',
              borderRadius: '10px',
              width: 'fit-content',
              padding: '5px',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: '#C4FCEF',
              color: item.quantityOfDeviceInStorageCanBorrow > 0 ? '#00C9A7' : 'red'
            }}
          >
            {item.quantityOfDeviceInStorageCanBorrow > 0 ? 'Status: In stock' : 'Status: Out of stock'}
          </Typography>
          {renderButton(item)}
        </Card>
      ))}
    </Grid>
  )
}
