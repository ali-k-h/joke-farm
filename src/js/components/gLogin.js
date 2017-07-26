/**
 * Created by Ali on 7/26/2017.
 */
import React from "react"
export default class GLogin extends React.Component{
    constructor(){
        super()
        this.state = {}
    }
    signIn(){
        this.state.GoogleAuth.signIn()
    }
    updateSigninStatus(isSignedIn){
        if(isSignedIn){
            console.log(this.state.GoogleAuth)

        }
    }

    componentDidMount(){
        let self = this
        let sc = document.createElement('script')
        sc.src = 'https://apis.google.com/js/platform.js'
        sc.type = 'text/javascript'
        sc.async = true
        document.body.appendChild(sc)
        sc.onload = (e)=>{
            let k = e
            let scope = 'https://www.googleapis.com/auth/userinfo.profile'
            let clientId = '428861106660-3k079ehc7hnlum5plt6pqifsoas0ln6g.apps.googleusercontent.com'
            gapi.load('client', {
                callback: function() {
                    // Handle gapi.client initialization.
                    //initGapiClient();
                    gapi.client.init({
                        'clientId': clientId,
                        'scope': scope
                    }).then(function () {
                        let GoogleAuth = gapi.auth2.getAuthInstance();
                        GoogleAuth.isSignedIn.listen(self.updateSigninStatus);
                        self.state.GoogleAuth = GoogleAuth
                        // Listen for sign-in state changes.
                        //** GoogleAuth.isSignedIn.listen(updateSigninStatus);
                        // Handle initial sign-in state. (Determine if user is already signed in.)
                        if (GoogleAuth.isSignedIn.get()) {
                            // User is authorized and has clicked 'Sign out' button.
                            //** GoogleAuth.signOut();
                        } else {
                            // User is not signed in. Start Google auth flow.
                            GoogleAuth.signIn();
                            let e = document.getElementById("google-sign-in")
                            e.innerHTML = "Sign in with your Google account"
                        }
                    })                },
                onerror: function() {
                    // Handle loading error.
                    alert('gapi.client failed to load!');
                },
                timeout: 5000, // 5 seconds.
                ontimeout: function() {
                    // Handle timeout.
                    alert('gapi.client could not load in a timely manner!');
                }
            });

        }
    }
    render(){
        return(
           <div id="google-sign-in" onClick={this.signIn.bind(this)}></div>
        )
    }
}