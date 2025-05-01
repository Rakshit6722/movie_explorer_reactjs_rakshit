import React, { Component } from 'react'
import Header from '../components/common/Header/Header'
import Index from '../components/home/CategorySection/Index'
import Footer from '../components/common/Footer'


class Home extends Component {


  render() {
    return (
      <div>
        <Index/>
        <Footer/>
      </div>
    )
  }
}

export default Home
