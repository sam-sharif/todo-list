import React,{Component} from 'react';
import classes from './TodoForm.css'
import cogoToast from 'cogo-toast';
import todoAxios from '../../api/todo/todoAxios'


class TodoForm extends Component{
    state={
        task:{
            id:'',
            username:'',
            title:'',
            startDate:'',
            targetDate:'',
            endDate:'',
            done:false,
            description:''
        },
        inputsNotNull:false,
        datesValid:true,
        
        
    }

    componentDidMount(){
        console.log(this.props.location.state['obj'])
        this.dateValidationChecker()
        
    }
    componentWillMount(){
        let receivedTask = this.props.location.state['obj']
        this.setState({task:receivedTask})

    }

    dateComparisonChecker = ()=>{
        let dateValidity=false
        let startDateInput = document.getElementById("startDate").value
        let targetDateInput = document.getElementById("targetDate").value
        console.log("this is :"+this.state.task.endDate)
        if(this.state.task.endDate===null||this.state.task.endDate===''){
            if((new Date(startDateInput).getTime()) <= (new Date(targetDateInput).getTime())){
                dateValidity=true
                
            } 
        }
        if(this.state.task.endDate!==null||this.state.task.endDate!==''){
            let endDateInput = document.getElementById("endDate").value
            if((new Date(startDateInput).getTime()) <= (new Date(targetDateInput).getTime())&&
            (new Date(startDateInput).getTime())<=(new Date(endDateInput).getTime())){
                dateValidity=true
                
            }
        }
       
        return dateValidity
    }

    submitHandler = (e)=>{
        e.preventDefault()
        if (this.dateComparisonChecker()) {
            if(this.state.task.id===''){ 
                todoAxios.post('/todo',this.state.task).then(respone=>{
                    cogoToast.success('Task Successfully Created')
                    this.props.history.push('/todoList')

                }).catch(er=>{
                    cogoToast.error(er.message)
                })
            }
            if(this.state.task.id!==''){ 
                todoAxios.put('/todo',this.state.task).then(respone=>{
                    cogoToast.success('Task Successfully Updated')
                    this.props.history.push('/todoList')

                }).catch(er=>{
                    cogoToast.error(er.message)
                })
            }
           
        }else{
            cogoToast.error('WRONG INPUT DATES!',{hideAfter:5})
        }

    }
    cancelHandler = ()=>{
        this.props.history.push('/todoList')
    }
    
    inputHandler = (event) =>{
        let inputValidity=false
        let inputList = document.querySelectorAll("input")
        let textarea = document.getElementById("description").value
        
        
            
            if(inputList[0].value!==''&&inputList[1].value!==''&&
               inputList[2].value!==''&&textarea!==''){

                 inputValidity=true; 
        }
    
        
        let newTask = {...this.state.task}

        switch (event.target.name) {
            case 'done': 
            newTask[event.target.name]=event.target.checked
                break;
            
        
            default:
                newTask[event.target.name]=event.target.value
                break;
        }
        console.log(event.target.value)
        this.setState({task:newTask,inputsNotNull:inputValidity}) 
    }

    dateValidationChecker =()=>{
        const today = new Date().toISOString().split('T')[0];
        let dates = document.getElementsByClassName("Date")
        for (let i = 0; i < dates.length; i++) {
            if(this.state.task[dates[i].name]===''){
                dates[i].setAttribute('min', today);
            }
               
        }
    }
    

    render(){
        
    
        return(
            <body id="bodyForm">
    <div id="formContainer">
        
        <div className="section animated bounceInLeft">
            <div className="brandname">
                <h1 >Sam Sharif</h1>
                <h3>-------------------</h3>
                <h3>Full-Stack Developer</h3>
                <ul>
                    <li><span>LinkedIn:</span> https://www.linkedin.com/in/sam-sharif-profile/</li>
                    <li><span>Email:</span> samir.shaarif@gmail.com</li>
                    
                </ul>
            </div>
            <div className="contact">
                <h2>{this.state.task.id===''?"Define Your New Task":"Edit Your Task"}</h2>
                <form >
                    <p>
                        <label>Title:</label>
                        <input  type="text" name="title" value={this.state.task.title}
                        onChange={this.inputHandler}/>
                    </p>
                    <p>
                        <label>Start Date</label>
                        <input id="startDate" name="startDate"  type="date" className="Date"
                           min="" onKeyDown={(e) => e.preventDefault()} value={this.state.task.startDate}
                        onChange={this.inputHandler}/>
                    </p>
                    <p>
                        <label>Deadline</label>
                        <input type="date" id="targetDate" name="targetDate" className="Date"
                         min="" onKeyDown={(e) => e.preventDefault()} value={this.state.task.targetDate}
                        onChange={this.inputHandler}/>
                    </p>
                    <p>
                        <label>End Date</label>
                        <input type="date" id="endDate" name="endDate" className="Date"
                         min="" onKeyDown={(e) => e.preventDefault()} value={this.state.task.endDate}
                        onChange={this.inputHandler} disabled={this.state.task.id===''}/>
                    </p>
                    <p>
                    <div  className="custom-control custom-checkbox mb-3">
                      <label style={{display:'inline',width:'10%'}}>Completed:</label>
                        <input disabled={this.state.task.id===''} type="checkbox" id="switch" name="done"
                        checked={this.state.task.done} onClick={this.inputHandler} />
                      <label id="toggleLabel" for="switch">Toggle</label>
                    </div>
                    </p>
                    <p className="full">
                        <label>Task Description</label>
                        <textarea id="description" name="description" cols="30" rows="5" value={this.state.task.description}
                          onInput={this.inputHandler}></textarea>
                    </p>
                    <p className="submit">
                        <button id="submitButton" onClick={this.submitHandler} disabled={!this.state.inputsNotNull}>Submit</button>
                    </p>
                    <p className="cancel">
                        <button id="cancelButton" onClick={this.cancelHandler}>Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    </div>
</body>
        )
    }
}


export default TodoForm