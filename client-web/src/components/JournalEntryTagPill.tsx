import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { getContrastedTextColor } from '../utils/colors';

interface Props {
  /**
   * The name of the tag. This is displayed to the user.
   */
  tag: string;

  /**
   * The color to display this pill as.
   */
  color: string;

  /**
   * Whether the pill is actively selected.
   */
  active: boolean;

  /**
   * Scale of 1 to 5. Optional.
   */
  value?: number;
}

interface StyledPillProps {
  color: string;
}

const StyledPill = styled.button`
  padding: 4px;
  border-radius: 4px;

  background-color: ${props => props.color};
  color: ${props => getContrastedTextColor(props.color || '')}
  border-color: ${props => darken(0.1, props.color || '')};
`;

export default class JournalEntryTagPill extends React.Component<Props, {}> {
  public render() {
    return <StyledPill color={this.props.color}>{this.props.tag}</StyledPill>;
  }
}
