import React, { Component } from 'react';
import Latestnews from './Latestnew';
import Load from './Load';


export class News extends Component {

    static defaultProps = {

        country: 'in',
        pageSize: 6,
        category: "general"
      }

    constructor() {
        
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

    }
    
    async componentDidMount() {
    
        
    //    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d963f4f551446cb88744e7fdfa9b017&page=1&pageSize=${this.props.pageSize}`;
    let url = `http://localhost:8080/get-news?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}`;
       
        this.setState({loading: true});
        let data = await fetch(url);
        console.log("Data:",data)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
             loading: false })
             
    }

    handlPrevClick = async () => {
    

    //    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d963f4f551446cb88744e7fdfa9b017&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let url = `http://localhost:8080/get-news?country=${this.props.country}&category=${this.props.category}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
       

    }
    handleNextClick = async () => {
        
       if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d963f4f551446cb88744e7fdfa9b017&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let url = `http://localhost:8080/get-news?country=${this.props.country}&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json()
    
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
     
        }

    render() {
        console.log("render")
        
        return (
            <div className="container my-3" >
                <div className="text-center">
                    <h1>NewsIndia Top-Headlines</h1>
                    {this.state.loading && <Load/>}
                </div>
                <div className="row">
                    {(!this.state.loading && this.state.articles) && this.state.articles.map((element,index) =>{
                        
                        return <div className="col-md-4" key={`${element.title}-${index}`}>
                            <Latestnews title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                  
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlPrevClick}>Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                  
                  
                </div>

            </div>
        )
    }
}

export default News
