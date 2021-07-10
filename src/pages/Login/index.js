import React , {useState}from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import jwtDecode  from 'jwt-decode';
import {useHistory} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./login.css";


import {SIGN_IN} from "../../Graphql/user";
import {Teams} from "../../Assets/logos";

import { useAuthDispatch } from '../../context/auth';

const  {  Arsenal, Astonvilla, Brighton, Burnley,Chelsea, CrystalPalace, Everton, Fullham, Liverpool, Leeds, Leicester, ManCity, ManU, Newcastle, Southampto, Sheffield,Tote, Westbrom, Wolverhampton, Westham } = Teams;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

/**Login page */
const Login = ()=> {
     const [open, setOpen] = useState(false);
     const [team, setTeam] = useState( {username: ""} );
     const dispatch = useAuthDispatch();
     const history = useHistory();
     const classes = useStyles();

    let vvv = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    console.log(vvv)

         /** Select team function */
          const select = (e) => {
          const teamUserName = e.target.innerText.trim()
          setTeam({username: teamUserName})
          setOpen(() => false)
          }


          const teamList =(
            <div  className="teamList">
                    <ul>
                         <div className="list_item">
                              {<img src={Arsenal} alt="ball"/>}
                              <li onClick={select}>Arsenal </li>
                         </div>
                         <div className="list_item">
                              {<img src={Astonvilla} alt="ball"/>}
                              <li onClick={select}>Aston  Villa </li>
                         </div>
                         <div className="list_item">
                              {<img src={Brighton} alt="ball"/>}
                              <li onClick={select}>Brighton</li>
                         </div>
                         <div className="list_item">
                              {<img src={Burnley} alt="ball"/>}
                              <li onClick={select}>Burnley </li>
                         </div>
                         <div className="list_item">
                              {<img src={Chelsea} alt="ball"/>}
                              <li onClick={select}>Chelsea </li>
                         </div>
                         <div className="list_item">
                              {<img src={CrystalPalace} alt="ball"/>}
                              <li onClick={select}>Crystal Palace </li>
                         </div>
                         <div className="list_item">
                              {<img src={Everton} alt="ball"/>}
                              <li onClick={select}>Everton </li>
                         </div>
                         <div className="list_item">
                              {<img src={Fullham} alt="ball"/>}
                              <li onClick={select}>Fulham</li>
                         </div>
                         <div className="list_item">
                              {<img src={Leeds} alt="ball"/>}
                              <li onClick={select}>Leads United</li>
                         </div>
                         <div className="list_item">
                              {<img src={Leicester } alt="ball"/>}
                              <li onClick={select}>Leicester City </li>
                         </div>
                         <div className="list_item">
                              {<img src={Liverpool} alt="ball"/>}
                              <li onClick={select}>Liverpool </li>
                         </div>
                         <div className="list_item">
                              {<img src={ManCity} alt="ball"/>}
                              <li onClick={select}>Manchester City </li>
                         </div>
                         <div className="list_item">
                              {<img src={ManU} alt="ball"/>}
                              <li onClick={select}>Manchester United </li>
                         </div>
                         <div className="list_item">
                              {<img src={Newcastle} alt="ball"/>}
                              <li onClick={select}> Newcastle </li>
                         </div>
                         <div className="list_item">
                              {<img src={Sheffield} alt="ball"/>}
                              <li onClick={select}>Shefield</li>
                         </div>
                         <div className="list_item">
                              {<img src={Southampto} alt="ball"/>}
                              <li onClick={select}>Southampton </li>
                         </div>
                         <div className="list_item">
                              {<img src={Tote} alt="ball"/>}
                              <li onClick={select}>Tottenham Hotspur </li>
                         </div>
                         <div className="list_item">
                              {<img src={Westbrom} alt="ball"/>}
                              <li onClick={select}>West Bromwich </li>
                         </div>
                         <div className="list_item">
                              {<img src={Westham} alt="ball"/>}
                              <li onClick={select}>West Ham </li>
                         </div>
                         <div className="list_item">
                              {<img src={Wolverhampton} alt="ball"/>}
                              <li onClick={select}>Wolvhampton  Wanderers</li>
                         </div>
                    </ul>
            </div>
          )
        /** Toggle team least */
          const handleClick = () => {
             setOpen(() => !open)
          }

          /** creates a auth user local state */
          const dispatchAction = (token) =>{
               const decodedToken = jwtDecode(token);
               dispatch({
                    type: "LOGIN",
                    token,
                    payload: decodedToken
               })
          }

          /**useMutation hook */
          let [signInUser, {loading}] = useMutation(SIGN_IN, {
               variables : team,
               /* -------------------------------------------------------------------------- */
               onCompleted(data){
               const token = data.signin.token
               dispatchAction(token);
               history.push('/')
               },
          });


const markUp =
                              <div className="loginWrapper">
                                             { !open &&
                                                       <div className="l_question">
                                                            <h2>Which team do you  suport ?</h2>
                                                            <button onClick={handleClick}>Select</button>
                                                            <p style={{color:"indigo"}} >{team.username}</p>
                                                            <div className="l_proceed">
                                                                 {team.username &&
                                                                 <button onClick={signInUser}>Continue</button>}
                                                            </div>
                                                       </div>
                                             }
                                             { open  && teamList }
                                             {loading &&
                                             <Backdrop className={classes.backdrop} open >
                                                 <CircularProgress color="primary" />
                                              </Backdrop>}
                              </div>

    return (markUp)
}

export default Login;
