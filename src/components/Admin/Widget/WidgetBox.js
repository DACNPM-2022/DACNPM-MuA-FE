import React from 'react';
import { WidgetBox } from './Widget.style';
/* eslint-disable react/prop-types */
export default function WidgerBox({ children, style, height, padding }) {
  return (
    <WidgetBox
      className="isoWidgetBox"
      height={height}
      padding={padding}
      style={style}
    >
      {children}
    </WidgetBox>
  );
}
