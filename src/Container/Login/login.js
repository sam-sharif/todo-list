import React, { Component,Fragment } from 'react';

import '../../assets/images/icons/favicon.ico'
import '../../assets/vendor/bootstrap/css/bootstrap.min.css'
import '../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../assets/vendor/animate/animate.css'
import '../../assets/vendor/css-hamburgers/hamburgers.min.css'
import '../../assets/vendor/animsition/css/animsition.min.css'
import '../../assets/css/util.css'
import '../../assets/css/main.css'
import {connect} from 'react-redux'
import * as action from '../../Store/index'
import todoAxios from '../../api/todo/todoAxios'
import {NavLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';




class FormPage extends Component {

    state = {
        username:'',
        password:'',
        formIsValid:false,
        loginStatus:true
    }
    
    componentDidMount(){
       
        

    }
    userAndPasswordHandler = (event) =>{
        let formValidation=false
        let inputList = document.querySelectorAll("input")
        
        if(inputList[0].value!==''&&inputList[1].value!==''){
            formValidation=true;
        }
        this.setState({[event.target.name]:event.target.value,formIsValid:formValidation})
    }
    loginHandler = ()=>{
        todoAxios.post(`/authenticate`,{
            username:this.state.username,password:this.state.password
        }).
        then(response=>{
            this.props.onSuccessfulLogin(this.state.username,response.data.token)
            this.props.history.push("/home")
            this.setState({loginStatus:true})
        }).catch(error=>{
            this.setState({loginStatus:false})
        })
       
    }
    
    render(){
        
        var bg=require('../../assets/images/bg-01.jpg')
        let buttonStatus = 'login-btn-disabled'
        let buttonContainerStatus = 'container-login-btn-disabled'
       
        
        if(this.state.formIsValid){
            buttonStatus ='login100-form-bgbtn'
            buttonContainerStatus='container-login100-form-btn'
        }

        return (
            <Fragment>
          <div className="limiter">
              <div className="container-login100" style={{backgroundImage: "url("+bg+")"}}>
                  <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                 
                          <span className="login100-form-title p-b-49">
                              Login
                          </span>
                          {this.state.loginStatus?null:<span className="error">Invalid Username/Password</span>}
      
                          <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
                              <span className="label-input100">Username</span>
                              <input className="input100" type="text" name="username"
                              value={this.state.username} onChange={this.userAndPasswordHandler} placeholder="Type your username"/>
                              <span className="focus-input100" data-symbol="&#xf206;"></span>
                          </div>
      
                          <div className="wrap-input100 validate-input" data-validate="Password is required">
                              <span className="label-input100">Password</span>
                              <input className="input100" type="password" name="password"
                               placeholder="Type your password" value={this.state.password} onChange={this.userAndPasswordHandler}/>
                              <span className="focus-input100" data-symbol="&#xf190;"></span>
                          </div>
                          
                                                    
                          <div className={buttonContainerStatus}>
                              <div className="wrap-login100-form-btn">
                                  <div className={buttonStatus}></div>
                                  <button className='login100-form-btn' disabled={!this.state.formIsValid}  onClick={this.loginHandler}>
                                      Login
                                  </button>
                              </div>
                          </div>
      
                          <div className="flex-col-c p-t-155" style={{paddingTop:'30px'}}>
                              <span className="txt1 p-b-17">
                                  Or Sign Up Using
                              </span>
      
                              
                                  <NavLink className="txt2" to="/signup"><h3>Sign Up</h3></NavLink>
                                  
                          </div>
                      
                  </div>
              </div>
          </div>
          <div id="dropDownSelect1"></div>
         
          </Fragment>
        )
    }
    
       
  
};
const mapDispatchToProps = dispatch => {
    return {
        onSuccessfulLogin: (username,token) => dispatch(action.authSuccess(username,token))
        
    };
};
const mapStateToProps = state => {
    return {
        signupDone: state.signupDone
    };
  };


export default connect(mapStateToProps,mapDispatchToProps)(FormPage) ;