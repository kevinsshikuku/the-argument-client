import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useAuthState } from '../context/auth';
import{ Link , useLocation} from "react-router-dom"

import  "../../src/App.css"


/** Floating action button */
function FabComponent() {
 const {user} = useAuthState();
 const location = useLocation()

 return (
   <>
     {  !(location.pathname === "/createmessage" ) &&
      <div className="fab">
            <Link to={ user ? "/createmessage" : "/login"}>
                  <Fab color="primary" aria-label="add">
                      <AddIcon />
                </Fab>
          </Link>
      </div>
    }
   </>
 )
}

export default FabComponent;
