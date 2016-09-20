'use strict';
var url = "http://bondan.senta.nu/portfolio/reactjs/assets/data/data.xml",
    numItem = 20;

var NewsList = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
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
      var newsNode = this.props.data.map(function(item, i) {
        return (
          <li className="news-item" key={i}>
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

var PieChartCalculation = React.createClass({
  getInitialState: function() {
    return {
      // TODO: GET DATA FROM NewsList state value
      // still dummy data
      data: [
        {"label":"17 September 2016","value":"1"},
        {"label":"16 September 2016","value":"10"},
        {"label":"15 September 2016","value":"5"},
        {"label":"13 September 2016","value":"6"},
        {"label":"10 September 2016","value":"1"},
      ]
    };
  },
  componentDidMount: function() {
    d3chart.create({
      width: '300',
      height: '400'
    }, this.state.data);
  },
  countByDate: function() {
    // TODO: count per date
    var self = this;
    var newsNode = this.props.data.map(function(item) {
      var theDate = new Date(item.publishedDate);
      var newFormatDate = Date("d M Y", theDate);
      if (item.filter(x=> x.label === newFormatDate)) {
        self.setState.data.value++;
      } else {
        self.setState.data.label(newFormatDate);
        self.setState.data.value(1);
      }
    });
  },
  render: function() {
    return(
      null
    );
  }
});

var ShowChart = React.createClass({
  render: function() {
    return(
      <PieChartCalculation />
    );
  }
});

ReactDOM.render(<NewsList rss={url} />, document.getElementById('app'));
ReactDOM.render(<ShowChart />, document.getElementById('chart'));
