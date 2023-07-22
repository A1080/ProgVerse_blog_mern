import axios from 'axios';
import { API_NOTIFICATION_MESSAGE , SERVICE_URLS} from '../constants/config';
import { getAccessToken ,getType} from '../utils/common-utils';
const API_URL='';
// const API_URL='http://localhost:8000'; // here backend server is running

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json"
    }
  });
  

// adding filter feature of blogs according to category
axiosInstance.interceptors.request.use(
    function(config){
      if(config.TYPE.params){
        config.params=config.TYPE.params;
      }
      else if(config.TYPE.query){
        config.url=config.url + '/' + config.TYPE.query;
      }
        return config;
    }
    ,
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        // stop global loader here
        return processResponse(response);
    }
    ,
    function (error){
        // stop global loader here
        return Promise.reject(processError(error));
    }
)
// if success->return {isSuccess:true,data:Object}
// if failure->return {isFailure:true,status:String,msg:string,code:int}
const processResponse=(response)=>{
     if(response?.status===200){
        return {isSuccess:true,data:response.data}
     }
     else{
        return {isFailure:true,
                status:response?.status,
                msg:response?.msg,
                code:response?.code}
     }
}

const processError = (error) => {
    if (error.response) {
      console.log('ERROR IN RESPONSE: ', error.toJSON());
      const { data } = error.response;
      return {
        isError: true,
        msg: data.message || API_NOTIFICATION_MESSAGE.responseFailure,
        code: error.response.status,
      };
    } else if (error.request) {
      console.log('ERROR IN REQUEST: ', error.toJSON());
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSAGE.requestFailure,
        code: "",
      };
    } else {
      console.log('ERROR IN NETWORK: ', error.toJSON());
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSAGE.networkError,
        code: "",
      };
    }
  };
  

// making acutal API
// service url is added in config.js
const API={};

// SAMPLE API is a object so we have to iterate on it to handle every request
for (const[key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body, showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            //  it take object 
            method:value.method,
            url:value.url,
            data:value.method==='DELETE'?{}:body,
            responseType:value.responseType,
            headers:{
              authorization:getAccessToken()
            },
            // checking of params of the posts.jsx
            TYPE:getType(value,body),

            // in this project we are not using the upload and downlaod progress
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
    
}

export {API};