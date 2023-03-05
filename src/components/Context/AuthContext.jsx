import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

  let [user, setUser] = useState(null)
  let [user2, setUser2] = useState(false)

    const getUser = async () => {
      let _id = localStorage.getItem("_id")
      try{
        if(_id){
          const res = await axios.get("/auth/" + _id)
          setUser(res.data)
        }
       }catch(err){
       console.log(err)
      }
     }

     useEffect(() => { getUser()}, [user2])

  return(
    <AuthContext.Provider value={{ user, setUser, setUser2 }}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default AuthContext
