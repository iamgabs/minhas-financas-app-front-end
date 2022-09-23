import axios from "axios" 

const httpClient = axios.create({
    baseURL:'http://localhost:8080'
})

class ApiService {
    constructor(apiUrl){
        this.apiUrl = apiUrl
    }

    get(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.get(requestUrl)
    } 

    post(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.post(requestUrl, objeto)
    }   

    put(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.put(requestUrl, objeto)
    } 
    
    delete(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.delete(requestUrl)
    } 
}

export default ApiService