import React from 'react'
import Image from '../../assets/images/dreamstime.jpg'
import './homePage.css'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

const homePage = (props)=>{
    const styles = {
        paperContainer: {
            backgroundImage: `url(${Image})`,
            marginTop:'0px',
            marginBottom:'0px',
            backgroundSize:'cover'
            
        }
    };
    return(
         <div class="jumbotron jumbotron-fluid" style={styles.paperContainer}>
           <div class="container" >
    <h1 class="display-3"style={
      {color:'rgb(80, 149, 228)',
        fontWeight:'bolder',textShadow:'3px 3px black',backgroundColor:'rgba(139, 137, 139,0.3)',
      border:'1px solid black'}}>{props.userAuthenticated?"Welcome Dear"+ ' ' +props.username:
      "Please login to access your TODO LIST"}</h1>
            <div id="backgroundDiv"> <p style={{color:'white',fontWeight:'bolder',fontSize:'20px'}}>
              Using this application you can create your todo list and schedule your activities.
             I hope you enjoy it!</p></div>
               <p class="lead">
             <NavLink class="btn btn-primary btn-lg" to={props.userAuthenticated?"/todo":"/login"} role="button">
             {props.userAuthenticated?"Go to your Todo List":<span>Login</span>}</NavLink>
           </p>
           </div>
        </div>
    )
}
const mapStateToProps = state => {
  return {
      userAuthenticated: state.userAuthenticated,
      username: state.username
  };
};
export default connect(mapStateToProps) (homePage)