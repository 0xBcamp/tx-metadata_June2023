import * as React from 'react';
import Navbar from './Navbar';
import Txm from './Txm';

export default class App extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Navbar />
        <Txm />
      </>
    )
  }
}
