import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Text,
    Avatar,
    AvatarBadge,
    MenuList,
    MenuItem,
    Menu,
    MenuButton,
    MenuDivider,
    Spinner,
    Badge
} from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';

const Navbar = (props) => {
    const { pathname } = window.location;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { username, status, role, cart } = useSelector((state) => {
        return {
            username: state.userReducer.username,
            status: state.userReducer.status,
            role: state.userReducer.role,
            cart: state.userReducer.cart,
        };
    });

    const onLogout = () => {
        localStorage.removeItem('eshoplog');
        navigate('/', { replace: true });
        window.location.reload(true);
    };

    return (
        <div>
            <div className="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar">
                <div className="container">
                    <span
                        className="navbar-brand"
                        onClick={() => navigate('/')}
                    >
                        <span className={`fw-bold text-black-50`}>E-SHOP</span>
                        <span className={`lead ms-1 text-muted`}>
                            | Furniture
                        </span>
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#eshopnavbar"
                        aria-controls="eshopnavbar"
                        aria-expanded="false"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="eshopnavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li>
                                <span
                                    className={`nav-link text-black-50 `}
                                    onClick={() => navigate('/product/user')}
                                >
                                    Product
                                </span>
                            </li>
                        </ul>
                        <div className="d-flex">
                            {props.loading ? (
                                <Spinner />
                            ) : username && !props.loading ? (
                                <Menu>
                                    <MenuButton>
                                        <div className="d-flex align-items-center">
                                            <Text
                                                className="text-white me-3"
                                                fontStyle="italic"
                                            >
                                                {status}
                                            </Text>
                                            <Avatar name={username} size="md">
                                                <AvatarBadge
                                                    boxSize="1em"
                                                    bg="green.500"
                                                />
                                            </Avatar>
                                        </div>
                                    </MenuButton>
                                    <MenuList textColor="black">
                                        {role == 'admin' ? (
                                            <div>
                                                <MenuItem
                                                    onClick={() =>
                                                        navigate('/product/')
                                                    }
                                                >
                                                    Products Management
                                                </MenuItem>
                                                <MenuItem>
                                                    Transactions Management
                                                </MenuItem>
                                            </div>
                                        ) : (
                                            <div>
                                                <MenuItem  onClick={()=> navigate('/cart')}>Cart<Badge>{cart.length}</Badge></MenuItem>
                                                <MenuItem>Profile</MenuItem>
                                                <MenuItem onClick={()=>{navigate('/transactions')}}>Transactions</MenuItem>
                                            </div>
                                        )}
                                        <MenuDivider />
                                        <MenuItem onClick={onLogout}>
                                            Signout
                                            <AiOutlineLogout className="ms-2" />
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            ) : (
                                <div className="btn-group">
                                    <button
                                        className="btn btn-outline-light"
                                        type="button"
                                        onClick={() => navigate('/login')}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => navigate('/register')}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
