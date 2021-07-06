import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import {CircularProgress, Avatar, TextareaAutosize} from  "@material-ui/core";
import { SIGN_IN } from '../../Graphql/user';
import Logo from "../../Assets/EPL.png";
import  ImageUpload from "./imageUpload";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  signInContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(8, 0, 3, 0),
  },
  signInLogo:{
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    fontWeight: "bolder",
    fontSize: "xx-large",
    cursor: "pointer",
    justifyContent: "center",
  },
  signInForm:{
    width: "80vw"
  },
  signInInput:{
      display: "block",
     borderRadius:"15px",
      marginTop: "2rem",
      padding: "10px",
      outline: "none",
      fontSize: "large",
      height: "2em",
      width: "100%",
      color: "black",
      background: "none",
  },

  aboutUs:{
    color:"blue",
    padding: theme.spacing(0 ,.5),
    borderRadius:"5px",
    cursor:"pointer",
    fontSize:"1rem"
  },
  signInButton:{
      border: "none",
      backgroundColor: "rgb(155, 69, 69)",
      padding: "10px",
      width: "7rem",
      outline: "none",
      borderRadius: "18px",
      boxShadow: "none",
      cursor: "pointer",
      margin:" 2rem 0  2rem 30% ",
  },

loader: {
  display: "flex",
  justifyContent : "center",
  alignItems: "center",
  height:"100vh"
}

}))




/**  creates a user only accesible by admin */
function SignIn() {
  const classes = useStyles();
  const [ values, setValues ] = useState(
       { username: '',
       description: '',
       owner: "",
       manager: "",
       founder: "",
       founded: "",
       image:"",
       coverImage: "",
       group: false,
       stadium: "",
       }
);

  const [message, setMessage] = useState("");

/** handles post image upload ! */
 const handlePostImageUpload = (e ) => {
        const file = e.target.files[0];
        const name = e.target.name
        if (!file) return;
               setValues({ ...values, [name]: URL.createObjectURL(file) });
  };




/**submit hundler */
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


/**useMutation hook */
 let [signInUser,{loading, data}] = useMutation(SIGN_IN, {
 onCompleted(){
    setMessage("Created")
 },
 variables : values,
  onError(err){
     console.log(err)
  },
   });


  const handleSubmit = (e) => {
      e.preventDefault();
      signInUser();
  };




let loader;
if(loading){
  return(
    <div>
      <div className={classes.loader}>
        <CircularProgress/>
        <p>Creating user</p>
      </div>
    </div>
  )
}

const main = (

<div className={classes.signInContainer}>
      <div>
        <div  className={classes.signInLogo}>
          <span> <Avatar alt="logo" src={Logo} className={classes.large}/> </span>
          <p>EPL</p>
        </div>

        <img src={values.image} /> <img src={values.coverImage} />
        <form onSubmit={handleSubmit}  className={classes.signInForm} >


            {
            <>
           <p>Group</p>
           <label> Yes
               <input type="radio"
               name="group"
               placeholder="Group"
               value={values.group}
               style={{backgroundColor:"red"}}
              onChange={() => setValues({...values, group: true})}/>
           </label>

             <label> No
               <input type="radio"
               name="group"
               placeholder="Group"
               value={values.group}
               style={{backgroundColor:"red"}}
               onChange={() => setValues({...values, group: false})}/>
               </label>

            <ImageUpload handleChange={handlePostImageUpload}/>
            <input
            placeholder="Username"
            name= "username"
            type="text"
            value ={values.username}
            onChange={handleChange}
            className={classes.signInInput}
            />


            <input
            placeholder="Owner"
            name= "owner"
            type="text"
            value={values.owner}
            onChange={handleChange}
            className={classes.signInInput}
            />

            <input
            placeholder="Manager"
            name= "manager"
            type="text"
            value={values.manager}
            onChange={handleChange}
            className={classes.signInInput}
            />


            <input
            placeholder="Founder"
            name= "founder"
            type="text"
            value={values.founder}
            onChange={handleChange}
            className={classes.signInInput}
            />


            <input
            placeholder="Founded"
            name= "founded"
            type="text"
            value={values.founded}
            onChange={handleChange}
            className={classes.signInInput}
            />
            <input
            placeholder="Stadium"
            name= "stadium"
            type="text"
            value={values.stadium}
            onChange={handleChange}
            className={classes.signInInput}
            />

            <TextareaAutosize
            placeholder="Description"
            name= "description"
            type="text"
            value={values.description}
            onChange={handleChange}
            className={classes.signInInput}
            />

            <button type="submit" className={classes.signInButton}>  Create</button>
            </>
            }

        </form>
      </div>

</div>

)



 return (
  <>
    {loading ? loader : main}
    {!loading && data && message}
  </>
 );
}
export default SignIn;

