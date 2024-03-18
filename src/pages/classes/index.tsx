import * as React from 'react'

import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import NewClassForm from 'src/layouts/components/LiveClasses/AddNewClass/NewClassFormLiveClass'
import NewClassFormHistoryClass from 'src/layouts/components/LiveClasses/AddNewClass/NewClassFormHistoryClass'

export interface StudentListID {
  studentId: string
}

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
          <Tab sx={{ fontWeight: 'bold' }} value='1' label='Live Class' />
          <Tab sx={{ fontWeight: 'bold' }} value='2' label='Attendance Class' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <NewClassForm></NewClassForm>
          </TabPanel>

          <TabPanel value='2' sx={{ p: 0 }}>
            <NewClassFormHistoryClass></NewClassFormHistoryClass>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}
