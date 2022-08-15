import React from 'react';
import { Image, Text } from '@chakra-ui/react';
import { AiFillPlusCircle, AiFillMinusCircle, } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../helper';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartAction } from '../../action/userAction'

const DetailPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [detail, setDetail] = React.useState(null);
    const { state, search } = useLocation();
    const [qty, setQty]=React.useState(1)
    // const [stockToBuy, setStockToBuy]=React.useState()

    const { id, cart } = useSelector(({ userReducer }) => {
        return {
            id: userReducer.id,
            cart: userReducer.cart,
        }
    })

    console.log(qty)
    // console.log(stockToBuy)
    // console.log('data id',id)

    const btnInc=()=>{
        if(qty < state.stock){
            setQty(qty +1)
        }
    }
    const btnDec=()=>{
        if(qty > 1){
            setQty(qty -1)
        }
    }

    const onBuy = () => {
        let temp = [...cart];
        // 1. Memriksa apakah product sudah ada didalam keranjang
        let idx = temp.findIndex(val => val.idProduct == state.id);

        if (idx >= 0) {
            let newData = {
                ...temp[idx]
            }
            newData.qty+=1
            temp.splice(idx, 1, newData);
    
        } else {
            // 2. Menambahkan data product kedalam data keranjang sebelumnya
            temp.push({
                idProduct: state.id,
                images: state.images,
                name: state.name,
                brand: state.brand,
                category: state.category,
                price: state.price,
                qty
            })
        }

        // 2. Melakukan update data ke db.json
        Axios.patch(API_URL + `/users/${id}`, {
            cart: temp
        })
            .then((res) => {
                // 3. Melakukan update data lagi ke reducer
                console.log(res.data)
                dispatch(updateCartAction(res.data.cart));
                // 4. Redirect ke cart page
                navigate('/cart');
            }).catch((err) => {
                console.log(err);
            })

    }

    console.log('DATA DARI PRODUCTS PAGE', state.id)
    console.log('DATA DARI URL PRODUCT DETAIL PAGE', search)

    const getDetail = () => {
        Axios.get(API_URL + `/products${search}`)
            .then((res) => {
                console.log(res.data)
                setDetail(res.data[0])
            }).catch((err) => {
                console.log(err);
            })
    }

    React.useEffect(()=>{
        getDetail()
    },[]);

    return <div className='container p-5'>
        <div className='row'>
            <div className="col-12 col-md-6">
                <Image
                    className='shadow-sm' boxSize='100%' margin='auto' objectFit='cover' src={state.images}
                    fallbackSrc='https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=612x612&w=0&h=jPhUdbj_7nWHUp0dsKRf4DMGaHiC16kg_FSjRRGoZEI=' />
                <Text opacity={0.6} fontSize={['3xl', '6xl']} className='muted-color position-relative' top={'-10%'}>{state.category.toUpperCase()}</Text>
            </div>
            <div className="col-12 col-md-6">
                <div className='d-flex'>
                    <div>
                        <Text fontSize={['4xl', '6xl']} className='main-color fw-bold'>{state.name}</Text>
                        <div className='d-flex'>
                            <Text fontSize='4xl' className='main-color me-3'>by</Text>
                            <Text fontSize='4xl' className='text-muted fw-bold'>{state.brand}</Text>
                        </div>
                    </div>
                </div>
                <div className="my-3">
                    <label className='muted-color'>Description</label>
                    <p style={{ textAlign: 'justify' }}>
                        {state.description}
                    </p>
                </div>
                <Text fontSize={['4xl', '6xl']} className='text-muted fw-bold'>Rp. {(state.price*qty).toLocaleString()}</Text>
                <div className='d-flex my-4'>
                    <div className='btn-group'>
                        <button className='btn'><AiFillMinusCircle className='main-color' size={28} onClick={btnDec} /></button>
                        <Text fontSize='3xl' className='text-muted fw-bold'>{qty}</Text>
                        <button className='btn'><AiFillPlusCircle className='main-color' size={28} onClick={btnInc} /></button>
                    </div>
                    <button className='btn btn-outline-primary w-100' onClick={onBuy}>Buy</button>
                </div>
            </div>
        </div>
        <hr className='my-5' />
    </div>
}

export default DetailPage;