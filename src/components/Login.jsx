import React, {useContext} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom'
import {useFormik} from "formik";
import * as yup from "yup"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../components/Context/AuthContext'

const formValidationSchema = yup.object({
    email:yup.string().required(),
    password:yup.string().required().min(5),
  })

function Login() {

    let navigate = useNavigate()

    const { setUser } = useContext(AuthContext)
    
    const {handleSubmit, values, handleChange,handleBlur,touched, errors} = useFormik({
      initialValues:{
        email:'',
        password:'',
      },
      validationSchema : formValidationSchema,
      onSubmit:(loginUser) => {
      addList(loginUser)
      }
  })
  
  
  
  let addList = async(loginUser) => {
  
    try{
      const res = await axios.post(`/auth/login`,loginUser)
      if(res.data){ 
        setUser(res.data.user)
        if (res.data.msg === "Login Successfully") {
                      toast.success('Login Successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        })
                        localStorage.setItem("Authorization", res.data.token)
                        localStorage.setItem("_id", res.data.user._id)
                        setTimeout(() => {
                            navigate(`/profile`)
                        },3000)
                  }else{
                              toast.error(res.data.msg, {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                })
                            }
      }
     }catch(err){
      toast.error(err, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
     }

  }

  return <>
  
  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",flexDirection:{xs:"column-reverse",md:"row"},height:"100vh",width:"100vw"}}>

<Box sx={{height:{xs:"50%",sm:"50%",md:"100%"},backgroundColor:"white",width:{xs:"100vw",sm:"100vw",md:"50vw"}}}>

<form style={{height:"100%",display:"flex",alignItems:"center"}}  onSubmit = {handleSubmit}>

 <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",height:{xs:"50%",sm:"50%",md:"100%"},width:{xs:"80%",sm:"50%"},margin:"0px auto"}}>

 <h4 style={{textAlign:"left",fontSize:"27px",margin:0}}>Welcome Buddy..❤</h4>
 <p style={{textAlign:"left",fontSize:"14px",color:"gray",margin:"12px 0px 0px 0px"}}>Please Enter Your Credentials to Login</p>


 <TextField
  id="outlined-basic"
   label="Email"
    variant="outlined"
    name="email"
    value={values.email}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.email && errors.email}
     helperText =  {touched.email && errors.email ? errors.email :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}
   sx={{marginTop:"20px"}}
     />
    
 <TextField
  id="outlined-basic"
   label="Password"
    variant="outlined"
    name="password"
    value={values.password}
    onBlur={handleBlur}
    onChange={handleChange}
    type="password"
    error = {touched.password && errors.password}
     helperText =  {touched.password && errors.password ? errors.password :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}
   sx={{marginTop:"20px"}}
   />


<button type="submit"  style={{backgroundColor:"#4115B0",padding:"14px 15px",border:"none",color:"white",outline:"none",marginTop:"20px",cursor:"pointer"}} >Login</button>
<ToastContainer/>

<p style={{textAlign:"center",fontSize:"14px",color:"gray",margin:"15px 0px 0px 0px",fontWeight:600}}>Dont have an Account? <span onClick={() => navigate("/register")} style={{color:"#4115B0",fontWeight:700,cursor:"pointer"}}>Register</span></p>

</Box>

</form>

</Box>

<Box sx={{height:{xs:"50%",sm:"50%",md:"100%"},backgroundColor:"#F3F4F8",width:{xs:"100vw",sm:"100vw",md:"50vw"},display:"flex",alignItems:"center"}}>

 <Box
 component="img"
 sx={{
   margin:"0px auto",
   objectFit:'cover',
   objectPosition:'center',
   width: { xs: '300px', sm:"500px", md: '600px' },
 }}
 alt="The house from the offer."
 src="/images\login.png"
 />

</Box>

</Box>

  </>
}

export default Login