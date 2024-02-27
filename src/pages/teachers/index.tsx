// ** MUI Imports
import Grid from '@mui/material/Grid'

import { Button, Typography } from '@mui/material'

import * as React from 'react'

import { ArrowTopRight } from 'mdi-material-ui'

import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import ProfessorItems from 'src/layouts/components/Professors/Professors'
import ProfessorReport from 'src/layouts/components/Professors/ProfessorsReport'

export default function App() {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab sx={{ fontWeight: 'bold' }} value='1' label='List' />
          <Tab sx={{ fontWeight: 'bold' }} value='2' label='Report' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Grid container direction={'row'} spacing={4}>
              <Grid
                item
                display={'flex'}
                flexWrap={'wrap'}
                justifyContent={'space-between'}
                width={'100%'}
                alignItems={'center'}
              >
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>List professors</Typography>
                <Button
                  sx={{
                    backgroundColor: '#C4FCEF',
                    color: '#50bf62',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    ':hover': {
                      color: 'white',
                      backgroundColor: '#0081CF'
                    }
                  }}
                >
                  <ArrowTopRight sx={{ marginRight: '2px', fontSize: '16px' }}></ArrowTopRight>
                  Contact
                </Button>
              </Grid>
              <Grid item>
                <ProfessorItems></ProfessorItems>
              </Grid>
              <Grid item>
                <ProfessorItems></ProfessorItems>
              </Grid>
              <Grid item>
                <ProfessorItems></ProfessorItems>
              </Grid>
              <Grid item>
                <ProfessorItems></ProfessorItems>
              </Grid>
              <Grid item>
                <ProfessorItems></ProfessorItems>
              </Grid>
              <Grid item>
                <ProfessorItems></ProfessorItems>
              </Grid>
              <Grid item>
                <ProfessorItems></ProfessorItems>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value='2' sx={{ p: 0 }}>
            <Grid container direction={'row'} spacing={4}>
              <Grid
                item
                display={'flex'}
                flexWrap={'wrap'}
                justifyContent={'space-between'}
                width={'100%'}
                alignItems={'center'}
              >
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Report professor</Typography>
                <Button
                  sx={{
                    backgroundColor: '#C4FCEF',
                    color: '#50bf62',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    fontSize: '13px',
                    ':hover': {
                      color: 'white',
                      backgroundColor: '#0081CF'
                    }
                  }}
                >
                  <ArrowTopRight sx={{ marginRight: '2px', fontSize: '16px' }}></ArrowTopRight>
                  Contact
                </Button>
              </Grid>
              <Grid item>
                <ProfessorReport></ProfessorReport>
              </Grid>
              <Grid item>
                <ProfessorReport></ProfessorReport>
              </Grid>
              <Grid item>
                <ProfessorReport></ProfessorReport>
              </Grid>
              <Grid item>
                <ProfessorReport></ProfessorReport>
              </Grid>
              <Grid item>
                <ProfessorReport></ProfessorReport>
              </Grid>
              <Grid item>
                <ProfessorReport></ProfessorReport>
              </Grid>
              <Grid item>
                <ProfessorReport></ProfessorReport>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}
