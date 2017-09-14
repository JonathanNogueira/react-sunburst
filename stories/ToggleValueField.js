import React, { Component } from 'react';
import Sunburst from '../src/sunburst';

export default class ToggleValueField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueField: 'value'
    }
  }

  render() {
    return (
      <div style={{ width: 300, height: 400 }}>
        <div>
          <Sunburst valueField={this.state.valueField} data={this.props.data}></Sunburst>
        </div>
        <button onClick={() => { this.onClickHandler() }} >Toggle</button>
      </div>
    );
  }

  onClickHandler() {
    let newValueField = this.state.valueField === 'value' ? 'size' : 'value';

    this.setState({
      valueField: newValueField
    });
  }
}; 
