import NavbarComponent from './NavbarComponent';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { authenticate, getUser } from '../services/authorize';

const LoginComponents=(props)=>{

    const [state, setState] = useState({
        username:"",
        password:""
    });
    const {username,password} = state

    const inputValue = name => event=>{
        setState({...state,[name]:event.target.value})
    }
    const submitForm=(e)=>{
        e.preventDefault();
        
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            authenticate(response,()=>{window.location.href = '/create';})
        }).catch(err=>{
            Swal.fire('Alert!',err.response.data.error,'error' )
        })
    }
    useEffect(()=>{
        getUser() && props.history.push("/")
        // eslint-disable-next-line
    },[])

    return (
        <div className="container">
            <NavbarComponent></NavbarComponent>
            <h1>เข้าสู่ระบบ | Admin </h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" 
                    value={username} 
                    onChange={inputValue('username')}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" 
                    value={password}
                    onChange={inputValue('password')}/>
                </div>
                <br></br>
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
            </form>
        </div>
    );
}
export default LoginComponents