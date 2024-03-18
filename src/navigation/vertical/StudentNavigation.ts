// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { CubeOutline, HumanMaleBoard, SchoolOutline } from 'mdi-material-ui'
import { Schedule } from '@mui/icons-material'

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
