import React from 'react';
import {Text} from 'react-native';

// Bypass TypeScript restriction
const TextRender = Text as any;

const oldRender = TextRender.render;

TextRender.render = function (...args: any[]) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [{fontFamily: 'SF Pro Display'}, origin.props.style],
  });
};
