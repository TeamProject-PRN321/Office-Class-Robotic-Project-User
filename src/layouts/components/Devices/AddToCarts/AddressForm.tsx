import * as React from 'react'

import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/system'
import { Box, TextField } from '@mui/material'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column'
}))

export default function AddressForm() {
  return (
    <Grid container spacing={3}>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 3, width: '60ch' }
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <TextField
            id='outlined-multiline-static'
            label='Borrow Purpose'
            multiline
            rows={4}
            defaultValue='Borrow Purpose'
          />
        </div>
      </Box>
      <FormGrid item xs={12}>
        <FormLabel htmlFor='classname'>Class Name</FormLabel>
        <OutlinedInput
          id='classname'
          name='classname'
          type='classname'
          placeholder='ClassName, suite, unit, etc. (optional)'
          autoComplete='shipping address-line2'
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor='slot'>Slot</FormLabel>
        <OutlinedInput
          id='slot'
          name='slot'
          type='slot'
          placeholder='Slot, suite, unit, etc. (optional)'
          autoComplete='shipping address-line3'
          required
        />
      </FormGrid>
    </Grid>
  )
}
