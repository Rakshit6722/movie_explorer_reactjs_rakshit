import React, { Component } from 'react'
import Index from '../components/home/Index'
import Footer from '../components/common/Footer'


class Home extends Component {

  componentDidMount(): void {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Index />
        <Footer />
      </div>
    )
  }
}

export default Home
