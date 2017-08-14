import React from 'react'
import GLogin from '../components/gLogin'
import * as xhr from '../components/xhr'
import Jokes from '../components/Jokes'

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            user: null,
            jokes: [],
            originalJokes: [],
            showSearch: false
        }
    }

    search(e) {
        let str = e.target.value
        let _jokes = this.state.originalJokes.slice(0)
        let jokes = _jokes.filter((item) => {
            if (item.joke.toLowerCase().indexOf(str.toLowerCase()) > -1) return item
        })
        this.setState(() => {
            return {jokes};
        })

    }

    callback(user) {
        let showSearch
        let jokes
        let originalJokes
        if (user) {
            this.setState(user)
            const firstName = user.givenName
            const lastName = user.familyName
            const options = {
                method: 'GET',
                url: "http://api.icndb.com/jokes/?firstName=" + firstName + "&lastName=" + lastName
            }
            xhr.xhrPromise(options)
                .then((res) => {
                    jokes = res.response.value
                    originalJokes = jokes
                    showSearch = true
                    this.setState(() => {
                        return {jokes, originalJokes, showSearch};
                    })
                })
                .catch(() => {
                    alert('Something went wrong! please try later.')
                })
        }
        else {
            jokes = null
            showSearch = false
            originalJokes = null
            user = null
            this.setState(() => {
                return {jokes, originalJokes, showSearch, user};
            })
        }

    }

    render() {
        return (
            <div>
                <div class="container farm-fence">
                    <header class="header">
                        <div class="col-xs-12 title">
                            Joke Farm! Jump in...
                        </div>
                        <GLogin callbackFromParent={this.callback.bind(this)}/>
                        <div class="search-wrapper">
                            { this.state.showSearch ?
                                <input class="search-input" autoFocus="true" placeholder="Search for fun..."
                                       type="text" onChange={this.search.bind(this)}/> : null }
                        </div>
                    </header>
                </div>
                <div class="container farm-fence">
                    <section class="jokes-list">
                        <Jokes jokes={this.state.jokes}/>
                    </section>
                </div>
            </div>
        )
    }
}