// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import * as React from 'react'
import { Box, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { useState } from 'react'

import * as XLSX from 'xlsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import saveAs from 'file-saver'
import { useRouter } from 'next/router'

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

const StudentLists = () => {
  const [data, setData] = useState<any[]>([])
  const [file, setFile] = useState<any>()

  const route = useRouter()

  const classNames = route.query.classname as string

  const handelFileUpload = (e: any) => {
    const reader = new FileReader()
    setFile(e.target.files[0])
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = e => {
      const data = e.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet)
      setData(parsedData)
    }
    toast.success('Load list student successfully.')
  }

  const handleDownload = async () => {
    const isConfirmed = window.confirm('Do you want to download the list of students in this class ?')
    if (isConfirmed) {
      try {
        axios
          .get('https://localhost:7254/api/v1/grade/get-list-grade/' + classNames, { responseType: 'blob' })
          .then(response => {
            // Log somewhat to show that the browser actually exposes the custom HTTP header
            const fileNameHeader = 'x-suggested-filename'
            const suggestedFileName = response.headers[fileNameHeader]
            const effectiveFileName =
              suggestedFileName === undefined ? classNames + '_Students.xlsx' : suggestedFileName

            // Let the user save the file.
            saveAs(response.data, effectiveFileName)
            toast.success('Download file successfully.')
          })
          .catch(response => {
            console.error('Could not Download the Excel report from the backend.', response)
          })
      } catch (error) {
        console.log('error', error)
        toast.error('Download file fail.')
      }
    }
  }

  const handleUploadFileStudentGrade = async () => {
    const isConfirmed = window.confirm('Are you sure to upload scores in this class ?')
    if (isConfirmed) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        await axios.post('https://localhost:7254/api/v1/grade/api/upload/excel', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        toast.success('Upload score successfully.')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid container item xs={12} spacing={5}>
        <Grid item>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5
            }}
          >
            <Button
              variant='outlined'
              sx={{
                ':hover': {
                  backgroundColor: '#845EC2',
                  color: 'whitesmoke'
                }
              }}
              onClick={() => handleDownload()}
            >
              Download file excel
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Button
            sx={{
              ':hover': {
                backgroundColor: '#845EC2',
                color: 'whitesmoke'
              }
            }}
            onChange={handelFileUpload}
            component='label'
            role={undefined}
            variant='outlined'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            View score student
            <VisuallyHiddenInput type='file' />
          </Button>
        </Grid>

        <Grid item>
          <Button
            sx={{
              ':hover': {
                backgroundColor: '#845EC2',
                color: 'whitesmoke'
              }
            }}
            onClick={handleUploadFileStudentGrade}
            component='label'
            role={undefined}
            variant='outlined'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Update score
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {data.length > 0 && (
          <table className='table'>
            <thead>
              <tr style={{ padding: '10px' }}>
                {Object.keys(data[0]).map(key => (
                  <th style={{ textAlign: 'center', padding: '15px' }} key={key}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value: any, index) => (
                    <td style={{ textAlign: 'center' }} key={index}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Grid>

      {/* <Grid item xs={12}>
        <Card>
          <StudentListGrade></StudentListGrade>
        </Card>
      </Grid> */}
    </Grid>
  )
}

export default StudentLists
