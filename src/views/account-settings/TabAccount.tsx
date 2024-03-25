// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import { Autocomplete, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import useAxios from 'src/@core/hooks/useAxios'
import { toast } from 'react-toastify'
import axios from 'axios'
import moment from 'moment'
import { ErrorModel } from 'src/layouts/components/Subject/AddSubject/NewSubjectForm'
import * as Yup from 'yup'
import { PHONE_REGEX } from 'src/@core/layouts/utils'
import { Field, FieldProps, Form, Formik } from 'formik'

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
  role: string
  studentId?: string
  parent?: ProfileModel
  parentID?: string
  photo: any | null
}

const initial = {
  userName: '',
  fullName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: 'male',
  address: '',
  photoUrl: '',
  photo: null
} as ProfileModel

export interface ParentModel {
  id: string
  name: string
  address: string
  phone: string
  birthday: string
  created: string
}

const validationSchema = Yup.object<ProfileModel>({
  userName: Yup.string().required('This field is required.'),
  fullName: Yup.string().required('This field is required.'),
  email: Yup.string().required('This field is required.').email('This field is invalid.'),
  phoneNumber: Yup.string().required('This field is required.').matches(PHONE_REGEX, 'Phone is invalid'),
  dateOfBirth: Yup.string()
    .test('range', 'Age must from 18 to 80', value => {
      return (
        moment().get('years') - moment(value).get('years') <= 80 &&
        moment().get('years') - moment(value).get('years') >= 18
      )
    })
    .required('This field is required.'),
  gender: Yup.string().required('This field is required.'),
  address: Yup.string().required('This field is required.'),
  parentID: Yup.string().when('role', {
    is: (value: string) => value === 'student',
    then: () => Yup.string().required('Parent ID is required for students'),
    otherwise: () => Yup.string() // Allow null for non-students
  }),
  photo: Yup.mixed().required('This field is required.')
})

const TabAccount = ({ value }: { value: string }) => {
  // ** State
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [imgData, setImgData] = useState<any>()
  const [parents, setParents] = useState<ParentModel[]>([])

  const axiosClient = useAxios()

  useEffect(() => {
    const fetchAllParent = async () => {
      try {
        const response = await axiosClient.call('get', '/api/v1/parent/get-all-parent')

        setParents(response as ParentModel[])
      } catch (error) {}
    }

    fetchAllParent()
  }, [value])

  const handleUploadFile = async () => {
    try {
      const formData = new FormData()
      formData.append('pdf', imgData)
      const response = await axios.post('http://localhost:3000/api/upload', formData)
      console.log(response.data.done[0])

      return response.data.done[0].filepath.split('\\public')[1]
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      switch (value) {
        case 'new-student-account':
          await submit('/Account/register-student-account', data)
          break
        case 'new-admin-account':
          await submit('/Account/register-admin-account', data)
          break
        case 'new-parent-account':
          await submit('/Account/register-parents-account', data)
          break
        case 'new-teacher-account':
          await submit('/Account/register-teacher-account', data)
          break
        default:
          break
      }
    } catch (error) {
      throw error
    }
  }

  const submit = async (url: string, data: ProfileModel) => {
    try {
      const imgUrl = await handleUploadFile()
      await axiosClient.call('post', url, {
        ...data,
        photoUrl: imgUrl,
        dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD')
      } as ProfileModel)
      toast.success('Created Successfully!!!')
    } catch (error: any) {
      console.log(error?.response.data)
      const title = (error?.response.data as ErrorModel).title
      if (title) {
        toast.error(title)
      }

      throw error
    }
  }

  return (
    <CardContent>
      <Formik<ProfileModel>
        initialValues={{
          ...initial,
          photo: null,
          ...(value === 'new-student-account' && {
            role: 'student',
            parentID: ''
          })
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            console.log('submit', values)
            await handleSubmit(values)
            resetForm()
          } catch (error) {}
        }}
      >
        {({}) => (
          <Form>
            <Grid container spacing={7}>
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Field name='photo'>
                  {({ field, meta, form }: FieldProps) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ImgStyled src={!!field.value ? imgSrc : '/images/avatars/1.png'} alt='Profile Pic' />
                      <Box>
                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                          Upload New Photo
                          <input
                            hidden
                            type='file'
                            onChange={(file: ChangeEvent) => {
                              const reader = new FileReader()
                              const { files } = file.target as HTMLInputElement
                              if (!files) return

                              setImgData(files[0])
                              form.setFieldValue(field.name, files[0])
                              if (files && files.length !== 0) {
                                reader.onload = () => setImgSrc(reader.result as string)

                                reader.readAsDataURL(files[0])
                              }
                            }}
                            accept='image/png, image/jpeg'
                            id='account-settings-upload-image'
                            value={''}
                          />
                        </ButtonStyled>
                        <ResetButtonStyled
                          color='error'
                          variant='outlined'
                          onClick={() => {
                            setImgSrc('/images/avatars/1.png')
                            form.setFieldValue(field.name, '/images/avatars/1.png')
                          }}
                        >
                          Reset
                        </ResetButtonStyled>
                        <Typography variant='body2' sx={{ marginTop: 5 }}>
                          Allowed PNG or JPEG. Max size of 800K.
                        </Typography>
                        <FormHelperText error={meta.touched && !!meta.error}>
                          {meta.touched && meta.error ? meta.error : ''}
                        </FormHelperText>
                      </Box>
                    </Box>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name='userName'>
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Username'
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name='fullName'>
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Name'
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name='email'>
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Email'
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name='phoneNumber'>
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Phone'
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name='address'>
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Address'
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name='dateOfBirth'>
                  {({ field, meta, form }: FieldProps) => (
                    <DatePickerWrapper>
                      <DatePicker
                        value={field.value}
                        selected={form.values[field.name] ? moment(form.values[field.name]).toDate() : null}
                        minDate={moment().subtract(80, 'year').startOf('year').toDate()}
                        maxDate={moment().subtract(18, 'year').endOf('year').toDate()}
                        showYearDropdown
                        showMonthDropdown
                        autoComplete='off'
                        placeholderText='YYYY-MM-DD'
                        dateFormat={'yyyy-MM-dd'}
                        customInput={
                          <TextField
                            label='Birth Date'
                            fullWidth
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error ? meta.error : ''}
                          />
                        }
                        onChange={(date: Date | null) => {
                          if (date) {
                            form.setFieldValue(field.name, date)
                          } else {
                            form.setFieldValue(field.name, '')
                          }
                        }}
                      />
                    </DatePickerWrapper>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name='gender'>
                  {({ field, meta, form }: FieldProps) => (
                    <FormControl>
                      <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
                      <RadioGroup
                        {...field}
                        row
                        defaultValue='male'
                        aria-label='gender'
                        name='account-settings-info-radio'
                        value={field.value}
                        onChange={e => {
                          form.setFieldValue(field.name, e.currentTarget.value)
                        }}
                      >
                        <FormControlLabel value='male' label='Male' control={<Radio />} />
                        <FormControlLabel value='female' label='Female' control={<Radio />} />
                      </RadioGroup>
                      <FormHelperText error={meta.touched && !!meta.error}>
                        {meta.touched && meta.error ? meta.error : ''}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Grid>

              {value === 'new-student-account' && (
                <Field name='parentID'>
                  {({ field, meta, form }: FieldProps) => (
                    <Grid item lg={12} xl={12} md={12} xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Autocomplete
                          fullWidth
                          getOptionLabel={option => option.name}
                          renderInput={params => (
                            <TextField
                              {...field}
                              {...params}
                              label='Parent'
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ''}
                            />
                          )}
                          options={parents}
                          value={parents.filter(p => p.id === field.value).at(0)}
                          onChange={(e, value) => {
                            form.setFieldValue(field.name, value?.id || '')
                          }}
                        />
                      </FormControl>
                    </Grid>

                    // <FormControl>
                    //   <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
                    //   <RadioGroup
                    //     {...field}
                    //     row
                    //     defaultValue='male'
                    //     aria-label='gender'
                    //     name='account-settings-info-radio'
                    //     value={field.value}
                    //     onChange={e => {
                    //       form.setFieldValue(field.name, e.currentTarget.value)
                    //     }}
                    //   >
                    //     <FormControlLabel value='male' label='Male' control={<Radio />} />
                    //     <FormControlLabel value='female' label='Female' control={<Radio />} />
                    //   </RadioGroup>
                    //   <FormHelperText error={meta.touched && !!meta.error}>
                    //     {meta.touched && meta.error ? meta.error : ''}
                    //   </FormHelperText>
                    // </FormControl>
                  )}
                </Field>
              )}
              {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

              {/* {role === 'Student' && (
            <Grid item >
              <Autocomplete />
            </Grid>
          )} */}

              {/* <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
          </Grid> */}

              {/* {openAlert ? (
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
          ) : null} */}
              <Grid item xs={12}>
                <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </CardContent>
  )
}

export default TabAccount
