import React from "react"

export default class GLogin extends React.Component{
    constructor(){
        super()
        this.state = {
            signupText:'',
            signupClick:()=>{},
            greeting:'',
            user:null,
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
          user = null
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
        this.setState(() => {
            return {GoogleAuth, user, signupText, greeting, signupClick};
        })
        this.props.callbackFromParent(user);
    }

    componentDidMount(){
        const errMsg = 'So sorry! Something went wrong! Please try later.'
        let self = this
        let sc = document.createElement('script')
        sc.src = 'https://apis.google.com/js/platform.js'
        sc.type = 'text/javascript'
        sc.async = true
        document.body.appendChild(sc)
        sc.onload = ()=>{
            const scope = 'https://www.googleapis.com/auth/userinfo.profile'
            const clientId = '428861106660-3k079ehc7hnlum5plt6pqifsoas0ln6g.apps.googleusercontent.com'
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

    render(){
        return(
            <div class="row g-login">
                <div class="col-xs-12 greeting">{this.state.greeting}</div>
                <div class={this.state.user?"col-xs-12 sign-out":"col-xs-12 sign-in"}
                      onClick={this.state.signupClick.bind(this)}>{this.state.signupText}</div>
            </div>
        )
    }
}