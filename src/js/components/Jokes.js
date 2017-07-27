import React from 'react'

export default class Jokes extends React.Component{
    render(){
        let jokes = this.props.jokes
        let listItems = []
        if(jokes){
            listItems = this.props.jokes.map((item) =>{
                return (
                    <li key={item.id}>
                        {item.joke}
                    </li>
                );
            });
        }

        return(
            <ul>
                {listItems}
            </ul>
        )
    }
}
