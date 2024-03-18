import { Grid, Typography } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'

export default function StudentListGrade() {
  const [data, setData] = useState([])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography>Data table student import</Typography>
      </Grid>

      {/* <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5
          }}
        >
          <Button
            variant='outlined'
            sx={{
              ':hover': {
                backgroundColor: '#845EC2',
                color: 'whitesmoke'
              }
            }}
          >
            Download file excel
          </Button>
          <Button
            sx={{
              ':hover': {
                backgroundColor: '#845EC2',
                color: 'whitesmoke'
              }
            }}
            component='label'
            role={undefined}
            variant='outlined'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload score student
            <VisuallyHiddenInput type='file' />
          </Button>
        </Box>
      </Grid> */}
    </Grid>
  )
}
