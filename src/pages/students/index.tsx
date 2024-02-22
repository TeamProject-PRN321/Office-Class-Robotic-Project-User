// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import * as React from 'react'
import StudentSticky from 'src/views/students/StudentSticky'
import { Button } from '@mui/material'

const StudentLists = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Student List' titleTypographyProps={{ variant: 'h6' }} />
          <StudentSticky />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant='outlined'
          sx={{
            ':hover': {
              backgroundColor: '#845EC2',
              color: 'whitesmoke'
            }
          }}
        >
          Cập nhật
        </Button>
      </Grid>
    </Grid>
  )
}

export default StudentLists
