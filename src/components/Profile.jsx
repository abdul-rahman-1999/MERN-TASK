import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom'
import AuthContext from '../components/Context/AuthContext'
import axios from 'axios';

function Profile() {

const [user1, setUser1] = useState(null)
const {user, setUser2} = useContext(AuthContext)

const getUser = async () => {
  try{
if(user?._id){
  const res = await axios.get("/auth/" + user._id)
  setUser1(res.data)
}else{
  setUser2(true)
}
   }catch(err){
   console.log(err)
  }
 }

 useEffect(() => { getUser()}, [user?._id])

  return user1 ? <ProfileDetails user1={user1}/> : null

}

function ProfileDetails({user1}){

  let navigate = useNavigate()

  return<>
  
  <NavBar/>

<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}>


 <Paper sx={{textAlign:"center",width:{xs:"90%",sm:"80%"},margin:"0px auto",padding:"20px 10px",position:"relative"}}>


 <EditIcon onClick={() => navigate(`/profile/edit/${user1?._id}`)} sx={{position:"absolute",top:20,right:20,width:{xs:"24px",sm:"30px"},height:{xs:"24px",sm:"30px",color:"#4115B0"},cursor:"pointer"}}/>

 <Box
component="img"
sx={{
margin:"0px auto",
objectFit:'cover',
objectPosition:'center',
width: { xs: '100px', sm:"100px", md: '150px' },
height: { xs: '100px', sm:"100px", md: '150px' },
borderRadius:"50%"
}}
alt="The house from the offer."
src={user1?.profilePicture === "NA" ? "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1085&q=80" : user1?.profilePicture }
/>
<h4 style={{fontSize:"18px",fontWeight:700,margin:"18px"}}>{user1?.username}</h4>
<p style={{fontSize:"14px",fontWeight:500,color:"grey",margin:0}}>{user1?.description}</p>

<Box sx={{backgroundColor:"#f7f0ff",width:"100%", padding:"20px 0px",marginTop:"20px"}}>

<p style={{fontSize:"14px"}}>Email : {user1?.email}</p>
<p style={{fontSize:"14px"}}>Mobile : {user1?.mobile}</p>
<p style={{fontSize:"14px"}}>Gender : {user1?.gender}</p>
<p style={{fontSize:"14px"}}>Age : {user1?.age}</p>
<p style={{fontSize:"14px"}}>Country : {user1?.country}</p>
<p style={{fontSize:"14px"}}>State : {user1?.state}</p>
<p style={{fontSize:"14px"}}>City : {user1?.city}</p>
<p style={{fontSize:"14px"}}>DOB : {user1?.dateOfBirth}</p>
<p style={{fontSize:"14px"}}>Marital Status : {user1?.maritalStatus}</p>

</Box>

 </Paper>   

</Box>

  </>
}

export default Profile