import React from 'react';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import Slider from './TagSlider';

import { getContrastedTextColor } from '../utils/colors';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The name of the tag. This is displayed to the user.
   */
  displayText: string;

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

interface State {
  isSliderOpen: boolean;
}

interface StyledPillProps {
  color: string;
}

const StyledPill = styled.button`
position: relative; // So that we can position the vertical slider

  padding: 4px;
  border-radius: 4px;

  background-color: ${props => props.color};
  color: ${props => getContrastedTextColor(props.color || '')}
  border-color: ${props => darken(0.1, props.color || '')};
`;

const StyledSlider = styled(Slider)`
  position: absolute;
  top: 50%;
`;

export default class Tag extends React.Component<Props, State> {
  public constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      isSliderOpen: false
    };

    this.openSlider = this.openSlider.bind(this);
    this.closeSlider = this.closeSlider.bind(this);
  }

  private openSlider() {
    this.setState({
      isSliderOpen: true
    });
  }

  private closeSlider() {
    this.setState({
      isSliderOpen: false
    });
  }

  public render() {
    return (
      <StyledPill className={this.props.className} color={this.props.color} onMouseEnter={this.openSlider} onMouseLeave={this.closeSlider}>
        <span>{this.props.displayText}</span>
        &nbsp;
        {this.props.value ? <span>{this.props.value}</span> : null}
        {this.state.isSliderOpen ? <StyledSlider/> : null}
      </StyledPill>
    );
  }
}
