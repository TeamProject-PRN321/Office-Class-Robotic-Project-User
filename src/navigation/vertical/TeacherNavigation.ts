// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { SchoolOutline } from 'mdi-material-ui'

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
      sectionTitle: 'Setting'
    }
  ]
}

export default TeacherNavigation
