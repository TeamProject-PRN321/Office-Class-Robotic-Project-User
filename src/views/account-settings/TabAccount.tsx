// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import useAuth from 'src/@core/hooks/useAuth'
import useAxios from 'src/@core/hooks/useAxios'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

export interface ProfileModel {
  userName: string
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  address: string
  photoUrl: string
  studentId?: string
  parent?: ProfileModel
  parentId?: string
}

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [date, setDate] = useState<Date | null | undefined>(null)

  // const [usernames, setUsername] = useState<string>('');
  // const [fullname, setFullname] = useState<string>('');
  // const [email, setEmail] = useState<string>('')
  // const [phone, setPhone] = useState<string>('')
  // const [birthday, setBirthday] = useState<string>('')
  // const [gender, setGender] = useState<string>('')
  // const [address, setAddress] = useState<string>('')
  // const [photo, setPhoto] = useState<string>('')

  const [profile, setProfile] = useState<ProfileModel>({} as ProfileModel)

  const auth = useAuth()
  const axios = useAxios()

  useEffect(() => {
    const handelProfile = async () => {
      try {
        if (!auth.Id) return

        const data = await axios.call('get', '/api/v1/student/get-student-by-student-id/' + auth.Id)
        setProfile(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    handelProfile()
  }, [auth.Id])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={(file: ChangeEvent) => {
                      const reader = new FileReader()
                      const { files } = file.target as HTMLInputElement
                      if (files && files.length !== 0) {
                        reader.onload = () => setImgSrc(reader.result as string)

                        reader.readAsDataURL(files[0])
                      }
                    }}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                    value={profile.photoUrl}
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Username' value={profile.userName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' value={profile.fullName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='email' label='Email' value={profile.email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Phone' value={profile.phoneNumber} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-id'
                placeholderText='DD-MM-YYYY'
                customInput={<CustomInput />}
                onChange={(date: Date | null) => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row defaultValue='male' aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='editor'>Teacher</MenuItem>
                <MenuItem value='maintainer'>Student</MenuItem>
                <MenuItem value='subscriber'>Parent</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
          </Grid> */}

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
