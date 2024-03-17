import { ReactNode, createContext, useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios'
import { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'

export type AppUser = {
  username: string
  password: string
  accessToken: string
}

export type UserLoginContextModel = {
  user: AppUser
}

type LoginModel = { username: string; password: string }

export type UserLoginContext = {
  userLogin: UserLoginContextModel
  login: (data: LoginModel) => Promise<boolean>
  toggleRemember: (value: boolean) => void
  logout: () => void
  isLogin: () => boolean
  role: string
  Id: string
}

const initialAuth = {
  user: {
    accessToken: '',
    message: '',
    password: '',
    username: ''
  }
} as UserLoginContextModel

export const AuthContext = createContext<UserLoginContext>({
  userLogin: initialAuth,
  login: () => {
    return Promise.resolve(false)
  },
  toggleRemember: function () {
    return
  },
  logout: () => {
    return
  },
  isLogin: () => {
    return false
  },
  role: '',
  Id: ''
})

export interface JwtDecodeModel {
  email: string
  sub: string
  jti: string
  Id: string
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string
  role: string
  exp: number
  iss: string
  aud: string
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userLogin, setUserLogin] = useState<UserLoginContextModel>(initialAuth)
  const [role, setRole] = useState<string>('')
  const [Uid, setUid] = useState<string>('')
  const [isRemember, setIsRemember] = useState<boolean>(false)
  const { call } = useAxios()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const jsonString = localStorage.getItem('ACCOUNT')
      jsonString && localStorage.setItem('ACCOUNT', jsonString)
      const dataUser = jsonString ? (JSON.parse(jsonString) as UserLoginContextModel) : initialAuth
      const token = localStorage.getItem('ACCESS_TOKEN') || ''
      console.log({ token, dataUser, jsonString })

      if (!token) {
        login({
          username: dataUser.user.username,
          password: dataUser.user.password
        })
      } else {
        if (router.pathname.includes('/login')) {
          router.push('/')
        }

        try {
          const decodeToken = jwtDecode(token)
          console.log(decodeToken)

          setRole((decodeToken as JwtDecodeModel).role)
          setUid((decodeToken as JwtDecodeModel).Id)
        } catch (error) {
          console.log('Invalid token: ' + error)
        }
      }

      if (jsonString) {
        setUserLogin({
          ...userLogin,
          user: {
            ...userLogin.user,
            ...dataUser,
            accessToken: token
          }
        } as UserLoginContextModel)
      } else {
        if (!token) logout()
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('ACCOUNT')
    localStorage.removeItem('ACCESS_TOKEN')
    setUserLogin(initialAuth)
    router.push('/pages/login')
  }

  const isLogin = () => {
    return !!userLogin.user.accessToken
  }

  const login = async (data: LoginModel) => {
    try {
      const response = await call('post', '/Account/login', data, true)
      console.log(response)

      handleRememberUserInfo(data)
      setUserLogin({
        ...userLogin,
        user: {
          ...userLogin.user,
          ...response,
          ...data
        }
      })

      try {
        const decodeToken = jwtDecode(response?.accessToken)
        localStorage.setItem('ACCESS_TOKEN', JSON.stringify(response.accessToken))

        setRole((decodeToken as JwtDecodeModel).role)
        setUid((decodeToken as JwtDecodeModel).Id)
      } catch (error) {
        console.log('Invalid token: ' + error)

        throw error
      }

      return Promise.resolve(response)
    } catch (error) {
      console.log(error)

      return false
    }
  }

  const handleRememberUserInfo = (data: LoginModel) => {
    if (!isRemember) {
      return
    }

    if (typeof window === 'undefined') return

    localStorage.setItem('ACCOUNT', JSON.stringify({ user: data }))
  }

  const toggleRemember = (value: boolean) => {
    setIsRemember(value)
  }

  return (
    <AuthContext.Provider value={{ userLogin, login, toggleRemember, logout, isLogin, role, Id: Uid }}>
      {children}
    </AuthContext.Provider>
  )
}
