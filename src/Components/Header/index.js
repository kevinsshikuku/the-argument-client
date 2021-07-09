import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useAuthState } from '../../context/auth';
import  "./header.css";

import EPL from "../../Assets/EPL.png";
import PL from "../../Assets/PL.png"
import SideBar from "./sideBar";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));


/** Dynamic Header components */
function Header() {
     const classes = useStyles();
     const  {user} = useAuthState();

      const header_logic = (
         user ?
      <div className="headerWrapper">

                          <div className="logedIn_header">
                                 <Avatar alt="Remy Sharp" src={EPL} className={classes.large} />
                                 <div className="chat_details">
                                    <p> The EPL argument</p>
                                    <div>I  am <b style={{color:"white"}}>{user.username} </b> surporter  </div>
                                 </div>
                        </div>
                        <div className="sideBar">
                           <SideBar/>
                        </div>
      </div> :

      <div className="headerWrapper">
            <div className="h_header">
                <Avatar alt="Remy Sharp" src={PL} className={classes.large} />
                <p>EPL Chat</p>
            </div>

            <div className="sideBar">
               <SideBar/>
            </div>
      </div>

      );

   return header_logic
}
export default Header;
