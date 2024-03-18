import { Box, Button, Card, Typography } from '@mui/material'
import * as React from 'react'
import { SubjectModel } from '../Subject/SubjectItems'

export default function ScheduleDashboard({
  data = {} as SubjectModel,
  onClickViewDetail
}: {
  data: SubjectModel
  onClickViewDetail: (value: SubjectModel) => void
}) {
  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>{data.subjectName}</Typography>
      <Typography
        sx={{
          border: '1px solid #B0AAAE',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '13px',
          color: '#3B9F4A'
        }}
      >
        Total slot: {data.totalSlots} slot(s)
      </Typography>
      {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SchoolOutline sx={{ marginRight: '3px' }}></SchoolOutline>
        <Typography sx={{ marginRight: '15px' }}>3: Class</Typography>
        <BookmarkCheckOutline sx={{ marginRight: '3px' }}></BookmarkCheckOutline>
        <Typography>1: Course</Typography>
      </Box> */}
      <Box>
        <Typography fontWeight={700}>Document: </Typography>
        <Typography
          component={'a'}
          sx={{
            textDecorationLine: 'underline',
            color: theme => theme.palette.info.light,
            pl: 3
          }}
        >
          {data.giaoTrinhData?.giaoTrinhName}
        </Typography>
      </Box>

      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => {
          onClickViewDetail(data)
        }}
      >
        View details
      </Button>
    </Card>
  )
}
