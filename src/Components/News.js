import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `Daily_Hunt - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.props.setProgress(10);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  // PrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.componentDidMount();
  // };

  // NextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.componentDidMount();
  // };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      // loading: false,
    });
  };

  render() {
    return (
      <>
       <h1 className="text-center" style={{margin:'30px 0'}}>DailyHunt - Top {this.capitalizeFirstLetter(this.props.category)} Headings</h1>
      
          <InfiniteScroll
            dataLength={this.state.articles.length}
            // loader={this.state.loading && <Spinner/>}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
          >
            <div className="container">
        <div className="row">
          {/* AGr loading true ho to spinner dikhaye wrna na dikhaye */}
            {this.state.loading && <Spinner/>}
              {this.state.articles.map((element, index) => {
                return <div className="col-md-4" key={index}>
                    <NewsItem
                      title={element.title}
                      description={
                        !element.description
                          ? "Please click on read more button to read full discription of this news"
                          : element.description
                      }
                      newsUrl={element.url}
                      imageUrl={element.urlToImage}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                
              })}
              </div>
        </div>
          </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between" style={{ margin: '2rem -5rem' }}>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.PrevClick}> &larr; Previous</button>
          <button
            type="button"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.NextClick}
          >
            Next &rarr;
          </button>
        </div> */}
        </>

      )
    
  }
}

export default News;
