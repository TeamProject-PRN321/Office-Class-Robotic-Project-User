// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { SchoolOutline } from 'mdi-material-ui'
import { Schedule } from '@mui/icons-material'

const TeacherNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
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
      sectionTitle: 'Setting'
    },
    {
      title: 'Account',
      icon: SchoolOutline,
      path: '/account-settings'
    }
  ]
}

export default TeacherNavigation
