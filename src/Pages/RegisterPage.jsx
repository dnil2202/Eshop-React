import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { BsFillEyeFill } from 'react-icons/bs';
import { useToast } from '@chakra-ui/react'
import image from '../img/living_room_furniture_eg_blue_tone_wallpaper_80113_1920x1080.jpg';
import { useNavigate } from 'react-router-dom';

const RegisterPage = (props) => {
    const [input, setInput] = useState({
        fullname:'',
        username: '',
        email: '',
        password: '',
    });

    const[visible,setVisible]=useState('password')
    const navigate= useNavigate()

    const toast = useToast()

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setInput({ ...input, [name]: value });
    };

    const btnSubmit = (event) => {
        event.preventDefault();
        let { username, email, password } = input;
        axios
            .post(API_URL + '/auth/regis', {
                username,
                email,
                password,
            })
            .then((res) => {
                if(res.data.success){
                    navigate('/')
                    toast({
                        title:"Account created",
                        desctiption: `Welcome to E-shop`,
                        status:"success",
                        duration:3000,
                        isClosable:true
                    })
                }
            });
            setInput({
                username: '',
                email: '',
                password: '',
            })
    };

    const showPass = () => {
        if(visible=="password"){
            setVisible("text")
        }else if(visible=="text"){
            setVisible("password")
        }
    };

    return (
        <div className='card-img'>
            <img src={image} className="w-100 h-auto" />
            <div className="container h-100 mt-3 card-img-overlay">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black">
                            <div className="card-body ">
                                <div className="row justify-content-center">
                                    <div className=" col-sm-1 col-md-1 col-lg-6 col-xl-7 d-flex align-item-center p-sm-4 p-md-5 ">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="rounded float-start w-100 "
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-5 d-flex align-items-center bg-light ">
                                        <form className="mx-1 mx-md-5 ">
                                            <p className="ms-3 small text-muted mb-4">
                                                START FOR FREE
                                            </p>
                                            <p className="display-6 fw-bold ms-3">
                                                Sign up to E-Shop
                                            </p>
                                            <div className=' d-flex ms-3 mt-4'>
                                            <p className="small text-muted">
                                                Already a member ?
                                            </p>
                                            <p className='small text-primary'>Login</p>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label">
                                                        User Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="username"
                                                        value={input.username}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label">
                                                        Your Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        value={input.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label">
                                                        Password
                                                    </label>
                                                    <div className='input-group border-round'>
                                                        <input
                                                            type={visible}
                                                            className="form-control border-0"
                                                            name="password"
                                                            value={
                                                                input.password
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                        <span
                                                            className="input-group-text bg-transparent border-0"
                                                             onClick={showPass}
                                                        ><BsFillEyeFill/>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-lg w-100"
                                                    onClick={btnSubmit}
                                                >
                                                    Create An Account
                                                </button>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                onClick={()=>window.open(`${API_URL}/auth/google`,'_blank').focus()}
                                                    type="button"
                                                    className="btn  btn-outline-secondary btn-lg w-100"
                                                >
                                                    Sign Up With Google
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RegisterPage;
