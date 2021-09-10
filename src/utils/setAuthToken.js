import axios from 'axios';

const setAuthToken = (token)=>{

    if(token){

        axios.defaults.headers.common['x-auth-token'] = token
        //setting global token
    }else{
        delete axios.defaults.headers.common['x-auth-token'] 
        //removing global headers
    }
}

export default setAuthToken