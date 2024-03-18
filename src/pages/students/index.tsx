// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import * as React from 'react'
import { Box, Button, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { useState } from 'react'

import * as XLSX from 'xlsx'

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
      <TextField
        variant='outlined'
        inputProps={{ accept: '.xlsx,.xls' }}
        type='file'
        onChange={handelFileUpload}
      ></TextField>
      <Grid container item xs={12}>
        <Grid item xs={6} spacing={1}>
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
        </Grid>
        <Grid item xs={6} spacing={2}>
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
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {data.length > 0 && (
          <table className='table'>
            <thead>
              <tr>
                {Object.keys(data[0]).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
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

      {/* <Grid item xs={12}>
        <Card>
          <StudentListGrade></StudentListGrade>
        </Card>
      </Grid> */}
    </Grid>
  )
}

export default StudentLists
