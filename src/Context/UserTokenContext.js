import { createContext } from "react";
import { useState } from "react";

export let  UserTokenContext = createContext();
export default function UserTokenContextProvider(props){
const [UserToken, setUserToken] = useState(null)
const [UserData, setUserData] = useState(null)

return <UserTokenContext.Provider value={{UserToken,setUserToken ,setUserData,UserData}}>
    {props.children}
</UserTokenContext.Provider>

}