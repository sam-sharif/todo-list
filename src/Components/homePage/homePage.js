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
         <div className="jumbotron jumbotron-fluid" style={styles.paperContainer}>
           <div id="HomepageContainer" >
    <h1 id="homepageH1" className="display-3">{props.userAuthenticated?"Welcome Dear"+ ' ' +props.username:
      "Please login to access your TODO LIST"}</h1>
            <div id="homepageBackgroundDiv"> <p>
              Using this application you can create your todo list and schedule your activities.
             I hope you enjoy it!</p></div>
               <p className="lead">
             <NavLink className="btn btn-primary btn-lg" to={props.userAuthenticated?"/todoList":"/login"} role="button">
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