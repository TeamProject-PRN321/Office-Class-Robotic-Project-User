// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { CubeOutline, HumanMaleBoard, SchoolOutline } from 'mdi-material-ui'
import { ReportOutlined, Schedule } from '@mui/icons-material'

const StudentNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Schedule',
      icon: CubeOutline,
      path: '/schedule'
    },
    {
      title: 'Subject',
      icon: Schedule,
      path: '/subjects'
    },
    {
      title: 'Professor',
      icon: HumanMaleBoard,
      path: '/teachers'
    },
    {
      sectionTitle: 'Report'
    },

    // {
    //   title: 'Report',
    //   icon: ReportOutlined,
    //   path: '/student-reports'
    // },
    {
      sectionTitle: 'Information'
    },
    {
      title: 'Account',
      icon: SchoolOutline,
      path: '/account-settings'
    }
  ]
}

export default StudentNavigation
