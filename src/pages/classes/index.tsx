// ** MUI Imports
import Grid from '@mui/material/Grid'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  styled
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import * as React from 'react'

import { Plus } from 'mdi-material-ui'
import LiveClassItems from 'src/layouts/components/LiveClasses/LiveClassesItem'

import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import HistoryClasses from 'src/layouts/components/LiveClasses/HistoryClasses'
import HistoryClassesReport from 'src/layouts/components/LiveClasses/HistoryClassesReport'
import { CloudUpload, SchoolOutlined } from '@mui/icons-material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const classnames = [
  {
    value: 'C#',
    label: 'C#'
  },
  {
    value: 'Java',
    label: 'Java'
  },
  {
    value: 'PHP',
    label: 'PHP'
  },
  {
    value: 'React JS',
    label: 'React JS'
  }
]

const teachers = [
  {
    value: 'Trần Duy Thanh',
    label: 'Trần Duy Thanh'
  },
  {
    value: 'Trần Duy Bảo',
    label: 'Trần Duy Bảo'
  },
  {
    value: 'Bùi Thành Công',
    label: 'Bùi Thành Công'
  }
]

const classrooms = [
  {
    value: 'P.203',
    label: 'P.203'
  },
  {
    value: 'P.103',
    label: 'P.103'
  },
  {
    value: 'P.303',
    label: 'P.303'
  }
]

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function App() {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  //Dialog add new class
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab sx={{ fontWeight: 'bold' }} value='1' label='Live Class' />
          <Tab sx={{ fontWeight: 'bold' }} value='2' label='Class History' />
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
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}> Live Classes</Typography>
                <Button
                  sx={{
                    backgroundColor: '#C4FCEF',
                    color: '#50bf62',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    ':hover': {
                      color: 'white',
                      backgroundColor: '#0081CF'
                    }
                  }}
                  onClick={handleClickOpen}
                >
                  <Plus sx={{ marginRight: '2px', fontSize: '16px' }}></Plus>
                  Add Class
                </Button>
                <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
                  <DialogTitle
                    sx={{ m: 0, p: 2, textAlign: 'center', fontWeight: 'bold' }}
                    id='customized-dialog-title'
                  >
                    Add New Class
                  </DialogTitle>
                  <IconButton
                    aria-label='close'
                    onClick={handleClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: theme => theme.palette.grey[500]
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2' }}>
                    <TextField
                      label='Class Name'
                      id='outlined-start-adornment'
                      placeholder='Please enter class name'
                      sx={{ m: 3, width: '75ch' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SchoolOutlined></SchoolOutlined>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Button
                      component='label'
                      role={undefined}
                      variant='contained'
                      tabIndex={-1}
                      startIcon={<CloudUpload />}
                      sx={{
                        backgroundColor: '#B9C6BB',
                        m: 3,
                        width: '75ch',
                        alignItems: 'center',
                        textAlign: 'center'
                      }}
                    >
                      Upload Class Materials
                      <VisuallyHiddenInput type='file' />
                    </Button>
                    <TextField
                      id='outlined-select-currency'
                      select
                      label='Select'
                      defaultValue='Java'
                      helperText='Please select Subject'
                      sx={{
                        m: 3,
                        width: '75ch'
                      }}
                    >
                      {classnames.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id='outlined-select-currency'
                      select
                      label='Select'
                      defaultValue='Trần Duy Thanh'
                      helperText='Please select Teacher'
                      sx={{
                        m: 3,
                        width: '75ch'
                      }}
                    >
                      {teachers.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id='outlined-select-currency'
                      select
                      label='Select'
                      defaultValue='P.303'
                      helperText='Please select Classroom'
                      sx={{
                        m: 3,
                        width: '75ch'
                      }}
                    >
                      {classrooms.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Save changes
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
              </Grid>
              <Grid item>
                <LiveClassItems></LiveClassItems>
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
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Class History</Typography>
                <Button
                  sx={{
                    backgroundColor: '#C4FCEF',
                    color: '#50bf62',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    ':hover': {
                      color: 'white',
                      backgroundColor: '#0081CF'
                    }
                  }}
                  onClick={handleClickOpen}
                >
                  <Plus
                    sx={{
                      marginRight: '2px',
                      fontSize: '16px'
                    }}
                  ></Plus>
                  Add Class
                </Button>
                <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
                  <DialogTitle
                    sx={{ m: 0, p: 2, textAlign: 'center', fontWeight: 'bold' }}
                    id='customized-dialog-title'
                  >
                    Add New Class
                  </DialogTitle>
                  <IconButton
                    aria-label='close'
                    onClick={handleClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: theme => theme.palette.grey[500]
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2' }}>
                    <TextField
                      label='Class Name'
                      id='outlined-start-adornment'
                      placeholder='Please enter class name'
                      sx={{ m: 3, width: '75ch' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SchoolOutlined></SchoolOutlined>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Button
                      component='label'
                      role={undefined}
                      variant='contained'
                      tabIndex={-1}
                      startIcon={<CloudUpload />}
                      sx={{
                        backgroundColor: '#B9C6BB',
                        m: 3,
                        width: '75ch',
                        alignItems: 'center',
                        textAlign: 'center'
                      }}
                    >
                      Upload Class Materials
                      <VisuallyHiddenInput type='file' />
                    </Button>
                    <TextField
                      id='outlined-select-currency'
                      select
                      label='Select'
                      defaultValue='Java'
                      helperText='Please select Subject'
                      sx={{
                        m: 3,
                        width: '75ch'
                      }}
                    >
                      {classnames.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id='outlined-select-currency'
                      select
                      label='Select'
                      defaultValue='Trần Duy Thanh'
                      helperText='Please select Teacher'
                      sx={{
                        m: 3,
                        width: '75ch'
                      }}
                    >
                      {teachers.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id='outlined-select-currency'
                      select
                      label='Select'
                      defaultValue='P.303'
                      helperText='Please select Classroom'
                      sx={{
                        m: 3,
                        width: '75ch'
                      }}
                    >
                      {classrooms.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Save changes
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </Grid>
              <Grid item>
                <HistoryClasses></HistoryClasses>
              </Grid>
              <Grid item>
                <HistoryClassesReport></HistoryClassesReport>
              </Grid>
              <Grid item>
                <HistoryClasses></HistoryClasses>
              </Grid>
              <Grid item>
                <HistoryClassesReport></HistoryClassesReport>
              </Grid>
              <Grid item>
                <HistoryClassesReport></HistoryClassesReport>
              </Grid>
              <Grid item>
                <HistoryClasses></HistoryClasses>
              </Grid>
              <Grid item>
                <HistoryClassesReport></HistoryClassesReport>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}
