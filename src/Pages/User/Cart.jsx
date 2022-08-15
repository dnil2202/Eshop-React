import React from 'react';
import Axios from 'axios';
import { API_URL } from '../../helper';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { Image, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartAction } from '../../action/userAction';
import axios from 'axios';

const Cart = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, cart } = useSelector(({ userReducer }) => {// Pahami data cart di dapat dri reducer
        return {
            id: userReducer.id,
            cart: userReducer.cart,
        };
    });

    const [ongkir, setOngkir] = React.useState(0);

    const [selectedShipping, setSelectedShipping] = React.useState(null);
    const [shipping, setShipping] = React.useState([
        {
            id: 1,
            type: 'Reguler',
            pay: 0.05
        },
        {
            id: 2,
            type: 'Next Day',
            pay: 0.075
        },
        {
            id: 3,
            type: 'Same Day',
            pay: 0.1
        }
    ]);

    const onShipping=(idShipping)=>{
        let select =  shipping.filter(val=>val.id == idShipping)
        setSelectedShipping(select[0])
        setOngkir(select[0].pay*totalProductPay())
    }

    const printShipping = () => {
        return shipping.map((val, idx) => <option value={val.id} key={val.id}>{val.type} - Rp. {(totalProductPay() * val.pay).toLocaleString()}</option>)
    }

    const onInc = async (idProduct) => {
        try {
            let temp = [...cart];
            let idx = cart.findIndex((val) => val.idProduct == idProduct);
            // Menampung data object berdasarkan index yang dipilih
            let newData = {
                ...temp[idx],
            };

            let resGet = await Axios.get(API_URL + `/products?id=${idProduct}`);
            if (newData.qty < resGet.data[0].stock) {
                newData.qty += 1;
                // temp.splice(idx, 1, newData); //Cara 1
                temp[idx] = newData; // Cara 2

                let resPatch = await Axios.patch(API_URL + `/users/${id}`, {
                    cart: temp,
                });

                dispatch(updateCartAction(resPatch.data.cart));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onDec = async (idProduct) => {
        try {
            let temp = [...cart];
            let idx = cart.findIndex((val) => val.idProduct == idProduct);
            // Menampung data object berdasarkan index yang dipilih
            let newData = {
                ...temp[idx],
            };

            if (newData.qty > 1) {
                newData.qty -= 1;
                // temp.splice(idx, 1, newData); //Cara 1
                temp[idx] = newData; // Cara 2

                let resPatch = await Axios.patch(API_URL + `/users/${id}`, {
                    cart: temp,
                });

                dispatch(updateCartAction(resPatch.data.cart));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onRemove = (idProduct) => {
        let temp = [...cart];
        let idx = temp.findIndex((val) => val.idProduct == idProduct);
        temp.splice(idx, 1);
        Axios.patch(API_URL + `/users/${id}`, {
            cart: temp,
        })
            .then((res) => {
                dispatch(updateCartAction(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const totalProductPay = () => {
        let total = 0;
        cart.forEach((val) => {
            total += val.price * val.qty;
        });

        return total;
    };

    const onCekOut = async () => {
        try {
            let date = new Date();

            let data = {
                idUser: id,
                invoice: `#INV/${date.getTime()}`,
                date : date.toLocaleString,
                total_price: totalProductPay(),
                shipping: selectedShipping.type,
                ongkir,
                detail: cart,
                status: 'UNPAID',
            };
            let resPost = await axios.post(API_URL+'/transactions', data)
            if(resPost.data.id){
                // data cart user di rest ulang
                await Axios.patch(API_URL+`/users/${id}`,{
                    cart:[]
                })
                dispatch(updateCartAction([])) // update data ke reducer
                // Redireci Ke page transactions user
                navigate('/transactions')
            }
        } catch (err) {
            console.log(err);
        }
    };

    const printDataCart = () => {
        return cart.map((val, idx) => {
            return (
                <>
                    <div className="col-3" key={val.idProduct}>
                        <img src={val.images} />
                    </div>
                    <div className="col-3">
                        <p>{val.name}</p>
                        <p>{val.brand}</p>
                        <button
                            onClick={() => onRemove(val.idProduct)}
                            className="btn p-3"
                            style={{
                                textAlign: 'left',
                                width: 'fit-content',
                                color: 'red',
                            }}
                            type="button"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="col-3">
                        <div className="btn-group">
                            <button className="btn">
                                <AiFillMinusCircle
                                    className="main-color"
                                    size={15}
                                    onClick={() => onDec(val.idProduct)}
                                />
                            </button>
                            <Text
                                fontSize="1xl"
                                className="text-muted fw-bold"
                                defaultValue={val.qty}
                            >
                                {val.qty.toLocaleString()}
                            </Text>
                            <button className="btn">
                                <AiFillPlusCircle
                                    className="main-color"
                                    size={15}
                                    onClick={() => onInc(val.idProduct)}
                                />
                            </button>
                        </div>
                    </div>
                    <div className="col-3">
                        {(val.price * val.qty).toLocaleString('id')}
                    </div>
                    <hr className="mt-5" />
                </>
            );
        });
    };

    return (
        <>
            <div className="container">
                <div className="row mt-5 ms-5">
                    <div className="col-12 col-md-12 col-lg-8">
                        <div className="card-body w-auto ">
                            <h2 className="text-black fw-bold h4 text-start">
                                SHOPING CART
                            </h2>
                            <h2 className="text-black text-end">{`${cart.length} Items`}</h2>
                            <hr className="mb-3" />
                            <div className="row">{printDataCart()}</div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4 bg-light px-5">
                        <div className="pt-4">
                            <h4 className="fw-bold pb-3">Order Summary</h4>
                            <hr />
                        </div>
                        <div className="pt-3 d-flex justify-content-between">
                            <h1 className="fw-bold">{`${cart.length} ITEMS`}</h1>
                            <h1 className="fw-bold">
                                Rp. {totalProductPay().toLocaleString()}
                            </h1>
                        </div>
                        <hr />
                        <div className="mt-3" >
                            <label>SHIPPING</label>
                            <select
                                className="form-select my-4"
                                aria-label="Default select"
                                onChange={(e)=>onShipping(e.target.value)}
                            >
                                  <option selected>Select shipping</option>
                                  {
                                    printShipping()
                                  }
                            </select>
                        </div>
                        <div className="my-4">
                            <label> PROMO CODE</label>
                        </div>
                        <input
                            className="w-100 h-auto"
                            placeholder="Enter your code"
                        />
                        <div className="my-4">
                            <button className="btn btn-danger">APPLY</button>
                            <hr className="mt-5" />
                        </div>
                        <div className="d-flex justify-content-between fw-bold">
                            <h2>TOTAL COST</h2>
                            <h2 className="">
                                Rp. {(totalProductPay()+ongkir).toLocaleString()}
                            </h2>
                        </div>
                        <button
                            className="btn btn-primary w-75 my-5 ms-5"
                            onClick={onCekOut}
                        >
                            CEK OUT
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
