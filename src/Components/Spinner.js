import React, { Component } from 'react'
import loading from './loading.png'

export class Spinner extends Component {
  render() {
    return (
      <div className='load text-center'>
        <img className='my-3' src={loading} alt="loading" style={{width:'40px', margin:'20px 0'}}/>
      </div>
    )
  }
}

export default Spinner
