import React, { useState } from 'react'
import {Text} from '@chakra-ui/react'
import image from '../img/living_room_furniture_eg_blue_tone_wallpaper_80113_1920x1080.jpg';
import { BsFillEyeFill } from 'react-icons/bs';
import axios from 'axios'
import { API_URL } from '../helper';
import {useNavigate} from 'react-router-dom'
import {loginAction, loginMiddleware} from '../action/userAction'
import {useDispatch} from 'react-redux'



function LoginPages() {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


const onLogin=async()=>{
    let res = await dispatch(loginMiddleware(email,password))
    if(res.success){
        navigate('/',{replace: true})
    }

    // cara sebelum login di pindah ke reducer
    // axios.post(API_URL+`/auth/login`,{
    //     email,
    //     password
    // })
    // .then((res)=>{
    //     console.log(res.data)
    //     // menyimpan ke local storage
    //     localStorage.setItem('eshoplog', res.data.token)
    //     // Data token tidak dikirim
    //     delete res.data.token;
    //     // mengambil data dari redux
    //     dispatch(loginAction(res.data))
    //     navigate('/',{replace: true})
    //     setEmail({
    //         email:"",
    //     })
    //     setPassword({
    //         password:"",
    //     })
    // }).catch((err)=>{
    //     console.log(err)
    // })
}





  return (
    <div className="" style={{backgroundImage: `url(${image})`,
    top: '7vh',
    minHeight: '100vh',
}}>
         <div className='container py-3 w-50 '>
            <div id='form-login' className='card bg-transparent my-5'>
                <div className='ps-5 ms-5 pb-1'>
                <Text fontSize='4x1' className='fw-bold py-3'> Sign in for shoping</Text>
                <div className='d-flex '>
                    <h6 className='fw-bold'>Not have account!</h6>
                    <h6 className='text-light ms-1'>Sign Up</h6>
                </div>
                </div>
                <div className="w-75 ps-5 ms-5">
                    <label className='form-label fw-bold' >Email</label>
                    <input type='email' className='form-control p-3' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="w-75 ps-5 ms-5">
                    <label className='form-label fw-bold' >Password</label>
                    <div className='input-group'>
                    <input type='password' className='form-control p-3' onChange={(e)=>setPassword(e.target.value)}/>
                    <span className='input-group-text'>
                    <BsFillEyeFill/>
                    </span>
                    </div>
                </div>
                <div className="ps-5 ms-5">
                     <button className='btn btn-primary py-3 shadow mt-3 w-25' type='button' onClick={onLogin}>Login</button>
                </div>
                </div>
            </div>
    </div>
  )
}

export default LoginPages