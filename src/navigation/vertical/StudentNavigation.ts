// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { HumanMaleBoard, SchoolOutline } from 'mdi-material-ui'

const StudentNavigation = (): VerticalNavItemsType => {
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
      title: 'Professor',
      icon: HumanMaleBoard,
      path: '/teachers'
    }
  ]
}

export default StudentNavigation
