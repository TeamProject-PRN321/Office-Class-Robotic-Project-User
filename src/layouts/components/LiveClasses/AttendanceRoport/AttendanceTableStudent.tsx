import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses
} from '@mui/material'
import * as React from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

function createData(StudentID: string, StudentName: string, Class: string, Attendance: string, isAttendance: boolean) {
  return { StudentID, StudentName, Class, Attendance, isAttendance } as Student
}

const rows = [
  createData('SE150627', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150628', 'Nguyễn Thành Nhân', 'C#', 'Absent', false),
  createData('SE150629', 'Nguyễn Ngọc Thái Vĩ', 'C#', 'Absent', false),
  createData('SE150630', 'Nguyễn Thanh Duy', 'C#', 'Absent', false),
  createData('SE150631', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150632', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150633', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150634', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150635', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150636', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150637', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150638', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150639', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150640', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150641', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150642', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false),
  createData('SE150643', 'Trần Thiện Quốc Anh', 'C#', 'Absent', false)
]

type Student = { StudentID: string; StudentName: string; Class: string; Attendance: string; isAttendance?: boolean }

const RowData = ({
  data,
  handleCheckAttendance
}: {
  data: Student
  handleCheckAttendance: (studentId: string) => void
}) => {
  return (
    <StyledTableRow key={data.StudentID}>
      <StyledTableCell component='th' scope='row'>
        {data.StudentID}
      </StyledTableCell>
      <StyledTableCell align='left'>{data.StudentName}</StyledTableCell>
      <StyledTableCell align='center'>{data.Class}</StyledTableCell>
      <StyledTableCell align='center'>
        <Button
          sx={{
            width: '100px',
            backgroundColor: data.isAttendance ? 'green' : '#FF8066',
            color: '#E0F4FD !important',
            ':hover': { backgroundColor: data.isAttendance ? 'green' : '#FF8066', color: '#E0F4FD' }
          }}
          onClick={() => {
            handleCheckAttendance(data.StudentID)
          }}
        >
          {data.isAttendance ? 'Present' : 'Absent'}
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default function AttendanceTableStudent() {
  const [lst, setLst] = React.useState<Student[]>(rows)

  const handleCheckAttendance = (studentId: string) => {
    const studentIndex = lst.findIndex(x => x.StudentID === studentId)
    if (studentIndex < 0) {
      console.log('Không tìm thấy studentId ' + studentId)

      return
    }

    const newLst = [...lst]
    const newStudent = newLst[studentIndex]
    newStudent.isAttendance = !newStudent.isAttendance
    setLst([...newLst])
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Student ID</StyledTableCell>
            <StyledTableCell align='left'>Student Name</StyledTableCell>
            <StyledTableCell align='center'>Class</StyledTableCell>
            <StyledTableCell align='center'>Attendance</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <RowData key={row.StudentID} data={row} handleCheckAttendance={handleCheckAttendance} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
