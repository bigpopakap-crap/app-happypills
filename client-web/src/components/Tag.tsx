import React from 'react';
import styled from 'styled-components';

import Pill from './Pill';

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

const StyledPill = styled(Pill)``;

const StyledLabel = styled.span`
  min-width: 60px;
`;

const StyledSlider = styled.ol`
  min-width: 60px;
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
    const sliderStyle = {
      display: this.state.isSliderOpen ? undefined : 'none'
    };

    return (
      <StyledPill className={this.props.className} color={this.props.color}>
        <StyledLabel
          onMouseEnter={this.openSlider}
          onMouseLeave={this.closeSlider}
          onTouchStart={this.openSlider}
          onTouchEnd={this.closeSlider}
          onFocus={this.openSlider}
          onBlur={this.closeSlider}
        >
          {this.props.displayText}
          {this.props.value ? <span>({this.props.value})</span> : null}
        </StyledLabel>

        <StyledSlider
          style={sliderStyle}
          onMouseEnter={this.openSlider}
          onMouseLeave={this.closeSlider}
          onTouchStart={this.openSlider}
          onTouchEnd={this.closeSlider}
          onFocus={this.openSlider}
          onBlur={this.closeSlider}
        >
          <li>2</li>
          <li>1</li>
          <li>0</li>
          <li>-1</li>
          <li>-2</li>
        </StyledSlider>
      </StyledPill>
    );
  }
}
