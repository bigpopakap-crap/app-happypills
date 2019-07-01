import React from 'react';
import ReactDOM from 'react-dom';
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
  sliderHeight: number;
}

const StyledContainer = styled.div`
  position: relative; // For vertically centering the slider
`;

const StyledLabel = styled(Pill)`
  min-width: 60px;
`;

interface StyledSliderProps {
  visible: boolean;
  height: number;
}

const StyledSlider = styled(Pill)<StyledSliderProps>`
  width: 100%;
  position: absolute;
  top: ${props => `-${props.height / 2}px`};
  display: ${props => (props.visible ? null : 'none')};
`;

export default class Tag extends React.Component<Props, State> {
  public constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      isSliderOpen: false,
      sliderHeight: 0
    };

    this.openSlider = this.openSlider.bind(this);
    this.closeSlider = this.closeSlider.bind(this);
  }

  public componentDidMount(): void {
    // Measure the slider height once. No need to track changes,
    // because its content is static
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
      <StyledContainer
        className={this.props.className}
        onMouseEnter={this.openSlider}
        onMouseLeave={this.closeSlider}
        onTouchStart={this.openSlider}
        onTouchEnd={this.closeSlider}
        onFocus={this.openSlider}
        onBlur={this.closeSlider}
      >
        <StyledLabel color={this.props.color}>
          {this.props.displayText}
          {this.props.value ? <span>({this.props.value})</span> : null}
        </StyledLabel>

        <StyledSlider
          color={this.props.color}
          visible={this.state.isSliderOpen}
          height={this.state.sliderHeight}
        >
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
