import {useHistory} from "react-router-dom";



/** Application routes */
const Routes = () => {
const history = useHistory();

const route = {
      backHome: (e) =>{
       history.push('/')
    },

   goBack: (e) => {
      history.goBack()
   }
 }

 return route
}

export default Routes
