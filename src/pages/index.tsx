// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import { Button, Card, Tab, Typography } from '@mui/material'
import { Launch } from 'mdi-material-ui'
import LiveClasses from 'src/layouts/components/Dashboard/DashboardLiveClasses'
import Teachers from 'src/layouts/components/Dashboard/DashboardTeachers'
import ScheduleDashboard from 'src/layouts/components/Dashboard/DashboardSchedule'
import { useRouter } from 'next/router'
import { SubjectModel } from 'src/layouts/components/Subject/SubjectItems'
import SchedulerTable from 'src/layouts/components/Subject/Scheduler'
import useAuth from 'src/@core/hooks/useAuth'
import { useState, SyntheticEvent } from 'react'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import NewClassForm from 'src/layouts/components/LiveClasses/AddNewClass/NewClassFormLiveClass'
import NewClassFormHistoryClass from 'src/layouts/components/LiveClasses/AddNewClass/NewClassFormHistoryClass'

const Dashboard = () => {
  const router = useRouter()
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const ViewAllClass = () => {
    router.push('/classes')
  }
  const ViewAllSchedule = () => {
    router.push('/subjects')
  }
  const ViewAllProfessor = () => {
    router.push('/teachers')
  }

  const role = useAuth().role
  if (role === 'Student') {
    return <SchedulerTable></SchedulerTable>
  }

  if (role === 'Teacher') {
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

  if (role === 'Admin') {
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

  return (
    <Grid container direction={'row'} justifyContent={'space-between'}>
      {/* <Grid item xs={12} md={4}>
        <Trophy />
      </Grid>
      <Grid item xs={12} md={8}>
        <StatisticsCard />
      </Grid> */}
      <Grid
        item
        container
        spacing={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '6px' // Set the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[500] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the track (adjust as needed)
          }
        }}
      >
        <Grid item display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
          <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Subjects</Typography>
          <Button
            sx={{
              backgroundColor: '#ecf1ff',
              color: '#5681f1',
              fontWeight: 'bold',
              fontSize: '13px',
              textDecoration: 'underline'
            }}
            onClick={() => {
              ViewAllSchedule()
            }}
          >
            View All
            <Launch sx={{ margin: '2px', fontSize: '16px' }}></Launch>
          </Button>
        </Grid>
        <Grid item>
          <ScheduleDashboard data={{} as SubjectModel} />
        </Grid>
        <Grid item>
          <ScheduleDashboard data={{} as SubjectModel} />
        </Grid>
        <Grid item>
          <ScheduleDashboard data={{} as SubjectModel} />
        </Grid>
        <Grid item>
          <ScheduleDashboard data={{} as SubjectModel} />
        </Grid>
        <Grid item>
          <ScheduleDashboard data={{} as SubjectModel} />
        </Grid>
      </Grid>

      <Grid
        item
        container
        spacing={3}
        xs={12}
        md={5}
        lg={5}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '6px' // Set the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[500] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the track (adjust as needed)
          }
        }}
      >
        <Grid item display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
          <Typography sx={{ color: 'black', fontWeight: 'bold' }}> Live Classes</Typography>
          <Button
            sx={{
              backgroundColor: '#ecffef',
              color: '#50bf62',
              fontWeight: 'bold',
              fontSize: '13px',
              textDecoration: 'underline'
            }}
            onClick={() => {
              ViewAllClass()
            }}
          >
            View All
            <Launch sx={{ margin: '2px', fontSize: '16px' }}></Launch>
          </Button>
        </Grid>
        <Grid item>
          <LiveClasses />
        </Grid>
        <Grid item>
          <LiveClasses />
        </Grid>
        <Grid item>
          <LiveClasses />
        </Grid>
        <Grid item>
          <LiveClasses />
        </Grid>
        <Grid item>
          <LiveClasses />
        </Grid>
        <Grid item>
          <LiveClasses />
        </Grid>
      </Grid>

      <Grid
        item
        container
        spacing={3}
        xs={12}
        md={3}
        lg={3}
        justifyContent={'start'}
        flexDirection={'column'}
        sx={{
          height: '700px',
          overflowY: 'scroll',
          flexWrap: 'nowrap',
          '&::-webkit-scrollbar': {
            width: '6px' // Set the width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme => theme.palette.grey[500] // Color of the thumb (adjust as needed)
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme => theme.palette.grey[200] // Color of the track (adjust as needed)
          }
        }}
      >
        <Grid item display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
          <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Professor</Typography>
          <Button
            sx={{
              backgroundColor: '#ffecf9',
              color: '#f57bd2',
              fontWeight: 'bold',
              fontSize: '13px',
              textDecoration: 'underline'
            }}
            onClick={() => {
              ViewAllProfessor()
            }}
          >
            View All
            <Launch sx={{ margin: '2px', fontSize: '16px' }}></Launch>
          </Button>
        </Grid>
        <Grid item>
          <Teachers />
        </Grid>
        <Grid item>
          <Teachers />
        </Grid>
        <Grid item>
          <Teachers />
        </Grid>
        <Grid item>
          <Teachers />
        </Grid>
      </Grid>
      {/* <Grid item  md={6} lg={4}>
        <TotalEarning />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <CardStatisticsVerticalComponent
              stats='$25.6k'
              icon={<Poll />}
              color='success'
              trendNumber='+42%'
              title='Total Profit'
              subtitle='Weekly Profit'
            />
          </Grid>
          <Grid item xs={6}>
            <CardStatisticsVerticalComponent
              stats='$78'
              title='Refunds'
              trend='negative'
              color='secondary'
              trendNumber='-15%'
              subtitle='Past Month'
              icon={<CurrencyUsd />}
            />
          </Grid>
          <Grid item xs={6}>
            <CardStatisticsVerticalComponent
              stats='862'
              trend='negative'
              trendNumber='-18%'
              title='New Project'
              subtitle='Yearly Project'
              icon={<BriefcaseVariantOutline />}
            />
          </Grid>
          <Grid item xs={6}>
            <CardStatisticsVerticalComponent
              stats='15'
              color='warning'
              trend='negative'
              trendNumber='-18%'
              subtitle='Last Week'
              title='Sales Queries'
              icon={<HelpCircleOutline />}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SalesByCountries />
      </Grid>
      <Grid item xs={12} md={12} lg={8}>
        <DepositWithdraw />
      </Grid> */}

      {/* dùng trong check attend cho students */}
      {/* <Grid item xs={12}>
        <Table />
      </Grid> */}
    </Grid>
  )
}

export default Dashboard
