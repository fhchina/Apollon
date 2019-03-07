import React, { Component, ComponentClass } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import ElementComponent, { OwnProps } from './ElementComponent';
import { withPopup, PopupContext } from '../Popup';
import Element from '../../domain/Element';
import Relationship from '../../domain/Relationship';
import { Point } from '../../domain/geo';

const editable = (WrappedComponent: typeof ElementComponent) => {
  class Editable extends Component<Props, State> {
    state: State = {
      element: this.props.element,
    };

    private edit = (event: MouseEvent) => {
      event.stopPropagation();
      let position = { x: 0, y: 0 };
      if (this.props.element instanceof Relationship) {
        const path = (this.props as any)['path'] as Point[];
        const targetPoint = path[path.length - 2];
        position = {
          x: targetPoint.x,
          y: targetPoint.y - 20,
        };
      } else {
        const { x, y, width, height } = this.props.element.bounds;
        position = { x: x + width, y };
      }
      console.log(position, this.props.element);
      this.props.showPopup(this.state.element, position);
    };

    componentDidMount() {
      const node = (findDOMNode(this) as HTMLElement)
        .firstElementChild as HTMLElement;
      node.addEventListener('dblclick', this.edit);
    }

    componentWillUnmount() {
      const node = (findDOMNode(this) as HTMLElement)
        .firstElementChild as HTMLElement;
      node.removeEventListener('dblclick', this.edit);
    }

    componentDidUpdate(prevProps: Props) {
      if (prevProps.element !== this.props.element) {
        this.setState({ element: this.props.element }, () =>
          this.props.update(this.state.element)
        );
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  type Props = OwnProps & PopupContext;

  interface State {
    element: Element;
  }

  return compose<ComponentClass<OwnProps>>(withPopup)(Editable);
};

export default editable;
