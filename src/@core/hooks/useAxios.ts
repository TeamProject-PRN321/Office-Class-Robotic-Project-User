import { useContext } from 'react'
import { AxiosContext, AxiosContextModelValue } from '../context/axiosContext'

const useAxios = (): AxiosContextModelValue => useContext(AxiosContext)

export default useAxios
