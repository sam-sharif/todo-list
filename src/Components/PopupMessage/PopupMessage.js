import React,{Component} from 'react'
import classes from './PopupMessage.css'

class PopupMessage extends Component{

    state = {
        
        showPopup:false
               
    }
    render(){

        return(
            <body id="body" className={this.state.showPopup?"active":null}>

<div className="wrapper">
    <div className="button" onClick={()=>this.setState({showPopup:true})}>

        <span id="titleElement" className="button-text">{this.props.title}</span>
        <div className="button-backgrounds">
        <div className="button-circle button-circle1"></div>
            <div className="button-circle button-circle2"></div>
            <div className="button-circle button-circle3"></div>
            <div className="button-circle button-circle4"></div>
        </div>
    </div> 
</div>

<div className="wrapper">
    <div className="popup">
        <div className="popup-inside">
            <div className="backgrounds">
                <div className="background"></div>
                <div className="background background2"></div>
                <div className="background background3"></div>
                <div className="background background4"></div>
                <div className="background background5"></div>
                <div className="background background6"></div>
            </div>
        </div>
        <div className="content">
            <div className="content-wrapper">
                <h1 style={{fontSize:'25px'}}>Description</h1>
                <p>{this.props.description}</p>
                <p style={{fontWeight:'bold'}} className="try-again" 
                onClick={()=>this.setState({showPopup:false})}>close</p>
            </div>
        </div>
    </div>
</div>

</body>
        )
    }

}
export default PopupMessage