import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      date,
      source,
    } = this.props;
    return (
      <div className="container my-5">
        <div className="card hover-overlay hover-zoom hover-shadow ripple">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://www.financialexpress.com/wp-content/uploads/2023/04/mushroom-6358291__340.jpg"
                : imageUrl
            }
            className="card-img-top hover-overlay hover-zoom hover-shadow ripple"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-success">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noopener noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-outline-primary"
              style={{ position: "relative", left: "6rem" }}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
