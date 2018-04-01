import React, {Component} from 'react';

import quotes from './quotes';

class Footer extends Component {
  currQuote() {
    return quotes[
      Math.floor(
        Math.random() * quotes.length
      )
    ];
  }

  render() {
    return (
      <footer className="footer">
        <div className="quote">
          {this.currQuote().artist} - {` `}
          <i>{this.currQuote().quote}</i>
        </div>
      </footer>
    );
  }
}

export default Footer;
