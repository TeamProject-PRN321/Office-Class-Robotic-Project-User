// ** Icon imports
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { HumanMaleBoard, Laptop, SchoolOutline } from 'mdi-material-ui'
import { Schedule } from '@mui/icons-material'

const navigationAdmin = (): VerticalNavItemsType => {
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
      title: 'Schedule',
      icon: CubeOutline,
      path: '/schedule'
    },
    {
      title: 'Professor',
      icon: HumanMaleBoard,
      path: '/teachers'
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
      sectionTitle: 'Setting'
    },
    {
      title: 'Account',
      icon: SchoolOutline,
      path: '/account-settings'
    }
  ]
}

export default navigationAdmin
