import { useContext } from 'react'
import { AuthContext, UserLoginContext } from '../context/ContextAUTH'

const useAuth = (): UserLoginContext => useContext(AuthContext)

export default useAuth
