import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import Pill from './Pill';
import SelectSlider from './SelectSlider';

import {
  MoodLevel,
  STRONG_POSITIVE,
  POSITIVE,
  NEUTRAL,
  NEGATIVE,
  STRONG_NEGATIVE
} from 'utils/tags';

/*
 * TODO
 * - add theme variables to CSS (border-radius, etc.)
 * - add animation when emoji is selected
 */

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

/* ******************************************************
                      HELPER COMPONENTS
 ****************************************************** */

interface SelectSliderMoodLevelOption {
  key: string;
  moodLevel: MoodLevel;
}

const SELECT_SLIDER_MOOD_LEVEL_OPTIONS = [
  STRONG_POSITIVE,
  POSITIVE,
  NEUTRAL,
  NEGATIVE,
  STRONG_NEGATIVE
].map(moodLevel => ({ key: `${moodLevel.value}`, moodLevel }));

class MoodLevelSelectSlider extends SelectSlider<SelectSliderMoodLevelOption> {}

/* ******************************************************
                      STYLED COMPONENTS
 ****************************************************** */

const StyledSelectSliderTrigger = styled(Pill)`
  min-width: 60px;
`;

interface StyledSelectSliderOptionProps {
  color: string;
}

const StyledSelectSliderOption = styled.div<StyledSelectSliderOptionProps>`
  padding: 4px;

  text-align: center;
  font-size: 24px;

  border-radius: 4px;

  &:hover {
    background-color: ${props => darken(0.2, props.color)};
  }
`;

/* ******************************************************
                      THE COMPONENT
 ****************************************************** */

export default class Tag extends React.Component<Props, {}> {
  public constructor(props: Props) {
    super(props);

    this.optionsSelected = this.optionsSelected.bind(this);
  }

  private optionsSelected(selectedOption: SelectSliderMoodLevelOption) {
    this.props.valueUpdated(selectedOption.moodLevel);
  }

  public render() {
    const triggerElement = (
      <StyledSelectSliderTrigger color={this.props.color}>
        {this.props.displayText} {this.props.value.emoji}
      </StyledSelectSliderTrigger>
    );

    const sliderElement = (children: ReactNode | Element) => (
      <Pill color={this.props.color}>{children}</Pill>
    );

    const optionElement = (option: SelectSliderMoodLevelOption) => (
      <StyledSelectSliderOption color={this.props.color}>
        {option.moodLevel.emoji}
      </StyledSelectSliderOption>
    );

    return (
      <MoodLevelSelectSlider
        className={this.props.className}
        options={SELECT_SLIDER_MOOD_LEVEL_OPTIONS}
        optionSelected={this.optionsSelected}
        triggerElement={triggerElement}
        sliderElement={sliderElement}
        optionElement={optionElement}
      />
    );
  }
}
