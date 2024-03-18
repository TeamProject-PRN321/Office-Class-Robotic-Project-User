// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import * as React from 'react'
import { Box, Button, Card } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { useState } from 'react'

import * as XLSX from 'xlsx'
import StudentListGrade from 'src/views/students/StudentListGrade'
import axios from 'axios'
import { toast } from 'react-toastify'

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

  const handelFileUpload = (e: any) => {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = e => {
      const data = e.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet)
      setData(parsedData)
    }
  }

  const handleDownload = async () => {
    const isConfirmed = window.confirm('Bạn có muốn tải về danh sách học sinh trong lớp này?')
    if (isConfirmed) {
      try {
        //chỗ này thêm classname
        const className = 'WDU202'
        const response: any = await axios.get('https://localhost:7254/api/v1/grade/get-list-grade/' + className)

        if (response?.data) {
          const url = response.data
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.download = className + '_StudentList.xlsx'
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          toast.success('Download file successfully.')
        }
      } catch (error) {
        console.log('error', error)
        toast.error('Download file fail.')
      }
    }
  }

  // const handleUploadFileStudentGrade = async () => {
  //   try {
  //     const formData = new FormData()
  //     formData.append('pdf', imgData)
  //     const response = await axios.post('http://localhost:3000/api/upload', formData)
  //     console.log(response.data.done[0])

  //     return response.data.done[0].filepath.split('\\public')[1]
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <Button
          sx={{
            ':hover': {
              backgroundColor: '#845EC2',
              color: 'whitesmoke'
            }
          }}
          component='label'
          role={undefined}
          variant='outlined'
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload score student
          <VisuallyHiddenInput type='file' />
        </Button>
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
          >
            Download file excel
          </Button>
        </Box>
      </Grid> */}

      <Grid container item xs={12} spacing={2}>
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
            Upload score student
            <VisuallyHiddenInput type='file' />
          </Button>
        </Grid>
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
      </Grid>

      <Grid item xs={12}>
        {data.length > 0 && (
          <table className='table'>
            <thead>
              <tr style={{ justifyContent: 'center' }}>
                {Object.keys(data[0]).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ justifyContent: 'center' }}>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value: any, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Grid>

      <Grid item xs={12}>
        <Card>
          <StudentListGrade></StudentListGrade>
        </Card>
      </Grid>
    </Grid>
  )
}

export default StudentLists
