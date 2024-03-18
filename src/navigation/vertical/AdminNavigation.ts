// ** Icon imports
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { HumanMaleBoard, Laptop, SchoolOutline } from 'mdi-material-ui'
import { Person2Outlined, Schedule } from '@mui/icons-material'

const navigationAdmin = (): VerticalNavItemsType => {
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
      title: 'Professor',
      icon: HumanMaleBoard,
      path: '/teachers'
    },
    {
      title: 'Student',
      icon: Person2Outlined,
      path: '/students'
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
