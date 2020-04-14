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

    handleFormReset = () => {
        this.setState({
            username: "",
            password: ""
        })
    }

    render(){
        return(
            <form>
                <input type="text" placeholder="Enter your Username" name="username" />  
                <br/><input type="text" placeholder="Enter your Password" name="password" />    
                <br/><input type="submit" value="Submit" />
            </form>
        )
    }   
}