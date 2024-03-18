import { Grid, Pagination, Typography } from '@mui/material'
import * as React from 'react'
import useAxios from 'src/@core/hooks/useAxios'

import ScheduleDashboard from '../Dashboard/DashboardSchedule'
import NewSubjectForm from './AddSubject/NewSubjectForm'

export interface SubjectModel {
  id: string
  subjectName: string
  totalSlots: number
  giaoTrinhData: GiaoTrinhData
}

export interface GiaoTrinhData {
  id: string
  giaoTrinhName: string
  description: string
  filePDF: string
  created: string
}

const URL_GET_ALL_SUBJECT = '/api/v1/subject/all'

export default function SubjectItems() {
  const [data, setData] = React.useState<SubjectModel[]>([])
  const [paginationModel, setPagination] = React.useState<{
    size: number
    page: number
  }>({
    size: 10,
    page: 1
  })

  const axiosClient = useAxios()

  React.useEffect(() => {
    const fetchAllSubject = async () => {
      try {
        const response = await axiosClient.call('get', URL_GET_ALL_SUBJECT)
        setData(response)
      } catch (error) {}
    }

    fetchAllSubject()
  }, [])

  const refetch = async () => {
    try {
      const response = await axiosClient.call('get', URL_GET_ALL_SUBJECT)
      setData(response)
    } catch (error) {}
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination({
      ...paginationModel,
      page: value
    })
  }

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid
        marginBottom={'20px'}
        item
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        alignItems={'center'}
      >
        <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Subject</Typography>
        <NewSubjectForm callBackCreate={refetch} />
      </Grid>

      <Grid
        item
        container
        spacing={3}
        flexDirection={'row'}

        // sx={{
        //   height: '700px',
        //   overflowY: 'scroll',
        //   flexWrap: 'nowrap',
        //   '&::-webkit-scrollbar': {
        //     width: '3px'
        //   },
        //   '&::-webkit-scrollbar-thumb': {
        //     backgroundColor: theme => theme.palette.grey[300] // Color of the thumb (adjust as needed)
        //   },
        //   '&::-webkit-scrollbar-track': {
        //     backgroundColor: theme => theme.palette.grey[200] // Color of the track (adjust as needed)
        //   },
        //   pt: '0px !important'
        // }}
      >
        {data
          .slice((paginationModel.page - 1) * paginationModel.size, paginationModel.page * paginationModel.size)
          .map((item, index) => {
            return (
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={index}>
                <ScheduleDashboard data={item} />
              </Grid>
            )
          })}
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: 3
        }}
      >
        <Pagination
          count={Math.ceil(data.length / paginationModel.size)}
          page={paginationModel.page}
          onChange={handleChange}
          color='primary'
        />
      </Grid>
    </Grid>
  )
}
