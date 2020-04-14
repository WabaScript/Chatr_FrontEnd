import React from 'react'

export default class NewMessageForm extends React.Component {

    state={
        content: "",
        user_id: 1,
        chat_id: null
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value,
            chat_id: this.props.chat_id
        })
    }

    handleFormReset = () => {
        this.setState({content: null, chat_id: null})
    }

    render(){
        return(
            <form onReset={this.handleFormReset} onSubmit={(e, message) => this.props.handleMessageSubmit(e, this.state)}>
                <input type="text" placeholder="Write your message" name="content" value={this.state.content} onChange={this.handleChange} />  
                <input type="hidden" name= "user_id"  value={this.state.user_id}  />
                <input type="hidden" name= "chat_id"  value={this.state.chat_id}  />
                <input type="submit" value="Submit" />
            </form>
        )
    }   
}