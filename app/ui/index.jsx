import React from 'react';
import Promo from 'app/ui/promo';
import classnames from 'classnames';
import Features from 'app/ui/features';
import Docs from 'app/ui/docs';
import Doc from 'app/ui/doc';
import {docs} from 'app/_lib/docs';

export default class Ui extends React.Component {
  static propTypes = {
    routeData: React.PropTypes.object
  }

  render() {
    const isCollapsed = this._isCollapsed();
    const className = classnames('ui', {'is-collapsed': isCollapsed});
    const currentDocId = this._currentDocContentId();

    return (
      <div className={className}>
        <div className='ui-promo'>
          <Promo/>
        </div>

        <div className='ui-features'>
          <Features/>
        </div>

        <div className='ui-docs'>
          <Docs showLogo={isCollapsed} currentId={this._currentDocsItemId()}/>
        </div>

        {
          currentDocId ?
          <div className='ui-doc'>
            <Doc docId={this._currentDocContentId()}/>
          </div> : null
        }
      </div>
    );
  }

  _currentDocContentId() {
    return this._currentDocId() || this._firstDocId();
  }

  _currentDocsItemId() {
    const currentDocId = this._currentDocId();

    if (currentDocId) {
      return currentDocId;
    } else if (this._isCollapsed()) {
      return this._firstDocId();
    }
  }

  _currentDocId() {
    const {docId} = this.props.routeData.params;
    return docId
      ? decodeURI(docId)
      : undefined;
  }

  _firstDocId() {
    let arr = [];
    Object.keys(docs).forEach(doc => {
      arr.push(...docs[doc]);
    });

    return arr.length ? arr[0].urlId : null;
  }

  _isCollapsed() {
    return this.props.routeData.route.name !== 'home';
  }
}
