import React from 'react';
import LandingPage from './Pages/LandingPages';
import RegisterPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import FooterComponent from './Component/Footer';
import Product_User from './Pages/User/Product_User';
import LoginPages from './Pages/LoginPages';
import axios from 'axios';
import { API_URL } from './helper';
import { loginAction } from './action/userAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailPage from './Pages/User/Detail';
import Cart from './Pages/User/Cart';
import Transactions from './Pages/User/Transactions';
import ProductsAdmin from './Pages/ProductAdmin';
import Verified from './Pages/User/Verified';

function App() {
    // Buat Loading Spinner
    const [loading, setLoading] = React.useState(true);

    const dispatch = useDispatch();

    // Mengambil data dari reducer
    const { role } = useSelector(({ userReducer }) => {
      return {
        role: userReducer.role
      }
    })

    const keepLogin = () => {
        let eshoplog = localStorage.getItem('eshoplog');
        if (eshoplog) {
            axios
                .get(API_URL + `/auth/keep`,{
                    headers:{
                        'Authorization': `Bearer ${eshoplog}`
                    }
                })
                .then((res) => {
                    if (res.data.idusers) {
                        localStorage.getItem('eshoplog', res.data.token);
                        delete res.data.token
                        setLoading(false);
                        dispatch(loginAction(res.data));
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        keepLogin();
    }, []);
    
    return (
        <div>
            <div>
                {/* Mengirim Proops ke navbar.jsx */}
                <Navbar loading={loading} />
            </div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {
                role ? 
                null : 
                    <>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPages />} />
                    </>
                }
                {
                role == 'admin' && 
                    <>
                        <Route path="/product" element={<ProductsAdmin/>} />
                    </>
                }

                <Route path="/product/user" element={<Product_User />} />
                <Route path="/product/detail" element={<DetailPage/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/transactions" element={<Transactions/>} />
                <Route path="/verification/:token" element={<Verified />} />

            </Routes>

            {/* <FooterComponent/> */}
        </div>
    );
}

export default App;
