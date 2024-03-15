// ** Icon imports
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { HumanMaleBoard, Laptop, SchoolOutline } from 'mdi-material-ui'

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
      path: '/subjects'
    },
    {
      title: 'Professor',
      icon: HumanMaleBoard,
      path: '/teachers'
    },
    {
      title: 'Device',
      icon: Laptop,
      path: '/devices'
    },
    {
      sectionTitle: 'Setting'
    }
  ]
}

export default navigationAdmin
