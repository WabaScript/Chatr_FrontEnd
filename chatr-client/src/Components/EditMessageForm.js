import React from 'react'

class EditMessageForm extends React.Component {

    state={
        content: this.props.message.content,
        user_id: this.props.message.user_id,
        chat_id: this.props.message.chat_id,
        id: this.props.message.id
    }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


render(){
    return(
        <form onSubmit={(e, message) => this.props.handleEditMessageSubmit(e, this.state)}>
            <input type="text" placeholder="Write your message" name="content" value={this.state.content} onChange={this.handleChange} />  
            <input type="hidden" name= "user_id"  value={this.state.user_id}  />
            <input type="hidden" name= "chat_id"  value={this.state.chat_id}  />
            <input type="submit" value="Submit" />
        </form>
    )
    }   
}

export default EditMessageForm