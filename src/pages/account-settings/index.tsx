// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import useAuth from 'src/@core/hooks/useAuth'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

export interface StudentDetailModel {
  appUserId: string
  studentId: string
  parent: Parent
  userName: string
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  address: string
  photoUrl: string
}

export interface Parent {
  parentId: string
  userName: string
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  address: string
  photoUrl: string
}

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState<string>('new-student-account')

  const authen = useAuth()
  const role = authen.role

  const isAdmin = () => role === 'Admin'

  useEffect(() => {
    if (role === 'Admin') setValue('new-student-account')
    else setValue('info')
  }, [role])

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          {isAdmin() && [
            <Tab
              key='new-student-account'
              value='new-student-account'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountOutline />
                  <TabName>New Student Account</TabName>
                </Box>
              }
            />,
            <Tab
              key='new-parent-account'
              value='new-parent-account'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountOutline />
                  <TabName>New Parent Account</TabName>
                </Box>
              }
            />,
            <Tab
              key='new-teacher-account'
              value='new-teacher-account'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountOutline />
                  <TabName>New Teacher Account</TabName>
                </Box>
              }
            />
          ]}

          {/* <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          /> */}
          {!isAdmin() && (
            <Tab
              value='info'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InformationOutline />
                  <TabName> Account Information</TabName>
                </Box>
              }
            />
          )}
        </TabList>

        <TabPanel sx={{ p: 0 }} value='new-student-account'>
          <TabAccount value={value} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='new-parent-account'>
          <TabAccount value={value} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='new-teacher-account'>
          <TabAccount value={value} />
        </TabPanel>

        {/* <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel> */}

        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings
