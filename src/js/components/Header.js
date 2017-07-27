import React from 'react'
import GLogin from './gLogin'
import * as xhr from './xhr'
import Jokes from './Jokes'

export default class Header extends React.Component{
    constructor(){
        super()
        this.state = {
            user: {},
            jokes: []
        }
    }
    myCallback(user){
        if(user){
            this.setState(user)
            const firstName = user.givenName
            const lastName = user.familyName
            const options = {
                method:'GET',
                url:"http://api.icndb.com/jokes/?firstName=" + firstName + "&lastName=" + lastName
            }
            xhr.xhrPromise(options)
                .then((res)=>{
                    //console.log(res.response.value)
                    let jokes = res.response.value
                    // this.setState(jokes)
                    this.setState((prevState, props) => {
                        return {jokes};
                    })
                })
                .catch(()=>{
                    alert('Darn!')
                })
        }
        else{
            this.setState((prevState, props) => {
                let jokes = null
                return {jokes};
            })
        }

    }
    render(){
        return(
            <div>
                <header>
                    <nav>
                        <GLogin callbackFromParent={this.myCallback.bind(this)} />
                    </nav>
                </header>
                    <div>
                        <Jokes jokes={this.state.jokes}  />
                    </div>
            </div>
        )
    }
}