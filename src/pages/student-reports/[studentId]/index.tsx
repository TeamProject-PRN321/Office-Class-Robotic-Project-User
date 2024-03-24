import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'
import ReportCard from 'src/layouts/components/ReportStudent/ReportCard'

export default function App() {
  const route = useRouter()

  const studentId = route.query.studentId as string

  return <ReportCard studentId={studentId}></ReportCard>
}
