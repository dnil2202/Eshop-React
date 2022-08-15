import React from 'react'
import { Container, Text, Button } from '@chakra-ui/react/'
import { MdVerifiedUser } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../action/userAction';
import { API_URL } from '../../helper';

const Verified = () => {
  const params = useParams() // mengambil value url params dari routing FE
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerified = async () => {
    console.log(params)
    try {
        let res = await Axios.patch(`${API_URL}/auth/verified`, {}, {
            headers: {
                'Authorization': `Bearer ${params.token}`
            }
        })
        console.log(res.data)

        if (res.data.success) {
            localStorage.setItem('eshopLog', res.data.dataLogin.token);
            delete res.data.dataLogin.token;
            dispatch(loginAction(res.data.dataLogin))
            navigate('/', { replace: true });
        }else{
            alert('Verification failed ❌')
        }
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div> 
        <Container className='mt-5'>
            <div className='d-flex justify-content-center'>
            <MdVerifiedUser size={200}/>
            </div>
            <Text className='text-center'>After Register, you can access all feature with verified account</Text>
            <div className='d-flex justify-content-center'>
            <Button className='text-center mt-4' onClick={handleVerified}>Verified Your Account</Button>
            </div>
            </Container>
    </div>
  )
}

export default Verified