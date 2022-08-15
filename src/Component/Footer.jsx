import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
const FooterComponent = (props) => {

    const navigate = useNavigate();

    return <div className="p-5 shadow"
        style={{
            borderTopLeftRadius: "25px",
            borderTopRightRadius: "25px",
            marginTop: "-25px"
        }}
    >
        <div className='container d-none d-md-flex flex-wrap justify-content-between'>
            <span className='navbar-brand btn' onClick={() => navigate('/')}>
                <span className='fw-bold ' style={{ color: "#397ef6" }}>
                    E-SHOP
                </span>
                <span className='lead ms-1'>
                    | Furniture
                </span>
            </span>
            <ul style={{ listStyleType: "none" }} className="d-none d-md-block">
                <li><b>Products</b></li>
                <li>Livingroom</li>
                <li>Bedroom</li>
                <li>Kitchen</li>
            </ul>
            <ul style={{ listStyleType: "none" }} className="d-none d-md-block">
                <li><b>Company</b></li>
                <li>About us</li>
                <li>Career</li>
            </ul>
            <div className="d-none d-md-block">
                <b>Follow us</b>
                <div className='d-flex'>
                    <AiFillFacebook size={42} color="#397ef6" />
                    <AiFillInstagram size={42} color="#397ef6" />
                    <AiFillTwitterCircle size={42} color="#397ef6" />
                </div>
            </div>
        </div>
        {/* For Mobile */}
        <div className='d-block d-md-none text-center'>
            <span className='navbar-brand btn' onClick={() => navigate('/')}>
                <span className='fw-bold ' style={{ color: "#397ef6" }}>
                    E-SHOP
                </span>
                <span className='lead ms-1'>
                    | Furniture
                </span>
            </span>
        </div>
        <div className='text-muted text-center'>© 2022 ESHOPEngineer. All rights reserved.</div>
    </div>
}

export default FooterComponent;