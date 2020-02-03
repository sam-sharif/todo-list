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
import cogoToast from 'cogo-toast';



class Signup extends Component {

    state = {
        formIsValid:false,
        userExist:false,
        signupStatus:false,
        showValidationError: false
    }
    
    componentWillUnmount(){
       
        if(this.props.signupDone){
            cogoToast.success('Account successfully created!')
            this.props.onSignupDoneOff()
            
        }
    }
    userAndPasswordHandler = (event) =>{
        let formValidation=false
        let inputList = document.querySelectorAll("input")
        let validationError = false
        const lettersAndNumbers = /^[0-9a-zA-Z]+$/;
        const startsWithLetter = /^\d/
         

        if(inputList[0].value.trim()!==''&&inputList[1].value.trim()!==''){
            if(inputList[0].value.match(lettersAndNumbers)&&
            isNaN(inputList[0].value.charAt(0))){
                formValidation=true;
                validationError=false;

            }
            else{
                validationError=true
            }
            
        }
        this.setState({[event.target.name]:event.target.value,
            formIsValid:formValidation,showValidationError:validationError})
        
    }
    signupHandler = ()=>{
        
        todoAxios.post(`/register`,{
            username:this.state.username,password:this.state.password
        }).
        then(response=>{
            console.log(response.data)
            this.props.onSignupSuccessful()
            this.setState({userExist:false})
            this.props.history.push("/login")
        }).catch(error=>{
            console.log(error)
            if(error.response.data==="UserAlreadyExists"){
                this.setState({userExist:true})
            }
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
                              Create Your Acount
                          </span>
                          {this.state.userExist?<span className="error">User Already Exists</span>:null}
                          {this.state.showValidationError?<span className="error">
                              Invalid Username/Password Format</span>:null}
                          <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is required">
                              <span className="label-input100">Username</span>
                              <input className="input100" type="text" name="username" value={this.state.username}
                              value={this.state.username} onChange={this.userAndPasswordHandler} placeholder="Type your username"
                              title="username must only contains letters and numbers and starts with a letter!"
                              />
                              <span className="focus-input100" data-symbol="&#xf206;"></span>
                          </div>
      
                          <div className="wrap-input100 validate-input" data-validate="Password is required">
                              <span className="label-input100">Password</span>
                              <input className="input100" type="password" name="password" value={this.state.password}
                               placeholder="Type your password" value={this.state.password} onChange={this.userAndPasswordHandler}/>
                              <span className="focus-input100" data-symbol="&#xf190;"></span>
                          </div>
                          
                                                    
                          <div className={buttonContainerStatus}>
                              <div className="wrap-login100-form-btn">
                                  <div className={buttonStatus}></div>
                                  <button className='login100-form-btn' disabled={!this.state.formIsValid} onClick={this.signupHandler}>
                                      Sign Up
                                  </button>
                              </div>
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
        onSignupSuccessful: () => dispatch(action.signupSucceeded()),
        onSignupDoneOff: () => dispatch(action.signupDoneOff())
        
    };
};
const mapStateToProps = state => {
    return {
        signupDone: state.signupDone
    };
  };


export default connect(mapStateToProps,mapDispatchToProps)(Signup) ;