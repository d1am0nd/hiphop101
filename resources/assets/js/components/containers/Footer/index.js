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
    const quote = this.currQuote();
    return (
      <footer className="footer">
        <div className="quote">
          {quote.artist} - {` `}
          <a target="_blank" href={quote.url}>
            <i>{quote.quote}</i>
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
