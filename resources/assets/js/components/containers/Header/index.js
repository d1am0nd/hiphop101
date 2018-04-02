import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {isAuth} from '@/store/selectors/auth';

import Title from './Title';
import Auth from './Auth';
import Profile from './Profile';
import SlickRick from '@/components/icons/SlickRick';

const fullRotation = 1000;

class Header extends Component {
  constructor() {
    super();
    this.clearHoverState = this.clearHoverState.bind(this);
    this.startHover = this.startHover.bind(this);
    this.endHover = this.endHover.bind(this);
    this.state = {
      timeout: null,
      hoverStart: null,
      hovering: false,
    };
  }

  clearHoverState() {
    this.setState({
      hoverStart: null,
      hovering: false,
    });
  }

  startHover() {
    clearTimeout(this.state.timeout);
    this.setState({
      hoverStart: this.state.hovering ?
        this.state.hoverStart : Date.now(),
      hovering: true,
      timeout: null,
    });
  }

  endHover() {
    const rotTime = (Date.now() - this.state.hoverStart) % fullRotation;
    const toGo = fullRotation - rotTime;
    this.setState({
      timeout: setTimeout(
        this.clearHoverState,
        toGo
      ),
    });
  }

  setHover(hover) {
    this.setState({
      hovering: hover,
    });
  }

  componentDidMount() {
    document
      .getElementById('header-main-title')
      .addEventListener('mouseover', this.startHover);
    document
      .getElementById('header-main-title')
      .addEventListener('mouseout', this.endHover);
  }

  componentWillUnmount() {
    document
      .getElementById('header-main-title')
      .removeEventListener('mouseover', this.startHover);
    document
      .getElementById('header-main-title')
      .removeEventListener('mouseout', this.endHover);
  }

  render() {
    const {isAuth} = this.props;
    const {hovering} = this.state;
    return (
      <header className="head">
        <Title>
          <Link id="header-main-title" to="/">
            Hip Hop 101
          </Link>
        </Title>
        <div className="mid">
          <SlickRick
            className={hovering ? 'rotate' : ''}/>
        </div>
        <div className="right">
          {
            isAuth ?
              <Profile/> :
              <Auth/>
          }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuth: isAuth(state),
  };
};

export default connect(mapStateToProps)(Header);
