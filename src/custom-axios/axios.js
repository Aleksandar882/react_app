import axios from "axios";

const instance=axios.create({
    baseURL : 'https://book-app-backend-lab2.herokuapp.com/api',
    headers: {
     'Access-Control-Allow-Origin' : '*'
    }
})



export default instance;