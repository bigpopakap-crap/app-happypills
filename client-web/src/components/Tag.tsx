import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

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

const StyledContainer = styled.div`
  position: relative; // So that we can position the vertical slider
  min-width: 60px;
`;

const StyledPill = styled.button`
  width: 100%;

  padding: 4px;
  border-radius: 4px;

  background-color: ${props => props.color};
  color: ${props => getContrastedTextColor(props.color || '')}
  border-color: ${props => darken(0.1, props.color || '')};
`;

const StyledSlider = styled(StyledPill)`
  position: absolute;
  bottom: -50%;
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

  private preventDefault(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  public render() {
    const sliderStyle = {
      display: this.state.isSliderOpen ? undefined : 'none'
    };

    return (
      <StyledContainer
        className={this.props.className}
        onMouseEnter={this.openSlider}
        onMouseLeave={this.closeSlider}
        onTouchStart={this.openSlider}
        onTouchEnd={this.closeSlider}
        onFocus={this.openSlider}
        onBlur={this.closeSlider}
      >
        <StyledPill color={this.props.color} onClick={this.preventDefault}>
          <span>{this.props.displayText}</span>
          {this.props.value ? <span>{this.props.value}</span> : null}
        </StyledPill>

        <StyledSlider color={this.props.color} as="div" style={sliderStyle}>
          {this.props.displayText}
          <ol>
            <li>2</li>
            <li>1</li>
            <li>0</li>
            <li>-1</li>
            <li>-2</li>
          </ol>
        </StyledSlider>
      </StyledContainer>
    );
  }
}
