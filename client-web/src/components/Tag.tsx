import React from 'react';
import styled from 'styled-components';
import { SizeMe } from 'react-sizeme';
import { darken } from 'polished';
import { ObjectUtil } from 'ts-null-or-undefined';

import Pill from './Pill';

import {
  MoodLevel,
  STRONG_POSITIVE,
  POSITIVE,
  NEUTRAL,
  NEGATIVE,
  STRONG_NEGATIVE
} from 'utils/tags';

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
  value: MoodLevel;

  /**
   * Handler for when the value updates
   * @param updatedValued the updated value
   */
  valueUpdated: (updatedValued: MoodLevel) => void;
}

interface State {
  isSliderOpen: boolean;
}

/* ******************************************************
                      STYLED COMPONENTS
 ****************************************************** */

const StyledContainer = styled.div`
  position: relative; // For vertically centering the slider

  cursor: pointer;

  // Disable text highlighting because it messes with the mouse drag behavior
  user-select: none;
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
  z-index: 100;
  top: ${props => {
    const height = props.height || 0;
    return `calc(50% - ${height / 2}px)`;
  }};

  // Use visibility so that the height can be measured before the slider is shown
  visibility: ${props => (props.visible ? null : 'hidden')};
`;

const StyledSliderOption = styled.li`
  padding: 4px;
  text-align: center;

  border-radius: 4px;

  &:hover,
  &:focus,
  &:active {
    background-color: ${props => darken(0.2, props.color || '')};
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

  private valueUpdated(updatedValue: MoodLevel) {
    this.props.valueUpdated(updatedValue);
    this.closeSlider();
  }

  public render() {
    const listOption = (moodLevel: MoodLevel) => {
      return (
        <StyledSliderOption
          color={this.props.color}
          onClick={() => this.valueUpdated(moodLevel)}
          onTouchEnd={() => this.valueUpdated(moodLevel)}
          onMouseUp={() => this.valueUpdated(moodLevel)}
        >
          {moodLevel.emoji}
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
        <StyledLabel color={this.props.color}>
          {this.props.displayText}
          {ObjectUtil.isNullOrUndefined(this.props.value) ? null : this.props.value.emoji}
        </StyledLabel>

        <SizeMe monitorHeight>
          {({ size }) => (
            <StyledSlider
              color={this.props.color}
              visible={this.state.isSliderOpen}
              height={size.height}
            >
              <ol>
                {listOption(STRONG_POSITIVE)}
                {listOption(POSITIVE)}
                {listOption(NEUTRAL)}
                {listOption(NEGATIVE)}
                {listOption(STRONG_NEGATIVE)}
              </ol>
            </StyledSlider>
          )}
        </SizeMe>
      </StyledContainer>
    );
  }
}
