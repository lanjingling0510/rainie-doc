import React from 'react';
import Markdown from '../_lib/markdown';
import {feature} from '../../_lib/docs';

class Features extends React.Component {
  render () {
    return (
      <div className="features">
        <Markdown value={feature}/>
      </div>
    );
  }
}

export default Features;
