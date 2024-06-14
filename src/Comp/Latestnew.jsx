import React, { Component } from 'react'

export class News extends Component {

    render() {
        let {title, description, imageurl, newsUrl, author , date }= this.props;

        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageurl?"https://static.foxnews.com/foxnews.com/content/uploads/2024/05/Canada-Serial-Killer-Assaulted.jpg":imageurl} className="card-img-top" alt="..."  />
                    <div className="card-body">
                        <h5 className="card-title"> {title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-primary">By {author} on {new Date(date).toGMTString()}</small></p>

                        <a rel="noreferrer" href={newsUrl} target="_blank" className= "btn btn-sm btn-secondary">Readmore</a>
                    </div>
                </div>
            </div >

        )
    }
}

export default News