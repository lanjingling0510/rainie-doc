/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * @flow
 */

/**
  * @module cqaso-kit-css
  *
  * @description
  * 包括导出的函数:addCss
  */

import {addPrefix, camelCase,} from 'cqaso-kit-autoprefixer';

const transformTypes = [
  'scale',
  'scaleX',
  'scaleY',
  'scale3d',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'rotate3d',
  'translate',
  'translateX',
  'translateY',
  'translateZ',
  'translate3d',
  'skew',
  'skewX',
  'skewY',
  'matrix',
  'matrix3d',
  'perspective',
];

/**
 * @description 添加css类
 * @category cqaso-kit-css
 *
 * @param  {Object}  element 目标元素
 * @param  {Object}  props   css属性对象
 *
 * @example
 * const {addCss} = require('cqaso-kit-css');
 * addCss(element, {
 *   translate: '100px',
 *   rotate: '90deg'
 * });
 */
export function addCss(element, props) {
  const transforms = [];

  for (let key in props) {
    if (props.hasOwnProperty(key)) {
      const value = props[key];
      if (~ transformTypes.indexOf(key)) {
        transforms.push(`${key}(${value})`);
        delete props[key];
      }
    }
  }

  if (transforms.length) {
    props['transform'] = transforms.join(' ');
  }

  for (let key in props) {
    if (props.hasOwnProperty(key)) {
      const styleName = camelCase(addPrefix(key));
      element.style[styleName] = props[key];
    }
  }
}
