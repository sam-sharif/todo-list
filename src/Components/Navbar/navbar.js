import React,{Fragment} from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import './navbar.css'
import {connect} from 'react-redux'
import * as action from '../../Store/index'


const navbar = (props)=>{

  let todoList = null
  let logStatus = <NavLink to={props.location.pathname==='/signup'?'/login':'/signup'}>
    <i className="fa fa-user-circle-o" style={{fontSize:'30px',color:'white'}}> Sign in/Sign up</i>
    
    </NavLink>
  let auth = "login" 

  const logoutHandler = ()=>{
    props.onLogout()
  }
  
  if(props.userAuthenticated){
    todoList = <NavLink to='/todo'><i class="fa fa-list-alt" style={{fontSize:'30px'}}> Todo List</i></NavLink>
    logStatus = <a href="" onClick={logoutHandler}><span>Logout</span></a>
    auth = "logout"
  }
  
    const myNavbar =
    <Fragment>
    <ul className="topnav">
      <li><NavLink to='/home'><i className="fa fa-home" style={{fontSize:'30px'}}> Home</i></NavLink></li>
      <li className={auth}>{logStatus}</li>
      <li>{todoList}</li>
      
    </ul>
    

</Fragment>

return(
<Fragment>
    {myNavbar}
    <main>
     {props.children}
    </main>
    
  </Fragment>
)
}
const mapDispatchToProps = dispatch => {
  return {
      onLogout: () => dispatch(action.logout)
      
  };
};
const mapStateToProps = state => {
  return {
      userAuthenticated: state.userAuthenticated
  };
};

export default connect(mapStateToProps,mapDispatchToProps) (withRouter(navbar))
