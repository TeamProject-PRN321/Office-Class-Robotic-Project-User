// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { CubeOutline, HumanMaleBoard } from 'mdi-material-ui'

const StudentNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home page',
      icon: HomeOutline,
      path: '/'
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
    }
  ]
}

export default StudentNavigation
