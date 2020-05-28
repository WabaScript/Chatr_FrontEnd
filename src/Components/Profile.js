import React from 'react'

const Profile = props => {

    return (
        <div className="textStuffChat" >
            <img className="imgProfile" src={props.currentUser.pro_pic} />
            Name: {props.currentUser.first_name} {props.currentUser.last_name}<br/>
            Username: {props.currentUser.username}<br/>
            Email: {props.currentUser.email}
        </div>
    )

}

export default Profile;