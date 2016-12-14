import React from 'react'
import classnames from 'classnames'
import Code from 'app/ui/_lib/code'

export default class JSDocUsage extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  }

  state = {
    source: 'commonjs'
  }

  componentWillMount () {
    const source = window.localStorage.getItem('usageSource')

    if (source) {
      this.setState({source})
    } else {
      window.localStorage.setItem('usageSource', 'commonjs')
    }
  }

  render () {
    return <section>
      <h2 id='usage'>
        Usage
        <a href='#usage' className='doc-header_link'>#</a>
      </h2>

      <ul className='jsdoc_usage-options'>
        <li className='jsdoc_usage-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'commonjs')}
            className={classnames('jsdoc_usage-option_link', {
              'is-current': this.state.source === 'commonjs'
            })}
          >
            CommonJS
          </a>
        </li>

        <li className='jsdoc_usage-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'umd')}
            className={classnames('jsdoc_usage-option_link', {
              'is-current': this.state.source === 'umd'
            })}
          >
            UMD
          </a>
        </li>

        <li className='jsdoc_usage-option'>
          <a
            href='#'
            onClick={this._changeSource.bind(this, 'es2015')}
            className={classnames('jsdoc_usage-option_link', {
              'is-current': this.state.source === 'es2015'
            })}
          >
            ES 2015
          </a>
        </li>
      </ul>

      {this._renderUsage()}
    </section>
  }

  _renderUsage () {
    const {name} = this.props

    switch (this.state.source) {
      case 'commonjs':
        return <Code
          value={`var ${name} = require('date-fns/${this._convertToUnderscore(name)}')`}
          options={{
            readOnly: true,
            mode: 'javascript'
          }}
        />

      case 'umd':
        return <Code
          value={`var ${name} = dateFns.${name}`}
          options={{
            readOnly: true,
            mode: 'javascript'
          }}
        />

      case 'es2015':
        return <Code
          value={`import ${name} from 'date-fns/${this._convertToUnderscore(name)}'`}
          options={{
            readOnly: true,
            mode: 'javascript'
          }}
        />
    }
  }

  _changeSource (source, e) {
    e.preventDefault()
    this.setState({source})
    window.localStorage.setItem('usageSource', source)
  }

  _convertToUnderscore (string) {
    return string.replace(/ISO|[A-Z]/g, (letter) => '_' + letter.toLowerCase())
  }
}
