import React from 'react'

export default class Login extends React.Component {

    state={
        username: "",
        password: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    // handleFormReset = () => {
    //     this.setState({
    //         username: "",
    //         password: ""
    //     })
    // }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    fetch("https://chatr2020.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)})
    .then(res => res.json())
    .then(response => {
      if (response.errors){
        alert(response.errors)
      } else {
        this.props.setUser(response)
      }
    })
  }

    render(){
        return(
            <form className={"padding"} onSubmit={this.handleLoginSubmit}>
                <input type="text" placeholder="Enter your Username" name="username" value={this.state.username} onChange={this.handleChange}/>  
                <br/><input type="password" placeholder="Enter your Password" name="password" value={this.state.password} onChange={this.handleChange}/>    
                <br/><input type="submit" value="Submit" />
            </form>
        )
    }   
}