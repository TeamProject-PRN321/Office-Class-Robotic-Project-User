import { Button, Card, Grid, Slider, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'

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

export default function DeviceItems() {
  const route = useRouter()
  const ViewDetailDeviceItems = () => {
    route.push('/devices')
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column', width: '350px', height: '250px' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Smart TV</Typography>
      <Typography
        sx={{
          border: '1px solid #B0AAAE',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        Device ID: DESKTOP-7VJ313T
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

      <Typography
        sx={{
          border: '1px solid #CECFD7',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: '#C4FCEF',
          color: '#00C9A7'
        }}
      >
        Status: Using
      </Typography>
      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => {
          ViewDetailDeviceItems()
        }}
      >
        View details
      </Button>
    </Card>
  )
}
