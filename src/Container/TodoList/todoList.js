import React,{PureComponent, Fragment} from 'react'
import classes from './todoList.css'
import todoAxios from '../../api/todo/todoAxios'
import PopupMessage from '../../Components/PopupMessage/PopupMessage'
import {connect} from 'react-redux'

class todoList extends PureComponent {
    state={
        todoList: [] 
    }

    fetchData = ()=>{
        todoAxios.get(`/todos/${this.props.username}`).then(response=>{
            
            this.setState({todoList:response.data})
        }).catch(error=>console.log(error))

    }

    componentDidMount(){
        this.fetchData()
    }

    editHandler = (m)=>{
        this.props.history.push('/todoForm',{obj:m})
    }
    deleteHandler = (id)=>{
        todoAxios.delete(`/todo/${id}`).then(response=>this.fetchData()).catch(error=>console.log(error))

    }

    x = 1;
    y = -1;   
       
    sortBy(key) {
        
      let arrayCopy = [...this.state.todoList];
      arrayCopy.sort((a, b) => (a[key] > b[key]) ? this.x : this.y);
      this.setState({todoList: arrayCopy});
      
    }
    addTask = ()=>{
        let task = {id:'',description:'',title:'',startDate:'',endDate:'',targetDate:'',done:false,
        username:this.props.username}
        this.props.history.push('/todoForm',{obj:task})
    }
            
    render(){
       
        return(
<Fragment>

<body id="body" style={{marginTop:'4%',backgroundColor:'rgb(243, 178, 227)'}}>
<div id='main'>           

<table className="container">
	<thead>
        <tr>
            <th colspan="7" style={{textAlign:'right'}}>
             <button id="addBtn" onClick={this.addTask} type="button">
             <p><i className="fa fa-plus" > New Task</i></p>
             </button>

            </th>
        </tr>

        <tr>
            <th colspan="7">
                 <h1 id="tableTitle">My Todo List</h1>
            </th>
        </tr>
		<tr>
			
            <th><button  onClick={() => {
                this.sortBy('title')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1 id="H1">Title <i className="fa fa-sort"></i></h1></button></th>

            <th><button onClick={() => {
                this.sortBy('startDate')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1 id="H1">Start Date <i className="fa fa-sort"></i></h1></button></th>

            <th><button onClick={() => {
                this.sortBy('targetDate')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1 id="H1">Deadline <i className="fa fa-sort"></i></h1></button></th>

            <th><button onClick={() => {
                this.sortBy('endDate')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1 id="H1">End Date <i className="fa fa-sort"></i></h1></button></th>

            <th><button onClick={() => {
                this.sortBy('done')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1 id="H1">Completed<i className="fa fa-sort"></i></h1></button></th>

            <th style={{padding:'5px'}}><h1 id="H1">Update</h1></th>
            <th style={{padding:'5px'}}><h1 id="H1">Delete</h1></th>
			
		</tr>
	</thead>
	<tbody>
        
		{this.state.todoList.map(m=>{
            console.log(m)
            return(
                <tr style={{height:'10%'}}>
              
              <td className="notHover"><PopupMessage title={m.title} description={m.description}/></td>
              <td>{m.startDate}</td>
              <td>{m.targetDate}</td>
              <td>{m.endDate==null?'-':m.endDate}</td>
              <td className="notHover" style={{textAlign:'center'}}>{m.done===true?
              <i id="yesSign" className="fa fa-check"></i>:
              <i id="noSign" className="fa fa-close"></i>}</td>
              <td className="notHover"><button id="updateBtn" type="button"
               class="btn btn-success" onClick={()=>this.editHandler(m)}>Update</button></td>
              <td style={{padding:'5px'}} className="notHover"><button id="deleteBtn"
               type="button"class="btn btn-danger"
              onClick={() =>{if(window.confirm('Are you sure you wish to delete this item?'))
              this.deleteHandler(m.id) } }>Delete</button></td>
            </tr>

            )
            
        })}
	</tbody>
</table>
</div>

</body>

</Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.username,
        
    };
  };
export default connect(mapStateToProps) (todoList)