import React from 'react';
import GettingStarted from 'app/ui/getting_started';
import logoPath from './img/logo.png';
import gitHubLogoPath from './img/github_logo.svg';
import docsObj from '../../_lib/docs';

export default class Promo extends React.Component {
  render () {
    return (
      <div className='promo'>
       <div className='promo-inner'>
         <div className='promo-logo'>
           <img
             src={docsObj.logo_icon ? docsObj.logo_icon : logoPath }
             className='promo-logo_image' />
           <div className='promo-logo_name'>{docsObj.name}</div>
         </div>

         <h1 className='promo-header'>
           {docsObj.title}
         </h1>

         <div className='promo-text'>
           {docsObj.description}
         </div>

         <div className='promo-getting_started'>
           <GettingStarted />
         </div>

         <div className='promo-links'>
           <a
             href={docsObj.github_url}
             className='promo-github_logo'>
             <img src={gitHubLogoPath} className='promo-github_logo_image' />
           </a>
         </div>
       </div>
     </div>
   );
  }
}
