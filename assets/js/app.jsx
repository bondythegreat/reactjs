'use strict';
var url = "http://bondan.senta.nu/portfolio/reactjs/assets/data/data.xml",
    numItem = 20;

var NewsList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  ajaxRequest: function() {
    var self = this,
        randomNum = Math.floor((Math.random() * 10000) + 1), /* force new cache of google feeds */
        newUrl = this.props.rss +"?&t=" + new Date().getTime() + randomNum,
        feed = new google.feeds.Feed(newUrl);

    feed.setNumEntries(numItem);
    feed.includeHistoricalEntries();

    feed.load(function(result) {
      self.setState({data: result.feed.entries});
    });
    /*var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.props.rss, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200)
      {
        self.loadData(xhr.responseXML);
      }
    };
    xhr.send(null);*/
  },
  componentDidMount: function() {
    this.ajaxRequest();
    setInterval(this.ajaxRequest, 2000);
  },
  render: function() {
    return (
      <NewsItem data={this.state.data} />
    );
  }
});

var NewsItem = React.createClass({
  render: function() {
    if (this.props.data == ""){
      return(
        <div className="loading">
          Loading ..
        </div>
      );
    } else {
      var newsNode = this.props.data.map(function(item) {
        console.log(item);
        return (
          <li className="news-item">
            <small className="publish-date">{item.publishedDate}</small>
            <h3 className="title">{item.title}</h3>
            <div className="description">{item.contentSnippet}</div>
            <a href="{item.link}">{item.link}</a>
          </li>
        );
      });
      return(
        <ul className="newslist">
          {newsNode}
        </ul>
      );
    }
  }
});

ReactDOM.render(<NewsList rss={url} />, document.getElementById('app'));
