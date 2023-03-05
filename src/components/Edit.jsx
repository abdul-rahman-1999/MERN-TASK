import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import {useNavigate, useParams} from 'react-router-dom'
import NavBar from './NavBar';
import Paper from '@mui/material/Paper';
import {useFormik} from "formik";
import * as yup from "yup"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AuthContext from '../components/Context/AuthContext'
import Typography  from '@mui/material/Typography ';
import MenuItem from '@mui/material/MenuItem';


const formValidationSchema = yup.object({
    email:yup.string().required(),
    username:yup.string().required().min(5),
    profilePicture:yup.string().required(),
    description:yup.string().required().min(5),
    state:yup.string().required(),
    city:yup.string().required(),
    country:yup.string().required(),
    gender:yup.string().required(),
    mobile:yup.string().required().min(10),
    age:yup.string().required(),
    dateOfBirth:yup.string().required(),
    maritalStatus:yup.string().required(),
  })

function Edit() {

    const {id} = useParams()

    const [user, setUser] = useState(null)

    const getUser = async () => {
      try{
      const res = await axios.get("/auth/" + id)
      setUser(res.data)
       }catch(err){
       console.log(err)
      }
     }
    
     useEffect(() => { getUser()}, [])

  return user ? <EditForm user={user}/> : null

}

function EditForm({user}){

  let navigate = useNavigate()

  const token = localStorage.getItem("Authorization")

  if(!token){
    navigate("/")
  }
    
  const {handleSubmit, values, handleChange,handleBlur,touched, errors} = useFormik({
    initialValues:{
      email:user?.email,
      username:user?.username,
      profilePicture:user?.profilePicture,
      description:user?.description,
      state:user?.state,
      city:user?.city,
      country:user?.country,
      gender:user?.gender,
      mobile:user?.mobile,
      age:user?.age,
      dateOfBirth:user?.dateOfBirth,
      maritalStatus:user?.maritalStatus,
    },
    validationSchema : formValidationSchema,
    onSubmit:(editedDetails) => {
      updatedData(editedDetails)
    }
})

let updatedData = async(editedDetails) => {

  try{
  const res = await axios.put("/user/update/" + user?._id , editedDetails,{
    headers : {
      Authorization:token
    }
  })
  if(res){
    toast.success('Profile Updated', {
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
        navigate(`/profile`)
    },3000)
  }
  }catch(err){
    toast.error("Oops something went Wrong", {
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

  return<>
  
  <NavBar/>
  
  <Box> 

  <h4 style={{fontSize:"18px",fontWeight:700,margin:"18px",textAlign:"center"}}>Edit Your Details</h4>

  <Paper>

  <form onSubmit = {handleSubmit}>

  <Box sx={{display:"flex",flexDirection:"column",width:{xs:"90%",sm:"70%",md:"60%"},margin:"10px auto",gap:"14px"}}>

  <Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},marginTop:"14px",fontWeight:600}}>Email</Typography>

  <TextField
  id="outlined-basic"
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
     />

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>User Name</Typography>

<TextField
  id="outlined-basic"
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
     />

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>Profile Picture</Typography>

<TextField
  id="outlined-basic"
    variant="outlined"
    name="profilePicture"
    value={values.profilePicture}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.profilePicture && errors.profilePicture}
     helperText =  {touched.profilePicture && errors.profilePicture ? errors.profilePicture :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}
     />

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>Description</Typography>

<TextField
  id="outlined-basic"
    variant="outlined"
    name="description"
    value={values.description}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.description && errors.description}
     helperText =  {touched.description && errors.description ? errors.description :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}
     />

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>State</Typography>

<TextField
  id="outlined-basic"
  label={values.state}
  select
    variant="outlined"
    name="state"
    value={values.state}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.state && errors.state}
     helperText =  {touched.state && errors.state ? errors.state :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}>
  <MenuItem value="TamilNadu">TamilNadu</MenuItem>
  <MenuItem value="Kerala">Kerala</MenuItem>
  <MenuItem value="Telangana">Telangana</MenuItem>

  </TextField>

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>City</Typography>

<TextField
  id="outlined-basic"
    variant="outlined"
    label={values.city}
    select
    name="city"
    value={values.city}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.city && errors.city}
     helperText =  {touched.city && errors.city ? errors.city :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}>
  <MenuItem value="KanyaKumari">KanyaKumari</MenuItem>
  <MenuItem value="Tirunelveli">Tirunelveli</MenuItem>
  <MenuItem value="Madurai">Madurai</MenuItem>
  <MenuItem value="KarnaTrichytaka">Trichy</MenuItem>
  <MenuItem value="Chennai">Chennai</MenuItem>
  </TextField>

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>Country</Typography>

<TextField
  id="outlined-basic"
  label={values.country}
  select
    variant="outlined"
    name="country"
    value={values.country}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.country && errors.country}
     helperText =  {touched.country && errors.country ? errors.country :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}>
  <MenuItem value="India">India</MenuItem>
  <MenuItem value="South Africa">South Africa</MenuItem>
  <MenuItem value="West Indies">West Indies</MenuItem>
  <MenuItem value="Srilanka">Srilanka</MenuItem>
  <MenuItem value="Australia">Australia</MenuItem>
  </TextField>

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>Gender</Typography>

<TextField
  id="outlined-basic"
  label={values.gender}
   select
    variant="outlined"
    name="gender"
    value={values.gender}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.gender && errors.gender}
     helperText =  {touched.gender && errors.gender ? errors.gender :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}>
  <MenuItem value="Male">Male</MenuItem>
  <MenuItem value="Female">Female</MenuItem>

  </TextField>

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>Mobile No</Typography>

<TextField
  id="outlined-basic"
    variant="outlined"
    name="mobile"
    value={values.mobile}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.mobile && errors.mobile}
     helperText =  {touched.mobile && errors.mobile ? errors.mobile :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}
     />

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>Age</Typography>

<TextField
  id="outlined-basic"
    variant="outlined"
    name="age"
    value={values.age}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.age && errors.age}
     helperText =  {touched.age && errors.age ? errors.age :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}
     />

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>DOB</Typography>

<TextField
  id="outlined-basic"
    variant="outlined"
    name="dateOfBirth"
    value={values.dateOfBirth}
    onBlur={handleBlur}
    onChange={handleChange}
    type="date"
    error = {touched.dateOfBirth && errors.dateOfBirth}
     helperText =  {touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}
     />

<Typography style={{textAlign:"left",width:{xs:"90%",sm:"70%",md:"60%"},fontWeight:600}}>Marital Status</Typography>

<TextField
  id="outlined-basic"
  label={values.maritalStatus}
  select
    variant="outlined"
    name="maritalStatus"
    value={values.maritalStatus}
    onBlur={handleBlur}
    onChange={handleChange}
    type="text"
    error = {touched.maritalStatus && errors.maritalStatus}
     helperText =  {touched.maritalStatus && errors.maritalStatus ? errors.maritalStatus :null}
     inputProps={{
     style: {
       height: "18px",
     },
   }}>
      <MenuItem value="Single">Single</MenuItem>
  <MenuItem value="Married">Married</MenuItem>
  </TextField>

 <Button type="submit" sx={{backgroundColor:"#4115B0",padding:"14px 0px",border:"none",color:"white",outline:"none",marginTop:"14px"}} variant="contained">Update</Button>
 <ToastContainer/>

  </Box>
  </form>

  </Paper>

  </Box>


  </>
}

export default Edit