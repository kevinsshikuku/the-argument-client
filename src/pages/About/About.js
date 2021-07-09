import React from 'react'
import "./style.css";

import  { Avatar} from "@material-ui/core";
import { Teams }  from "../../Assets/logos";

function About() {
 return (
  <div className="about">
   <Avatar src={Teams.Voke}/>
      <h1>Made with love by; Kevin Shikuku</h1>
      <i>_Qutekid</i>
  </div>
 )
}

export default About
