import React from 'react';
import './Gif.css';
import axios from 'axios'
function StickerImg(props) {
  return (
    <img className="sticker" style={props.style} src={props.src} alt="wow"/>
  );
}

class Gif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickers: [],
    }
    this.makeCall = this.makeCall.bind(this);
  }

  makeCall() {
    axios.get('https://api.gfycat.com/v1/stickers/search?search_text=' + this.props.searchTerm).then((response) => {
      if (!response.data || !response.data.gfycats || response.data.gfycats.length < 1) return;
      let newSticks = this.state.stickers;
      let styles = {
        left: (Math.floor(Math.random() * (95 + 9)) - 10) + '%',
        top: (Math.floor(Math.random() * (95 + 9)) - 10) + '%'
      }
      newSticks.push({
        url: response.data.gfycats[0].gif100px,
        style: styles
      });
      this.setState({stickers: newSticks});
    })
  }

  componentDidMount() {
    this.makeCall();
  }
  componentDidUpdate(prevProps) {
    if (this.props.searchTerm === prevProps.searchTerm) return;
    this.makeCall();
  }

  render () {
    var stickerImgs = [];
    for (let i = 0; i < this.state.stickers.length; i++) {
      stickerImgs.push(<StickerImg key={this.state.stickers[i].url} style={this.state.stickers[i].style} src={this.state.stickers[i].url} />);
    }
    return (
      <div className="gif-box">
        {stickerImgs}
      </div>
    )
  }
}

export default Gif;
