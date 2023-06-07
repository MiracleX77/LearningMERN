import NavbarComponent from './components/NavbarComponent';
import axios from "axios";
import {useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import parse from 'html-react-parser'
import { getUser ,getToken} from './services/authorize';


function App() {
  const [blogs,setBlogs] = useState([])

  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
    })
    .catch(err=>alert(err))
  }

  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete = (slug) =>{
    Swal.fire({
      title:"Delete Confirm ?",
      icon:"warning",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog=(slug)=>{
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,{
      headers:{
          authorization : `Bearer ${getToken()}`
      }
  })
    .then(response=>{
      Swal.fire("Deleted!",response.data.message,"success")
      fetchData()
    })
    .catch(err=>alert(err))
  }



  return (
    <div className="container p-5">
      <NavbarComponent></NavbarComponent>
      {blogs.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom: '1px solid silver'}}>
          <div className='col pt-3 pb-2'>
            <a href={`/blog/${blog.slug}`}> 
            <h2>{blog.title}</h2> 
            </a>
            <div className='pt-3'>{parse(blog.content.substring(0,250))}</div>
            <p className='text-muted'> Author : {blog.author}, Time : {new Date(blog.createdAt).toLocaleString()}</p>
            {
              getUser() &&
              <div>
                <a href={`/blog/edit/${blog.slug}`}>
                  <button className='btn btn-outline-success'> อัพเดดบทความ </button> 
                </a> &nbsp;
                <button className='btn btn-outline-danger' onClick={() => confirmDelete(blog.slug)}> ลบบทความ </button>
              </div> 
            }
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
