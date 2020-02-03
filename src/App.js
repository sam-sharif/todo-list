import React,{Component, Fragment} from 'react';
import Login from './Container/Login/login'
import './App.css';
import {Route,Switch} from 'react-router-dom'
import Navbar from './Components/Navbar/navbar'
import TodoList from './Container/TodoList/todoList'
import HomePage from './Components/homePage/homePage'
import {connect} from 'react-redux'
import Signup from './Container/Signup/Signup'
import todoAxios from './api/todo/todoAxios'
//import TodoForm from './Container/TodoForm/TodoForm'



class App extends Component {

  render(){

    
    if(this.props.userAuthenticated){

      todoAxios.interceptors.request.use(request=>{
        request.headers.common['Authorization']='Bearer ' + this.props.token;
        request.headers.common['Content-Type']='application/json'
        request.headers.common['Accept']='application/json'
        console.log('INTERCEPTOR')
        console.log(this.props.token)
            console.log(request);
            console.log('INTERCEPTOR')
            return request;
        },error=>console.log(error)
        )
    }
    
     
    let myRouts = (
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/signup' exact component={Signup}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/todo' exact component={this.props.userAuthenticated?TodoList:Login}/>
        
        <Route path='/home' exact component={HomePage}/>
      </Switch>
    )
    return (
      <div className="App" style={{marginTop:'-50px'}}>
         <Navbar>
         {myRouts}
         </Navbar>
        
      </div>
    );
  }
  
}
const mapStateToProps = state => {
  return {
      userAuthenticated: state.userAuthenticated,
      token: state.token
  };
};


export default connect(mapStateToProps) (App);
