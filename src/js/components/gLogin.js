/**
 * Created by Ali on 7/26/2017.
 */
import React from "react"
export default class GLogin extends React.Component{
    constructor(){
        super()
        this.state = {
            signupText:'',
            signupClick:()=>{},
            greeting:'',
            user:{},
            GoogleAuth:{}
        }
    }
    signIn(){
        this.state.GoogleAuth.signIn()
    }
    signOut(){
        this.state.GoogleAuth.signOut()
    }
    updateSigninStatus(){
        this.updateState(this.state.GoogleAuth)
    }
    updateState(GoogleAuth){
        let isSignedIn = (GoogleAuth)? GoogleAuth.isSignedIn.get():false
        let user
        if(isSignedIn){
            let basicProfile = GoogleAuth.currentUser.get().getBasicProfile()
            user = {
                imageUrl: basicProfile.getImageUrl(),
                givenName: basicProfile.getGivenName(),
                familyName: basicProfile.getFamilyName()
            };
        }
        else{
          user = {}  
        }
        let signupText, greeting, signupClick
        if (isSignedIn) {
            signupText = 'Sign out'
            greeting = 'Hello ' + user.givenName + ' ' + user.familyName
            signupClick = this.signOut.bind(this)
        } else {
            signupText = "Sign in with your Google account"
            greeting = ''
            signupClick = this.signIn.bind(this)
        }
        this.setState((prevState, props) => {
            return {GoogleAuth, user, signupText, greeting, signupClick};
        })
    }

    componentDidMount(){
        let errMsg = 'So sorry! Something went wrong! Please try later.'
        try{
            let self = this
            let sc = document.createElement('script')
            sc.src = 'https://apis.google.com/js/platform.js'
            sc.type = 'text/javascript'
            sc.async = true
            document.body.appendChild(sc)
            sc.onload = ()=>{
                let scope = 'https://www.googleapis.com/auth/userinfo.profile'
                let clientId = '_428861106660-3k079ehc7hnlum5plt6pqifsoas0ln6g.apps.googleusercontent.com'
                gapi.load('client', {
                    callback: ()=> {
                        gapi.client.init({
                            'clientId': clientId,
                            'scope': scope
                        }).then(() =>{
                            let GoogleAuth = gapi.auth2.getAuthInstance();
                            self.updateState(GoogleAuth)
                            GoogleAuth.isSignedIn.listen(self.updateSigninStatus.bind(self));
                        },
                        () => {alert(errMsg)})
                    },
                    onerror: ()=> {
                        alert(errMsg)
                    },
                    timeout: 5000,
                    ontimeout: ()=> {
                        alert(errMsg)
                    }
                });
            }
        }
        catch(e){
            alert(errMsg);
        }
    }
    render(){
        return(
            <div>
                <span id="greeting">{this.state.greeting}</span>
                <span id="google-sign-in" onClick={this.state.signupClick.bind(this)}>{this.state.signupText}</span>
            </div>
        )
    }
}