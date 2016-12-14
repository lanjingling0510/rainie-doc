import React from 'react';
import classnames from 'classnames';
import Code from 'app/ui/_lib/code';
// import version from 'app/_lib/version';
import {usage} from '../../_lib/docs';

export default class GettingStarted extends React.Component {
  state = {
    source: usage.npm ? 'npm' : ''
  }

  render () {
    return (
      <div className='getting_started'>
        <ul className='getting_started-options'>
          {
            usage.npm ?
            <li className='getting_started-option'>
              <a
                href='#'
                onClick={this._changeSource.bind(this, 'npm')}
                className={classnames('getting_started-option_link', {
                  'is-current': this.state.source === 'npm'
                })}
                >
                npm
              </a>
            </li> : null
          }

          {
            usage.bower ?
            <li className='getting_started-option'>
              <a
                href='#'
                onClick={this._changeSource.bind(this, 'bower')}
                className={classnames('getting_started-option_link', {
                  'is-current': this.state.source === 'bower'
                })}
                >
                Bower
              </a>
            </li> : null
          }

          {
            usage.cdn ?
            <li className='getting_started-option'>
              <a
                href='#'
                onClick={this._changeSource.bind(this, 'cdn')}
                className={classnames('getting_started-option_link', {
                  'is-current': this.state.source === 'cdn'
                })}
                >
                cdn
              </a>
            </li> : null
          }
        </ul>

        {this._renderInstruction()}
      </div>
    );
  }

  _renderInstruction () {
    switch (this.state.source) {
      case 'npm':
        return <div className='getting_started-instruction' key='npm'>
          <h4 className='getting_started-instruction_header'>
            Installation
          </h4>
          <Code value={usage.npm.install} options={{theme: 'wormhole', readOnly: true}} />

          <h4 className='getting_started-instruction_header'>
            Example
          </h4>
          <div id='qa-npm'>
            <Code value={usage.npm.example} options={{theme: 'wormhole', readOnly: true}} />
          </div>
        </div>

      case 'bower':
        return <div className='getting_started-instruction' key='bower'>
          <h4 className='getting_started-instruction_header'>
            Installation
          </h4>
          <Code value={usage.bower.install} options={{theme: 'wormhole', readOnly: true}} />

          <h4 className='getting_started-instruction_header'>
            Example
          </h4>
          <div id='qa-bower'>
            <Code value={usage.bower.example} options={{theme: 'wormhole', readOnly: true}} />
          </div>
        </div>

      case 'cdn':
        return <div className='getting_started-instruction' key='cdn'>
          <h4 className='getting_started-instruction_header'>
            Installation
          </h4>
          <Code value={usage.cdn.install} options={{theme: 'wormhole', readOnly: true}} />

          <h4 className='getting_started-instruction_header'>
            Example
          </h4>
          <div id='qa-cdn'>
            <Code value={usage.cdn.example} options={{theme: 'wormhole', readOnly: true}} />
          </div>

          <a
            href={usage.cdn.download}
            className='getting_started-download'
            target='_blank'
          >
            Download Library
          </a>
        </div>
    }
  }

  _changeSource (source, e) {
    e.preventDefault();
    this.setState({source});
  }
}
