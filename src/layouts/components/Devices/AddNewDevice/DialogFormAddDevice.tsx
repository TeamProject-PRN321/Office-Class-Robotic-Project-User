import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  styled
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Plus } from 'mdi-material-ui'
import { Fragment, useState } from 'react'
import { Description, Devices, SchoolOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'
import useAxios from 'src/@core/hooks/useAxios'

// export interface NewDeviceCategoryModel {
//   deviceCategoryName: string
//   deviceDescription: string
//   devicePictureURL: string
//   listDevice: ListDeviceSerialNumber[]
// }

export interface ListDeviceSerialNumber {
  deviceSerialNumber: string
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function DialogFormAddDevice() {
  const [open, setOpen] = useState(false)
  const [deviceCategoryName, setDeviceCategoryName] = useState<string>('')
  const [deviceDescription, setDeviceDescription] = useState<string>('')
  const [devicePictureURL, setDevicePictureURL] = useState<string>('')
  const [listDevice, setListDevice] = useState<string[]>([])
  const [currentDeviceSerialNumber, setCurrentDeviceSerialNumber] = useState('')

  const axios = useAxios()

  const submitData = async () => {
    console.log(deviceCategoryName, deviceDescription, devicePictureURL, listDevice)

    const data = {
      deviceCategoryName: deviceCategoryName,
      deviceDescription: deviceDescription,
      devicePictureURL: devicePictureURL,
      listDevice: listDevice.map(deviceSerialNumber => ({ deviceSerialNumber }))
    }

    try {
      await axios.call('post', '/api/v1/device', data)
      toast.success('Add new Device successfully')
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleAddDeviceSerialNumber = () => {
    if (currentDeviceSerialNumber) {
      setListDevice(prevList => [...prevList, currentDeviceSerialNumber])
      setCurrentDeviceSerialNumber('')
    }
  }

  // const handleFileChange = (e) => {
  //   const file = e.currentTarget.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const dataURL = e.target.result;
  //       setDevicePictureURL(dataURL);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <Fragment>
      <Button
        sx={{
          backgroundColor: '#C4FCEF',
          color: '#50bf62',
          fontWeight: 'bold',
          fontSize: '13px',
          textDecoration: 'underline',
          ':hover': {
            color: 'white',
            backgroundColor: '#0081CF'
          }
        }}
        onClick={handleClickOpen}
      >
        <Plus sx={{ marginRight: '2px', fontSize: '16px' }}></Plus>
        Add Device
      </Button>

      <BootstrapDialog
        sx={{ height: '700px' }}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center', fontWeight: 'bold' }} id='customized-dialog-title'>
          Add New Device
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
            label='Device Category Name'
            id='outlined-start-adornment'
            placeholder='Please enter device category name'
            value={deviceCategoryName}
            onChange={e => {
              setDeviceCategoryName(e.target.value)
            }}
            sx={{ m: 2, width: '75ch', fontSize: '15px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Devices></Devices>
                </InputAdornment>
              )
            }}
          />

          <TextField
            label='Description'
            id='outlined-start-adornment'
            placeholder='Please enter description for device'
            multiline
            value={deviceDescription}
            onChange={e => {
              setDeviceDescription(e.target.value)
            }}
            sx={{ m: 2, width: '75ch', fontSize: '15px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Description></Description>
                </InputAdornment>
              )
            }}
          />
          {/* <Input
            id='raised-button-file'
            type='file'
            inputProps={{ accept: 'image/*' }}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor='raised-button-file'>
            <Button variant='contained' component='span' startIcon={<CloudUpload />}>
              Upload
            </Button>
          </label> */}

          <TextField
            label='Image'
            id='outlined-start-adornment'
            placeholder='Please enter Image for device'
            value={devicePictureURL}
            onChange={e => {
              setDevicePictureURL(e.target.value)
            }}
            sx={{ m: 2, width: '75ch', fontSize: '15px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SchoolOutlined></SchoolOutlined>
                </InputAdornment>
              )
            }}
          />

          <Box
            sx={{
              m: 2,
              width: '600px'
            }}
          >
            <Autocomplete
              getOptionLabel={value => value.deviceSerialNumber}
              options={listDevice.map(serialNumber => ({ deviceSerialNumber: serialNumber }))}
              id='auto-complete'
              onChange={(e, value) => {
                if (value) {
                  const selectedSerialNumbers = value.map((item: ListDeviceSerialNumber) => item.deviceSerialNumber)
                  setListDevice(selectedSerialNumbers)
                } else {
                  setListDevice([])
                }
              }}
              multiple={true}
              autoComplete
              includeInputInList
              renderInput={params => (
                <TextField
                  {...params}
                  label='Device Serial Number'
                  variant='standard'
                  value={currentDeviceSerialNumber}
                  onChange={e => setCurrentDeviceSerialNumber(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <IconButton onClick={handleAddDeviceSerialNumber}>
                        <Plus />
                      </IconButton>
                    )
                  }}
                />
              )}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <DialogActions>
            <Button
              autoFocus
              onClick={submitData}
              sx={{
                justifyContent: 'center',
                m: 2,
                backgroundColor: '#E5F2E7',
                ':hover': {
                  fontWeight: 'bold'
                }
              }}
            >
              Save changes
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </Fragment>
  )
}
