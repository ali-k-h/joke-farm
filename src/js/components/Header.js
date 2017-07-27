import React from 'react'
import GLogin from './gLogin'
import * as xhr from './xhr'
import Jokes from './Jokes'

export default class Header extends React.Component{
    constructor(){
        super()
        this.state = {
            user: {},
            jokes: [],
            originalJokes:[],
            showSearch:false
        }
    }
    search(e){
        let str = e.target.value
        let _jokes = this.state.originalJokes.slice(0)
        let jokes = _jokes.filter((item)=>{
            if(item.joke.toLowerCase().indexOf(str.toLowerCase()) > -1) return item
        })
        this.setState(() => {
            return {jokes};
        })

    }
    callback(user){
        let showSearch
        let jokes
        let originalJokes
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
                    jokes = res.response.value
                    originalJokes = jokes
                    showSearch = true
                    this.setState(() => {
                        return {jokes,originalJokes,showSearch};
                    })
                })
                .catch(()=>{
                    alert('Something went wrong! please try later.')
                })
        }
        else{
            jokes = null
            showSearch = false
            originalJokes = null
            this.setState(() => {
                return {jokes,originalJokes,showSearch};
            })
        }

    }
    render(){
        return(
            <div>
                <header>
                <nav>
                    <GLogin callbackFromParent={this.callback.bind(this)} />
                </nav>
                <div>
                    { this.state.showSearch ? <input type="text" onChange={this.search.bind(this)} /> : null }
                </div>
                </header>
                <section>
                    <Jokes jokes={this.state.jokes}  />
                </section>
            </div>
        )
    }
}