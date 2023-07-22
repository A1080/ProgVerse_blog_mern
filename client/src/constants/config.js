// API_NOTIFICATION_MSG
export const API_NOTIFICATION_MESSAGE={
    // if we have loader
    loading:{
        title:'Loading...',
        message:'Data is being loaded, Please Wait'
    },
    success:{
        title:'Success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message:'An error occured while fetching response from the server , Please try again'
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while parsing request data'
    },
    networkError:{
        title:'Error',
        message:'Unable to connect with the server. Please check internet connectivity and try again'
    }
}

// API SERVICE URL
// sample request
// NEED SERVICE CALL:{url:'/',method:'POST/GET/PUT/DELETE' ,params:true/false,query:true/false}
export const SERVICE_URLS={
    // it is taking endpoint to the request and method
    userSignup:{url:'/signup',method:'POST'},
    // for login
    userLogin:{url:'/login',method:'POST'},
    // for categories extracting
    uploadFile:{url:'/file/upload',method:'POST'},
    // to save the post
    createPost:{url:'create',method:'POST'},
    // fetch all post in the home
    // getAllPosts:{url:'/posts',method:'GET'}
    // after passing params
    getAllPosts:{url:'/posts',method:'GET',params:true},
    // api call for fetch data of blog
    getPostById:{url:'post',method:'GET',query:true},
    // api call for update
    updatePost:{url:'update',method:'PUT',query:true},
    // api call for delete
    deletePost:{url:'delete',method:'DELETE',query:true},
    // api call for add comment
    newComment:{url:'/comment/new',method:'POST'},
    getAllComments:{url:'comments',method:'GET',query:true},
    deleteComment:{url:'comment/delete',method:'DELETE',query:true}
}