import { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormComponent=()=>{
    const [state, setState] = useState({
        title:"",
        author:""
    });
    const {title,author} = state

    const [content,setContent] = useState('')

    //กำหนดค่าให้กับ state
    const inputValue = name => event=>{
        console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value})
    }
    const submitContent=(event)=>{
        setContent(event)
    }


    const submitForm=(e)=>{
        e.preventDefault();
        console.log("API",process.env.REACT_APP_API)
        axios.post(`${process.env.REACT_APP_API}/create`,{title,content,author})
        .then(response=>{
            Swal.fire('Alert!','complete!','success')
            setState({...state,title:"",author:""})
            setContent("")
        }).catch(err=>{
            Swal.fire('Alert!',err.response.data.error,'error' )
        })
    }
    
    
    return (
        <div className="container">
            <NavbarComponent></NavbarComponent>
            <h1>เขียนบทความ</h1>
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
                <input type="submit" value="บันทึก" className="btn btn-primary"/>
            </form>
        </div>
    );
}
export default FormComponent;