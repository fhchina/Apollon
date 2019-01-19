import React, { SFC } from 'react';
import Element from './../../Element';

class Attribute extends Element {
  constructor(public name: string = ' + attribute : Type') {
    super(name);
    this.bounds = { ...this.bounds, height: 30 };
  }
}

export const AttributeComponent: SFC<Props> = ({ element }) => (
  <g>
    <text x={20} y="50%" dominantBaseline="middle">
      {element.name}
    </text>
  </g>
);

interface Props {
  element: Attribute;
}

export default Attribute;
