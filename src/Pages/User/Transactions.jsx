import React, { useState } from 'react';
import axios from 'axios';
import { Text, Box, Button, ModalOverlay, ModalContent, ModalHeader, Modal, ModalCloseButton, ModalBody, Stack, ButtonGroup, Image } from '@chakra-ui/react';
import { API_URL } from '../../helper';

const Transactions = () => {
    const [dataUser, setDataUser] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [toggle, setToggle] = React.useState(false); // untuk membuka/menutup modal
    

    // console.log(data.length)
    // console.log(dataProduct);

    const getData =async () => {
        await axios.get(API_URL + '/transactions')
            .then((res) => {
                // console.log(res.data[0].detail)
                setDataUser(res.data);
                setDataProduct(res.data[0].detail);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        getData();
    }, []);

    const totalPayment=()=>{
        let total = 0;
        dataUser.forEach((val)=>{
            total += val.total_price+val.ongkir
        })
        return total
    }

    const printData = () => {
        return dataProduct.map((val, idx) => {
            console.log(val)
            return (
                <div className='row' key={idx}>
                <div className='col-8 d-flex'>
                    <img src={val.images} />
                    <div className=''>
                    <Text className='mt-5 fw-bold'>{val.name}</Text>
                    <Text className='text-muted'>{val.qty} x Rp.{val.price.toLocaleString('id')}</Text>
                    <Text className={`text-muted ${dataProduct.length-1==0&&'d-none'}`} >+ {dataProduct.length-1} Produk Lainya</Text>
                    </div>
                </div>
                <div className='col-4 mt-5'>
                    <Text>Total Belanja</Text>
                    <div className='fw-bold'>Rp. {dataUser.map((val)=>val.total_price).toLocaleString('id')}</div>
                    <div className='btn-group mt-5'>
                    <button className='btn btn-danger fw-bold  ' >Batalkan Pesanan</button>
                    <Button className='ms-3' colorScheme={'teal'} onClick={()=>setToggle(!toggle)} >Lihat Detail Produk</Button>
                    <Modal isOpen={toggle} size='xl' onClose={()=>{setToggle(!toggle)}}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader className='text-center'>Detail Transaction</ModalHeader>
                            <hr/>
                            <ModalCloseButton/>
                            <ModalBody>
                                <Stack direction={'row'}>
                                <Box shadow={'5px'}>
                                    <Text className='fw-bold'>{dataUser.map((val)=>val.status)}</Text>
                                    <div className='d-flex'>
                                    <Text className='me-5' >No.Invoice :</Text>
                                    <Text textColor={'blue.300'} className='fw-bold'>{dataUser.map((val)=>val.invoice)}</Text>
                                    </div>
                                    <div className='d-flex'>
                                    <Text className='me-5' >Date :</Text>
                                    <Text className='ms-5'>{getDate()}</Text>
                                    </div>
                                </Box>
                                <div className='ms-5 my-2 '>
                                    <div className='d-flex'>
                                    <Button colorScheme={'teal'} width='full' className='ms-5'>PAY</Button>
                                    </div>
                                    <Button className='my-2 ms-5' colorScheme={'red'} variant={'outline'} onClick={()=>setToggle(!toggle)}>CANCEL</Button>
                                </div>
                                </Stack>
                                <hr/>
                                <Text className='fw-bold' >DETAIL</Text>
                                <div className='row'>
                                    <div className='col-4'>
                                    <Image src={val.images} size={5} />
                                    </div>
                                    <div className='col-4'>
                                    <Text className='fw-bold'>{val.name}</Text>
                                    <Text className='text-muted'>{`${val.qty} x Rp. ${val.price.toLocaleString('id')} `}</Text>
                                    </div>
                                    <div className='col-4'>
                                        <Text className='fw-bold'>Sub.Total</Text>                                        
                                        <Text className='fw-bold'>Rp. {dataUser.map((val)=>val.total_price.toLocaleString('id'))}</Text>                                        
                                    </div>
                                </div>
                                <hr/>
                                <div className='row'>
                                    <div className='col-4'>
                                    <Text className='fw-bold'>Detail Payment</Text>
                                <Text className=''>Total Price ({val.qty} item)</Text>
                                    <Text className=''>Shipping</Text>
                                    <Text className=''>Total Payment</Text>
                                    </div>
                                    <div className='col-4'>
                                    </div>
                                    <div className='col-4'>
                                    <Text className='fw-bold mt-4' textColor={'blue.500'} >Rp. {dataUser.map((val)=>val.total_price.toLocaleString('id'))}</Text>
                                    <Text className='fw-bold ' textColor={'blue.500'} >Rp. {dataUser.map((val)=>val.ongkir.toLocaleString('id'))}</Text>
                                    <Text className='fw-bold ' textColor={'blue.500'} >Rp. {totalPayment().toLocaleString('id')}</Text>
                                    </div>
                                </div>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                 </div>
                </div>
                </div>
            )
        });
    };

const getDate=()=>{
    let a = new Date();
    return `${a.getDate()}/${a.getMonth()}/${a.getFullYear()} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()} `
}

    return (
        <div className="container fluid mt-5">
            <h1 className="h3 text-black-50">Our Arrival Product</h1>
            <div className="d-flex mb-5">
                <p className="text text-muted me-1">Choose product and</p>
                <p className="text text-primary fw-bold">
                    transact more easily
                </p>
            </div>
            <Box shadow={'lg'} >
                <Box className='d-flex bg-primary'>
                    <Text className='me-1'>{getDate()}</Text>
                    <Text backgroundColor={'pink.300'} textColor={'red.600'} className='fw-bold me-3'>{dataUser.map((val)=>val.status)}</Text>
                    <Text className='me-1 text-white'>{dataUser.map((val)=>val.invoice)}</Text>
                </Box>
                {printData()}
            </Box>
        </div>
    );
};

export default Transactions;
