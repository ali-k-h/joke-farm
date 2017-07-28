import React from 'react'

export default class Jokes extends React.Component{
    render(){
        let jokes = this.props.jokes
        let listItems = []
        if(jokes){
            listItems = this.props.jokes.map((item) =>{
                return (
                    <div class="joke-item" key={item.id}>
                        {item.joke}
                    </div>
                );
            });
        }
        return(
            <div>
                {listItems}
            </div>
        )
    }
}
