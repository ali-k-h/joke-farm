import React from "react"
import {Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login'

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            title:'Love Lips!'
        }
    }
    changeTitle(title){
        this.setState({title})
    }

    responseGoogle(res){
        console.log(res)
    }
    render(){
        const gId = "428861106660-3k079ehc7hnlum5plt6pqifsoas0ln6g.apps.googleusercontent.com"
        return (
            <div>
                <GoogleLogin
                    clientId={gId}
                    buttonText="Sign up with Google+"
                    onSuccess={this.responseGoogle.bind(this)}
                    onFailure={this.responseGoogle.bind(this)}
                />
            </div>
        )
    }
}