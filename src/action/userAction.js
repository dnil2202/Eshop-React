import axios from "axios"
import { API_URL } from "../helper"

export const loginAction=(data)=>{
    console.log('data dari page LOGIN', data)
    return{
        type:"LOGIN_SUCCESS",
        payload : data
    }
}

export const loginMiddleware=(email,password)=>{
    return async(dispatch)=>{
        try {
            let res = await axios.post(API_URL+`/auth/login`,{
                email, password
            });
            localStorage.setItem('eshoplog', res.data.token)
            delete res.data.token;
            dispatch({
                type:'LOGIN_SUCCESS',
                payload:res.data
            })
            return {success : true}
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutAction=()=>{
    return{
        type:'LOGOUT_SUCCESS'
    }
}

export const registerAction=()=>{
    return{
        type:'REGISTER_SUCCESS'
    }
}

export const updateCartAction = (cart) => {
    return {
        type: "UPDATE_CART",
        payload: cart
    }
}