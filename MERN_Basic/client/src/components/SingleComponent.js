import axios from "axios"
import {useState,useEffect} from 'react';
import NavbarComponent from './NavbarComponent';
import parse from 'html-react-parser';

const SingleComponent=(props)=>{
    const [blog,setBlog] = useState("")

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>{
            setBlog(response.data)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    return(
        <div className="container p-5">
            <NavbarComponent></NavbarComponent>
            {blog && 
            <div>
                <h1>{blog.title}</h1>
                <div className='pt-3'>{parse(blog.content.substring(0,250))}</div>
                <p className='text-muted'> Author : {blog.author}, Time : {new Date(blog.createdAt).toLocaleString()}</p>
            </div>
            }
        </div>
    )

}
export default SingleComponent;