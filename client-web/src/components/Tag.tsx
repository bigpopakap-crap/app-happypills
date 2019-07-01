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

const DELAY_TOLERANCE_MILLIS = 250;
const OPACITY_ANIMATION_DURATION_MILLIS = 150;

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
  /* For vertically centering the slider */
  position: relative;

  cursor: pointer;

  /* Disable text highlighting because it messes with the mouse drag behavior */
  user-select: none;
`;

const StyledLabel = styled(Pill)`
  min-width: 60px;
`;

interface StyledSliderProps {
  visible: boolean;
  height: number | null;
}

// TODO need to add aria-hidden when this thing is hidden
const StyledSlider = styled(Pill)<StyledSliderProps>`
  /* Use opacity so that the height can be measured before the slider is shown.
     We don't have to worry about it taking up DOM space, because it is position: absolute */
  opacity: ${props => (props.visible ? '1' : '0')};

  position: absolute;
  z-index: 100;
  top: ${props => {
    const height = props.height || 0;
    return `calc(50% - ${height / 2}px)`;
  }};

  width: 100%;

  transition: opacity ${OPACITY_ANIMATION_DURATION_MILLIS}ms ease-in-out;
`;

const StyledSliderOption = styled.li`
  padding: 4px;

  text-align: center;

  border-radius: 4px;

  &:hover,
  &:focus {
    background-color: ${props => darken(0.2, props.color || '')};
  }
`;

/* ******************************************************
                      THE COMPONENT
 ****************************************************** */

export default class Tag extends React.Component<Props, State> {
  private openSliderTimer: number | null;

  public constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      isSliderOpen: false
    };

    this.openSliderTimer = null;

    this.openSlider = this.openSlider.bind(this);
    this.delayOpenSlider = this.delayOpenSlider.bind(this);
    this.clearDelayOpenSlider = this.clearDelayOpenSlider.bind(this);
    this.closeSlider = this.closeSlider.bind(this);
    this.valueUpdated = this.valueUpdated.bind(this);
  }

  private openSlider() {
    this.setState({
      isSliderOpen: true
    });
  }

  private delayOpenSlider() {
    if (!this.state.isSliderOpen) {
      this.clearDelayOpenSlider();

      this.openSliderTimer = setTimeout(() => {
        this.openSlider();
      }, DELAY_TOLERANCE_MILLIS);
    }
  }

  private clearDelayOpenSlider() {
    if (!ObjectUtil.isNullOrUndefined(this.openSliderTimer)) {
      clearTimeout(this.openSliderTimer);
    }
  }

  private closeSlider() {
    // If we were going to open the slider, cancel that action.
    this.clearDelayOpenSlider();

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
        onMouseEnter={this.delayOpenSlider}
        onMouseMove={this.delayOpenSlider}
        onMouseLeave={this.closeSlider}
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
