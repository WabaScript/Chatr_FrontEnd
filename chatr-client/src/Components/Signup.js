import React from 'react'

export default class Signup extends React.Component {

    state={
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        pro_pic: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleFormReset = () => {
        this.setState({
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            pro_pic: ""
        })
    }

    render(){
        return(
            <form onReset={this.handleFormReset} onSubmit={(e, signup) => this.props.handleSignupSubmit(e, this.state)}>
                <input type="text" placeholder="First Name" name="first_name" value={this.state.first_name} onChange={this.handleChange} />  
                <br/><input type="text" placeholder="Last Name" name="last_name" value={this.state.last_name} onChange={this.handleChange} />  
                <br/><input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />  
                <br/><input type="text" placeholder="Choose a Username" name="username" value={this.state.username} onChange={this.handleChange} />  
                <br/><input type="text" placeholder="Choose a password" name="password" value={this.state.password} onChange={this.handleChange} />  
                <br/><input type="text" placeholder="Profile Picture Url" name="pro_pic" value={this.state.pro_pic} onChange={this.handleChange} />   
                <br/><input type="submit" value="Submit" />
            </form>
        )
    }   
}