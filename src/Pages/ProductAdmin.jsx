import React from 'react';
import {
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image,
    useToast,
    ButtonGroup,
    Box,
} from '@chakra-ui/react';
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from 'react-icons/ai';
import Axios from 'axios';

import { API_URL } from '../helper';

const ProductsAdmin = () => {
    const [data, setData] = React.useState([]);
    const [toggle, setToggle] = React.useState(false); // untuk membuka/menutup modal
    const [toggleDelete, setToggleDelete] = React.useState(false); // untuk membuka/menutup modal
    const [img, setImg] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [stock, setStock] = React.useState(0);
    const [selectedData, setSelectedData] = React.useState(null);

    // Set Filter
    const [filter, setFilter]=React.useState({
        name:"",
        brand:"",
        category:""    
    })

    const toast = useToast();
    console.log(data)
    console.log(selectedData)



    const getData = () => {
        Axios.get(API_URL + '/products')
            .then((res) => {
                // console.log(res.data)
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        getData();
    }, []);

    const printData = () => {
        return data.map((val, idx) => {
            return (
                <Tr key={val.id}>
                    <Td className="fw-bold">{idx + 1}</Td>
                    <Td>
                        <img
                            src={val.images}
                            className="shadow rounded-3"
                            alt={val.name}
                            width="100%"
                        />
                    </Td>
                    <Td>{val.name}</Td>
                    <Td>{val.brand}</Td>
                    <Td>{val.category}</Td>
                    <Td isNumeric>Rp. {val.price.toLocaleString()}</Td>
                    <Td>
                        <div className="btn-group">
                            <button className="btn btn-warning">
                                <AiFillEdit size={24} />
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                type="button"
                                onClick={() => {
                                    setSelectedData(val);
                                    setToggleDelete(!toggleDelete);
                                }}
                            >
                                <AiFillDelete size={24} />
                            </button>
                        </div>
                    </Td>
                </Tr>
            );
        });
    };

    const onSubmit = () => {
        let formData = new FormData ();
        formData.append('data',JSON.stringify({
            name,
            description,
            brand,
            category,
            price,
            stock
        }))
        formData.append('images',img)
        Axios.post(API_URL + '/products', formData).then((res) => {
                if (res.data.success) {
                    toast({
                        title: 'Product Submited',
                        description: `${name} as new product`,
                        status: 'success',
                        duration: 2000,
                        isCloseable: true,
                    });
                    setToggle(!toggle);
                    setImg('');
                    setName('');
                    setBrand('');
                    setCategory('');
                    setDescription('');
                    setStock('');
                    setPrice('');
                    getData();
                }
            })
            .catch((err) => {
                toast({
                    title: 'Error submitted',
                    description: err.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            });
    };

    const onDelete = () => {
        Axios.delete(API_URL + `/products/${selectedData.idproduct}`)
        
            .then((res) => {
                toast({
                    title: 'Product Submited',
                    description: `${name} success delete`,
                    status: 'success',
                    duration: 2000,
                    isCloseable: true,
                });
                getData();
                setSelectedData(null);
                setToggleDelete(!toggleDelete);
            })
            .catch((err) => {
                toast({
                    title: 'Error Deleted',
                    description: err.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            });
    };

    const onFilter = ()=>{
        // console.log(filter)
        // Ketika maun di join bisa disematkan
        let query=[]
        for(let prop in filter){
            if(filter[prop]){
                query.push(`${prop}=${filter[prop]}`)
            } 
        }
        console.log("before", query)
        console.log("after", query.join('&'))
        Axios.get(API_URL+`/products?${query.join('&')}`)
        .then((res)=>{
            setData(res.data)
        }).catch(err =>{console.log(err)})


    }

    const handleChangeFilter=(event)=>{
        let {name, value}=event.target
        setFilter({...filter,[name]:value})
    }

    const onReset=()=>{
        Axios.get(API_URL + '/products')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
            setFilter({
                name:"",
                brand:"",
                category:"",
            })

    
}

    console.log(img, name, description, brand, category, price, stock);
    return (
        <div
            className="container"
            style={{
                position: 'relative',
                top: '7vh',
                minHeight: '100vh',
            }}
        >
            <div className="card border-border-secondary mt-5">
                <div className="mt-3 mb-4  ">
                    <p>Filter</p>
                    <div className="d-flex justify-content-between">
                        <input
                            className="form-control w-75 me-3"
                            placeholder="Name"
                            type="text"
                            value={filter.name}
                            name="name"
                            onChange={handleChangeFilter}
                        />
                        <select className="form-select w-75 me-3" name='brand' value={filter.brand} onChange={handleChangeFilter}>
                            <option selected>Select brand</option>
                            <option value="IKEA">IKEA</option>
                            <option value="ACE">ACE</option>
                            <option value="Mr. DIY">Mr. DIY</option>
                        </select>
                        <select className="form-select w-75 me-3 " name="category" value={filter.category } onChange={handleChangeFilter}>
                            <option selected>Select category</option>
                            <option value="Livingroom">Livingroom</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Kitchen">Kitchen</option>
                        </select>
                        <Button
                        className='w-25 me-3'
                            colorScheme="teal"
                            variant="solid"
                            type="button"
                            onClick={onFilter}
                        >
                            Filter
                        </Button>
                        <Button
                        className='w-25'
                            colorScheme="orange"
                            variant="outline"
                            type="button"
                            onClick={onReset}
                        >
                            Reset
                        </Button>
                    </div>
                    <div className='d-flex'>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center py-4">
                <div>
                    <Text fontSize="4xl">Manage your products</Text>
                    <p className="muted-color">
                        Prepare your product, so that customers can{' '}
                        <span className="main-color fw-bold">
                            {' '}
                            transact more easily.
                        </span>
                    </p>
                </div>
                <Button
                    leftIcon={<AiFillPlusCircle size={26} />}
                    colorScheme="teal"
                    variant="solid"
                    type="button"
                    onClick={() => setToggle(!toggle)}
                >
                    Add
                </Button>
            </div>
            <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add your product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="row ">
                            <div className="col-12 col-md-6">
                                <label className="form-label fw-bold text-muted">
                                    Image
                                </label>
                                <Image
                                    className="shadow-sm"
                                    boxSize="100% 50%"
                                    margin="auto"
                                    objectFit="cover"
                                    src={img}
                                    fallbackSrc="https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=612x612&w=0&h=jPhUdbj_7nWHUp0dsKRf4DMGaHiC16kg_FSjRRGoZEI="
                                    alt="add-product"
                                    type='file'
                                />
                                <input
                                    className="form-control m-auto"
                                    onChange={(e) => setImg(e.target.files[0])}
                                    type="file"
                                    placeholder="URL image"
                                />
                                <label className="form-label fw-bold text-muted">
                                    Product Name
                                </label>
                                <input
                                    className="form-control m-auto"
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label fw-bold text-muted">
                                    Brand
                                </label>
                                <select
                                    className="form-select"
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                    <option selected>Select brand</option>
                                    <option value="IKEA">IKEA</option>
                                    <option value="ACE">ACE</option>
                                    <option value="Mr. DIY">Mr. DIY</option>
                                </select>
                                <label className="form-label fw-bold text-muted">
                                    Category
                                </label>
                                <select
                                    className="form-select"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                >
                                    <option selected>Select category</option>
                                    <option value="Livingroom">
                                        Livingroom
                                    </option>
                                    <option value="Bedroom">Bedroom</option>
                                    <option value="Kitchen">Kitchen</option>
                                </select>
                                <label className="form-label fw-bold text-muted">
                                    Description
                                </label>
                                <textarea
                                    className="form-control m-auto"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    type="text"
                                />
                                <label className="form-label fw-bold text-muted">
                                    Stock
                                </label>
                                <input
                                    className="form-control m-auto"
                                    onChange={(e) =>
                                        setStock(parseInt(e.target.value))
                                    }
                                    type="text"
                                />
                                <label className="form-label fw-bold text-muted">
                                    Price
                                </label>
                                <input
                                    className="form-control m-auto"
                                    onChange={(e) =>
                                        setPrice(parseInt(e.target.value))
                                    }
                                    type="text"
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={onSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {selectedData ? (
                <Modal
                    isOpen={toggleDelete}
                    onClose={() => setToggleDelete(!toggleDelete)}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Are You Sure To Delete{' '}
                            <span className="fw-bold main-color">
                                {' '}
                                {selectedData.name}
                            </span>
                            ?
                        </ModalHeader>
                        <ModalFooter>
                            <ButtonGroup>
                                <Button
                                    type="button"
                                    variant="outline"
                                    colorScheme="yellow"
                                    onClick={() => {
                                        setSelectedData(null);
                                        setToggleDelete(!toggleDelete);
                                    }}
                                >
                                    {' '}
                                    No
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    colorScheme="teal"
                                    onClick={onDelete}
                                >
                                    Yes
                                </Button>
                            </ButtonGroup>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            ) : null}
            <div className="mt-3">
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th className="w-25">Preview</Th>
                                <Th>Name</Th>
                                <Th>Brand</Th>
                                <Th>Category</Th>
                                <Th isNumeric>Price</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>{printData()}</Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default ProductsAdmin;
