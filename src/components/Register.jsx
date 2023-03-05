import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom'
import {useFormik} from "formik";
import * as yup from "yup"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formValidationSchema = yup.object({
    username:yup.string().required(),
    email:yup.string().required(),
    password:yup.string().required().min(5),
    confirmPassword:yup.string().required().min(5),
  })

function Register() {

  let navigate = useNavigate()

  const {handleSubmit, values, handleChange,handleBlur,touched, errors} = useFormik({
    initialValues:{
      username:'',
      email:'',
      password:'',
      confirmPassword:'',
    },
    validationSchema : formValidationSchema,
    onSubmit:(newList) => {
     addUser(newList)
    }
})

let addUser = async(newList) => {

    try{
        if(newList.password === newList.confirmPassword){
            const res = await axios.post(`/auth/register`,newList)
            if(res.data){
              if (res.data.msg === "Registered Successfully") {
                            toast.success('Account Created Successfully', {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              })
                              setTimeout(() => {
                                  navigate("/login")
                              },3000)
                        }else{
                                    toast.warning('User Already exist', {
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
        }else{
            toast.error('Password didnot Match', {
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
     } catch(err){
      toast.warning('User Already exist', {
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
  
<Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:{xs:"column-reverse",md:"row"},height:"100vh",width:"100vw"}}>

   <Box sx={{backgroundColor:"white",width:{xs:"100vw",sm:"100vw",md:"50vw"},padding:{xs:"40px 0px"}}}>

   <form  style={{height:"100%",display:"flex",alignItems:"center"}}  onSubmit = {handleSubmit}>

    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",height:{xs:"50%",sm:"50%",md:"100%"},width:{xs:"80%",sm:"50%"},margin:"0px auto"}}>

    <h4 style={{textAlign:"left",fontSize:"27px",margin:0}}>Welcome Buddy..❤</h4>
    <p style={{textAlign:"left",fontSize:"14px",color:"gray",margin:"12px 0px 0px 0px"}}>Please Enter Your Details to Register Here</p>

    <TextField
     id="outlined-basic" 
      label="Full Name"
      variant="outlined"
      name="username"
      value={values.username}
      onBlur={handleBlur}
      onChange={handleChange}
      type="text"
      error = {touched.username && errors.username}
       helperText =  {touched.username && errors.username ? errors.username :null}
       inputProps={{
        style: {
          height: "18px",
        },
      }}
      sx={{marginTop:"20px"}}
       />

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

      <TextField
      id="outlined-basic"
       label="Confirm Password"
        variant="outlined"
        name="confirmPassword"
        value={values.confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        type="password"
        error = {touched.confirmPassword && errors.confirmPassword}
         helperText =  {touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword :null}
         inputProps={{
         style: {
           height: "18px",
         },
       }}
       sx={{marginTop:"20px"}}
        />

 <button type="submit"  style={{backgroundColor:"#4115B0",padding:"14px 15px",border:"none",color:"white",outline:"none",marginTop:"20px",cursor:"pointer"}} >Register</button>
 <ToastContainer/>

 <p style={{textAlign:"center",fontSize:"14px",color:"gray",margin:"15px 0px 0px 0px",fontWeight:600}}>Already have an Account? <span onClick={() => navigate("/login")} style={{color:"#4115B0",fontWeight:700,cursor:"pointer"}}>Sign In</span></p>

 </Box>

</form>

   </Box>

  <Box sx={{height:{xs:"40%",sm:"50%",md:"100%"},backgroundColor:"#F3F4F8",width:{xs:"100vw",sm:"100vw",md:"50vw"},display:"flex",alignItems:"center"}}>

    <Box
    component="img"
    sx={{
      margin:"0px auto",
      objectFit:'cover',
      objectPosition:'center',
      width: { xs: '300px', sm:"500px", md: '600px' },
    }}
    alt="The house from the offer."
    src="/images\register.png"
    />

  </Box>

</Box>

  </>
}

export default Register