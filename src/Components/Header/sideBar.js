import React,{ useState } from 'react';
import {Menu,   Close} from '@material-ui/icons';
import { Link, useHistory, useLocation } from "react-router-dom"
import { useAuthDispatch, useAuthState } from '../../context/auth';


const  SideBar = ()=> {
     const [open, setOpen] = useState(false);
    const dispatch = useAuthDispatch();
    const  {user} = useAuthState();
    const history = useHistory();
    const location = useLocation();
    const handleClick = () => {
      setOpen( !open)
    }


//Log out user
const logOut = () => {
  dispatch({type: 'LOGOUT'})
  history.push('/login')
}

    return (
<div>
     <div className="menuIcon">
           {open ?
           <Close onClick={handleClick}  fontSize="large" /> :
           <Menu onClick={handleClick}  fontSize="large" />}
     </div>
     {open &&
     <div className="menu" onClick={handleClick} >
       <br/>
        <Link to="/" style={{textDecoration:"none"}}><p>CHAT</p></Link>
        <br/>
        { !user && location.pathname !== `/login` && <Link to="/login"><p>LOGIN</p></Link>}
        <br/>
        { user && <p onClick={logOut}>LOGOUT</p>}
        <Link  to="/about" style={{textDecoration:"none"}} > <p>MORE</p> </Link>
     </div>
     }
</div>
    )
}

export default SideBar
