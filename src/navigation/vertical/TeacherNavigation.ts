// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { Laptop, SchoolOutline } from 'mdi-material-ui'
import { Schedule } from '@mui/icons-material'

const TeacherNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Class',
      icon: SchoolOutline,
      path: '/classes'
    },
    {
      title: 'Subject',
      icon: Schedule,
      path: '/subjects'
    },
    {
      title: 'Device',
      icon: Laptop,
      path: '/devices'
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

export default TeacherNavigation
