import axios from 'axios'

const newAxios = axios.create({
    baseURL: 'http://localhost:4200/'
})
newAxios.interceptors.request.use((request)=>{
    console.log('Client: request sent successfully')
    return request
}, error=>{
    console.log('Client: request unsuccessful')
    return Promise.reject(error)
})

newAxios.interceptors.response.use((response)=>{
    console.log('Server: response arrived successfully')
    return response
}, error=>{
    console.log('Server: response unsuccessful')
    return Promise.reject(error)
})

export default newAxios