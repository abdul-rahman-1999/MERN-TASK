import { useContext, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import AuthContext from '../components/Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';



function NavBar() {

  const { user } = useContext(AuthContext)

  const logOut = () => {
    localStorage.removeItem("Authorization")
    localStorage.removeItem("_id")
    navigate("/")
  }

  let navigate = useNavigate()


  return (
      <AppBar position="sticky" sx={{backgroundColor:"#4115B0"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" ,gap : 2 }}>

          { user && user ?  <MenuItem>{user?.username}</MenuItem> : null}
         <p style={{cursor:"pointer"}} onClick={logOut}>Logout</p>

          </Box>
        </Toolbar>  
      </AppBar>

  );
}

export default NavBar