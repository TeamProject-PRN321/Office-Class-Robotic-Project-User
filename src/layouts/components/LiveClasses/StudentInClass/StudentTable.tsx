import {
  Chip,
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
import { StudentModel } from '../HistoryClasses'

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

const RowData = ({ data }: { data: StudentModel }) => {
  return (
    <StyledTableRow key={data.studentId}>
      <StyledTableCell align='left'>{data.studentName}</StyledTableCell>
      <StyledTableCell align='center'>{data.className}</StyledTableCell>
      <StyledTableCell align='center'>{handleCheckStatus(data.attendanceStatus)}</StyledTableCell>
    </StyledTableRow>
  )
}

const handleCheckStatus = (status: number) => {
  if (status == 0) {
    return <Chip color='warning' label={'ABSENT'}></Chip>
  }
  if (status == 1) {
    return <Chip color='success' label={'PRESENT'}></Chip>
  }
  if (status == 2) {
    return <Chip color='error' label={'Not yet'}></Chip>
  }
}

export default function StudentTable({ students }: { students: StudentModel[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Student Name</StyledTableCell>
            <StyledTableCell align='center'>Class</StyledTableCell>
            <StyledTableCell align='center'>Attendance</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(row => (
            <RowData key={row.studentId} data={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
