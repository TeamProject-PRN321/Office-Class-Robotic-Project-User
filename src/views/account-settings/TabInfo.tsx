// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import { Avatar, Box, Divider, List, ListItem, ListItemText } from '@mui/material'
import useAxios from 'src/@core/hooks/useAxios'
import { StudentDetailModel } from 'src/pages/account-settings'
import useAuth from 'src/@core/hooks/useAuth'

const API_GET_STUDENT_DETAIL_MODEL = '/api/v1/student/get-student-by-appuser-id/'

const TabInfo = () => {
  // ** State
  const [studentProfile, setStudentProfile] = useState<StudentDetailModel>({} as StudentDetailModel)

  const axiosClient = useAxios()
  const authen = useAuth()
  const role = authen.role
  const id = authen.Id

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!id) return

        const response = await axiosClient.call('get', API_GET_STUDENT_DETAIL_MODEL + id, null, true)
        setStudentProfile(response)
      } catch (error) {
        console.log(error)
      }
    }

    if (role === 'Student') {
      fetchStudent()
    }

    if (role === 'Teacher') {
    }
  }, [id])

  return (
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Avatar alt={studentProfile.fullName} src={studentProfile.photoUrl} sx={{ width: 120, height: 120 }} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant='h5'>{studentProfile.fullName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider variant='inset' component='div' />
        </Grid>
        <Grid item xs={6}>
          <List dense>
            <ListItem>
              <ListItemText
                primary='Email'
                secondary={studentProfile.email}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Phone Number'
                secondary={studentProfile.phoneNumber}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Date of Birth'
                secondary={studentProfile.dateOfBirth}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Gender'
                secondary={studentProfile.gender}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Address'
                secondary={studentProfile.address}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List dense>
            <ListItem>
              <ListItemText primary='Parent Details' primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
            {studentProfile.parent && (
              <Box pl={5}>
                <ListItem>
                  <ListItemText
                    primary='Name'
                    secondary={studentProfile.parent?.fullName}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary='Email'
                    secondary={studentProfile.parent?.email}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary='Phone Number'
                    secondary={studentProfile.parent?.phoneNumber}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              </Box>
            )}
          </List>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TabInfo
