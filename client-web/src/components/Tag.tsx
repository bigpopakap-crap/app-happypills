import React from 'react';
import styled from 'styled-components';
import { SizeMe } from 'react-sizeme';
import { darken } from 'polished';

import { isNullOrUndefined } from '../utils/nulls';

import Pill from './Pill';

/* ******************************************************
                        PROPS AND STATE
 ****************************************************** */

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

  /**
   * Handler for when the value updates
   * @param updatedValued the updated value
   */
  valueUpdated: (updatedValued: number) => void;
}

interface State {
  isSliderOpen: boolean;
}

/* ******************************************************
                      STYLED COMPONENTS
 ****************************************************** */

const StyledContainer = styled.div`
  position: relative; // For vertically centering the slider
`;

const StyledLabel = styled(Pill)`
  min-width: 60px;
`;

interface StyledSliderProps {
  visible: boolean;
  height: number | null;
}

const StyledSlider = styled(Pill)<StyledSliderProps>`
  width: 100%;

  position: absolute;
  top: ${props => {
    const height = props.height || 0;
    return `calc(50% - ${height / 2}px)`;
  }};

  // Use visibility so that the height can be measured before the slider is shown
  visibility: ${props => (props.visible ? null : 'hidden')};

  // Disable text highlighting because it messes with the mouse drag behavior
  user-select: none;
`;

const StyledSliderOption = styled.li`
  // Disable text highlighting because it messes with the mouse drag behavior
  user-select: none;

  &:hover,
  &:focus,
  &:active {
    background-color: ${props => darken(0.1, props.color || '')};
  }
`;

/* ******************************************************
                      THE COMPONENT
 ****************************************************** */

export default class Tag extends React.Component<Props, State> {
  public constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      isSliderOpen: false
    };

    this.openSlider = this.openSlider.bind(this);
    this.closeSlider = this.closeSlider.bind(this);
    this.valueUpdated = this.valueUpdated.bind(this);
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

  private valueUpdated(updatedValue: number) {
    this.props.valueUpdated(updatedValue);
    this.closeSlider();
  }

  public render() {
    const listOption = (value: number) => {
      return (
        <StyledSliderOption
          draggable={false}
          color={this.props.color}
          onClick={() => this.valueUpdated(value)}
          onTouchEnd={() => this.valueUpdated(value)}
          onMouseUp={() => this.valueUpdated(value)}
        >
          {value}
        </StyledSliderOption>
      );
    };

    return (
      <StyledContainer
        className={this.props.className}
        draggable={false}
        onMouseDown={this.openSlider}
        onMouseLeave={this.closeSlider}
        onTouchStart={this.openSlider}
        onFocus={this.openSlider}
        onBlur={this.closeSlider}
      >
        <StyledLabel color={this.props.color} draggable={false}>
          {this.props.displayText}
          {isNullOrUndefined(this.props.value) ? null : <span>({this.props.value})</span>}
        </StyledLabel>

        <SizeMe monitorHeight>
          {({ size }) => (
            <StyledSlider
              color={this.props.color}
              visible={this.state.isSliderOpen}
              height={size.height}
              draggable={false}
            >
              <ol draggable={false}>
                {listOption(2)}
                {listOption(1)}
                {listOption(0)}
                {listOption(-1)}
                {listOption(-2)}
              </ol>
            </StyledSlider>
          )}
        </SizeMe>
      </StyledContainer>
    );
  }
}
