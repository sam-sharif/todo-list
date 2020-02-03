import React,{Component, Fragment} from 'react'
import './todoList.css'
import todoAxios from '../../api/todo/todoAxios'
import PopupMessage from '../../Components/PopupMessage/PopupMessage'
import Button from '@material-ui/core/Button';

class todoList extends Component {
    state={
        todoList: []
    }
    componentDidMount(){

        todoAxios.get('/todos/samir').then(response=>{
            console.log(response)
            this.setState({todoList:response.data})
        }).catch(error=>console.log(error))
    }

    x = 1;
    y = -1;
    
    compareBy(key) {
        
      return (a, b)=> {
        if (a[key] < b[key]) return this.x;
        if (a[key] > b[key]) return this.y;
        return 0;
      };
    }
   
    sortBy(key) {
      let arrayCopy = [...this.state.todoList];
      arrayCopy.sort(this.compareBy(key));
      this.setState({data: arrayCopy});
      
    }
        
    render(){
        return(
            <Fragment>
            <body>
            <div className='main'>
             <h1>My Todo List</h1>
             <Button variant="contained" color="primary" size="large" aria-label="delete">
        Primary
      </Button>

<table className="container">
	<thead>
		<tr>
			
            <th><button className='ss' onClick={() => {
                this.sortBy('description')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1>Description <i class="fa fa-sort"></i></h1></button></th>

            <th><button onClick={() => {
                this.sortBy('startDate')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1>Start Date <i class="fa fa-sort"></i></h1></button></th>

            <th><button onClick={() => {
                this.sortBy('targetDate')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1>Target Date <i class="fa fa-sort"></i></h1></button></th>

            <th><button onClick={() => {
                this.sortBy('endDate')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1>End Date <i class="fa fa-sort"></i></h1></button></th>

            <th><button onClick={() => {
                this.sortBy('isDone')
                this.x=this.x*-1
                this.y=this.y*-1
            }}><h1>Is Done?</h1></button></th>
			
		</tr>
	</thead>
	<tbody>
        
		{this.state.todoList.map(m=>{
            return(
                <tr>
              
              <td>{m.description}</td>
              <td>{m.startDate}</td>
              <td>{m.targetDate}</td>
              <td>{m.endDate}</td>
              <td>{m.isDone}</td>
            </tr>

            )
            
        })}
	</tbody>
</table>
</div>

</body>
<PopupMessage/>
</Fragment>
        )
    }
}
export default todoList