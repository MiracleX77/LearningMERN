import { useState,useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getToken } from '../services/authorize';

const EditComponent=(props)=>{
    const [state, setState] = useState({
        title:"",
        author:"",
        slug:""
    });
    const{title,author,slug} = state

    const [content,setContent] = useState('')


    const submitContent=(event)=>{
        setContent(event)
    }


    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>{
            const{title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    const showUpdateForm=()=>(
        <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" 
                    value={title} 
                    onChange={inputValue('title')}/>
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill 
                        value={content}
                        onChange={submitContent}
                        theme='snow'
                        className='pb-5 mb-3'
                        placeholder='write content...'
                        style={{border:'1px solid #666'}}
                    />
                </div>
                <div className="form-group">
                    <label>ผู้เเต่ง</label>
                    <input type="text" className="form-control" 
                    value={author}
                    onChange={inputValue('author')}/>
                </div>
                <br></br>
                <input type="submit" value="อัพเดด" className="btn btn-primary"/>
            </form>
    )

    const inputValue = name => event=>{
        setState({...state,[name]:event.target.value})
    }
    const submitForm=(e)=>{
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},{
            headers:{
                authorization : `Bearer ${getToken()}`
            }
        })
        .then(response=>{
            Swal.fire('Alert!','update complete!','success')
            const{title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        }).catch(err=>{
            Swal.fire('Alert!',err.response.data.error,'error' )
        })
    }
    
    
    return (
        <div className="container">
            <NavbarComponent></NavbarComponent>
            <h1>เเก้ไขบทความ</h1>
            {showUpdateForm()}
        </div>
    );
}
export default EditComponent;