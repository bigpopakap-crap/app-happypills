import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { getContrastedTextColor } from '../utils/colors';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The background color to use. The border will be
   * darker, and the text inside will be black or white
   * depending on the darkness of the background color.
   */
  color: string;
}

const StyledPill = styled.div.attrs(props => ({
  color: props.color
}))`
  padding: 4px;
  border-radius: 4px;
  border-width: 1px;

  background-color: ${props => props.color};
  color: ${props => getContrastedTextColor(props.color || '')}
  border-color: ${props => darken(0.1, props.color || '')};
`;

export default class Pill extends React.Component<Props, {}> {
  public render() {
    return (
      <StyledPill className={this.props.className} color={this.props.color}>
        {this.props.children}
      </StyledPill>
    );
  }
}
