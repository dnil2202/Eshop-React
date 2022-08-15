import React from 'react';
import Axios from 'axios';
import { API_URL } from '../../helper';
import { useNavigate } from 'react-router-dom';

function Product_User() {
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();

    const [filterUser,setFilterUser]=React.useState({
        name:"",
        brand:"",
        category:"",
    })

    const getData = () => {
        Axios.get(API_URL + '/products')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        getData();
    }, []);

    const onChangeFilterUser=(event)=>{
        let {name,value}=event.target
        setFilterUser({...filterUser,[name]:value})
    }

    const onFilterUser=()=>{
        let query=[]
        for(let prop in filterUser){
            if(filterUser[prop]){
                query.push(`${prop}=${filterUser[prop]}`)
            }
        }
        Axios.get(API_URL+`/products?${query.join('&')}`)
        .then((res)=>{
            setData(res.data)
        }).catch(err =>{console.log(err)})
    }

    const onResetUser=()=>{
            Axios.get(API_URL + '/products')
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
                setFilterUser({
                    name:"",
                    brand:"",
                    category:"",
                })
    
        
    }

    const printDataUser = () => {
        return data.map((val, idx) => {
            return (
                <div className="col-4" key={val.id}
                onClick={()=> navigate (`/product/detail?id=${val.id}`,{
                    state: val
                })}>
                    <div className="card ">
                        <img src={API_URL + val.images} className="h-auto" />
                    </div>
                    <div className="border text-center bg-info">
                        <p className="text-dark" >Rp {val.price.toLocaleString('id')}</p>
                        <h2 className="text-dark">{val.name}</h2>
                    </div>
                </div>
            );
        });
    };

    return (
        <div
            className="container mt-5"
        >
            <div className="row ">
                <div className="col-3">
                    <h1 className="h3 text-black-50">Our Arrival Product</h1>
                    <div className="d-flex">
                        <p className="text text-muted me-1">
                            Choose product and
                        </p>
                        <p className="text text-primary">
                            transact more easily
                        </p>
                    </div>
                    <div className="bg-primary">
                        <div className="">
                            <p className="ms-3 text-light h5">Filter</p>
                            <input
                                className="form-control w-100 my-1"
                                placeholder="Name"
                                name="name"
                                value={filterUser.name}
                                onChange={onChangeFilterUser}
                            />
                            <select
                                className="form-select"
                                aria-label="Default select
                                my-1"
                                name="category"
                                value={filterUser.category}
                                onChange={onChangeFilterUser}
                            >
                                <option selected="">Select-Category</option>
                                <option value="Livingroom">Livingroom</option>
                                <option value="Bedroom">Bedroom</option>
                                <option value="Kitchen">Kitchen</option>
                            </select>
                            <select className="form-select my-1"
                              name="brand"
                              value={filterUser.brand}
                              onChange={onChangeFilterUser}>
                                <option selected>Select Brand</option>
                                <option value="IKEA">IKEA</option>
                                <option value="ACE">ACE</option>
                                <option value="Mr. DIY">Mr. DIY</option>
                            </select>
                            <div className="d-flex my-1">
                                <input
                                    className="form-control w-50"
                                    placeholder="Minimum"
                                />
                                <input
                                    className="form-control me-1 w-50"
                                    placeholder="Maximum"
                                />
                            </div>
                        </div>
                        <div className="d-flex mt-2 ms-5">
                            <button className="btn btn-success mx-4" onClick={onFilterUser}>
                                Filter
                            </button>
                            <button className="btn btn-warning ms-4" onClick={onResetUser}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col mt-5">
                    <div className="container">
                        <div className="row">{printDataUser()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product_User;
