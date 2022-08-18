import axios from "axios";
import Cookies from "js-cookie";
const SERVER = `${process.env.REACT_APP_URL}${process.env.REACT_APP_PORT}`;
axios.defaults.withCredentials = true;

const invalideToken = ()=>{
    Cookies.remove("session");
    window.location.href = `${window.location.origin}/connection`;
},
errorLog = (err)=>{
    if( (err && err.response) && (
        err.response.data.error.name === "TokenExpiredError" ||
        err.response.data.error === "aucun cookies de session" ||
        err.response.data.error.name === "JsonWebTokenError" ||
        err.response.data.error === "token invalide") ){
        invalideToken();
    }
    console.log(err);
},
API_Database = {
    signup : (data, callback) => {
        axios.post(`${SERVER}/api/auth/signup/`, {
            withCredentials: true,
            data : data
        }).then((result)=>{
            callback(result);
        }).catch((err)=>{
            console.log(err);
        });

    },login : (data, callback) => {
        axios.post(`${SERVER}/api/auth/login/`, {
            withCredentials: true,
            data
        }).then((result)=>{
            callback(result);
        }).catch((err)=>{
            console.log(err);
        });

    },getUser : (id, callback) => {
        axios.get(`${SERVER}/api/user/${id}`, {
            withCredentials: true
        }).then((result)=>{
            callback(result);
        }).catch((err)=>{
            errorLog(err);
        });

    },getUsers : (callback) => {
        axios.get(`${SERVER}/api/user/`, {
            withCredentials: true
        }).then((result)=>{
            localStorage.setItem("users", JSON.stringify(result.data.users));
            callback(result.data.users);
        }).catch((err)=>{
            errorLog(err);
        });

    },updateUser : (id, data, callback) => {
        axios.put(`${SERVER}/api/user/${id}`, {
            withCredentials: true,
            body : data
        }).then((result)=>{
            callback(result);
        }).catch((err)=>{
            errorLog(err);
        });

    },updateUserProfilePicture : (id, data, callback)=>{
        axios.post(`${SERVER}/api/user/${id}/profile_picture`, {
            image: data.get('image'),
            withCredentials: true
        }, {headers: {'Content-Type': 'multipart/form-data'}})
        .then((result)=>{
            callback(result);
        }).catch((err)=>{
            errorLog(err);
        });

    },deleteUser : (id, callback) => {
        axios.delete(`${SERVER}/api/user/${id}`, {
            withCredentials: true
        }).then((result)=>{
            callback(result);
        }).catch((err)=>{
            errorLog(err);
        });

    },createMessage : (data, callback) => {
        axios.post(`${SERVER}/api/post/`, {
            content: data.get('content'),
            image: data.get('image'),
            withCredentials: true
        }, {headers: {'Content-Type': 'multipart/form-data'}})
        .then((result)=>{
            callback(result);
        }).catch((err)=>{
            errorLog(err);
        });

    },like : (id, callback)=>{
        axios.post(`${SERVER}/api/post/like/${id}`, {
            withCredentials: true
        }).then((result)=>{
            callback(result);
        }).catch((err)=>{
            errorLog(err);
        });
        
    },getImage : (src)=>{
        return `${SERVER}/images/${src}`
    },getPublicPosts : (start, limit, callback) => {
        axios.get(`${SERVER}/api/post/${start}/${limit}`, {
            withCredentials: true
        }).then((result)=>{
            callback(result);
        }).catch((err)=>{
            errorLog(err);
        });
        
    },getPrivatePosts : (id, start, size, callback) => {
        axios.get(`${SERVER}/api/post/${id}/private_message/${start}/${size}`, {
            withCredentials: true
        }).then((result)=>{
            callback(result);
        }).catch((err)=>{
            errorLog(err);
        });

    },deletePost : (id, callback) => {
        axios.delete(`${SERVER}/api/post/${id}`, {
            withCredentials: true
        }).then((result)=>{
            callback(result);
        }).catch((err)=>{
            errorLog(err);
        });

    }
}

export default API_Database;