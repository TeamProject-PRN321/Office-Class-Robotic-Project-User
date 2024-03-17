// ** Icon imports
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { AccountCogOutline, HumanMaleBoard, Laptop, SchoolOutline } from 'mdi-material-ui'

const navigation = (): VerticalNavItemsType => {
  // if (typeof window === 'undefined') {
  //   return [
  //     {
  //       title: 'Dashboard',
  //       icon: HomeOutline,
  //       path: '/'
  //     }
  //   ]
  // }
  // const decodeToken = jwtDecode(localStorage.getItem('ACCESS_TOKEN') || '')

  // // Role ADMIN
  // if ((decodeToken as JwtDecodeModel).role === 'Admin') {
  //   return [
  //     {
  //       title: 'Dashboard',
  //       icon: HomeOutline,
  //       path: '/'
  //     },

  //     {
  //       title: 'Class',
  //       icon: SchoolOutline,
  //       path: '/classes'
  //     },
  //     {
  //       title: 'Schedule',
  //       icon: CubeOutline,
  //       path: '/subjects'
  //     },
  //     {
  //       title: 'Professor',
  //       icon: HumanMaleBoard,
  //       path: '/teachers'
  //     },

  //     {
  //       title: 'Device',
  //       icon: Laptop,
  //       path: '/devices'
  //     },
  //     {
  //       sectionTitle: 'Setting'
  //     }
  //   ]
  // }

  // if ((decodeToken as JwtDecodeModel).role === 'Teacher') {
  //   return [
  //     {
  //       title: 'Dashboard',
  //       icon: HomeOutline,
  //       path: '/'
  //     },
  //     {
  //       title: 'Class',
  //       icon: SchoolOutline,
  //       path: '/classes'
  //     },
  //     {
  //       sectionTitle: 'Setting'
  //     }
  //   ]
  // }

  // if ((decodeToken as JwtDecodeModel).role === 'Student') {
  //   return [
  //     {
  //       title: 'Dashboard',
  //       icon: HomeOutline,
  //       path: '/'
  //     },
  //     {
  //       title: 'Class',
  //       icon: SchoolOutline,
  //       path: '/classes'
  //     },
  //     {
  //       title: 'Professor',
  //       icon: HumanMaleBoard,
  //       path: '/teachers'
  //     }
  //   ]
  // }

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
    },

    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    }

    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login'
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
