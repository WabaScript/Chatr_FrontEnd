import React from 'react'

export default class NewChatForm extends React.Component {

    state={
        topic: "",
        owner_id: "",
    }

    handleChange = (event) => {
        if (this.props.currentUser) {
            this.setState({
                topic: event.target.value,
                owner_id: this.props.currentUser.id
            })
        } 
        else {
            alert("You finna login?")
            console.log(this.props.currentUser)
        }
    }

    handleFormReset = () => {
        this.setState({topic: null})
    }

    render(){
        return(
            <form onReset={this.handleFormReset} onSubmit={(e, chat) => this.props.handleSubmit(e, this.state)}>
                <input type="text" placeholder="new topic" name="topic" value={this.state.topic} onChange={this.handleChange} />  
                <input type="hidden" name= "owner_id"  value={this.state.owner_id}  />
                <input type="submit" value="Submit" />
            </form>
        )
    }   
}