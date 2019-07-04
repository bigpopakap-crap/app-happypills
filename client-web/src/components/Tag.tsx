import React from 'react';
import styled from 'styled-components';

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

const StyledLabel = styled(Pill)`
  min-width: 60px;
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
      <StyledLabel color={this.props.color}>
        {this.props.displayText} {this.props.value.emoji}
      </StyledLabel>
    );

    const optionElement = (option: SelectSliderMoodLevelOption) => (
      <span>{option.moodLevel.emoji}</span>
    );

    return (
      <MoodLevelSelectSlider
        className={this.props.className}
        options={SELECT_SLIDER_MOOD_LEVEL_OPTIONS}
        optionSelected={this.optionsSelected}
        triggerElement={triggerElement}
        optionElement={optionElement}
      />
    );
  }
}
