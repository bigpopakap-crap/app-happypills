import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { SizeMe } from 'react-sizeme';
import { ObjectUtil } from 'ts-null-or-undefined';

import { FuseHandle, cancelFuse, setFuse, fastForwardFuse } from 'utils/fuse';

const ACCIDENTAL_SELECTION_TIME_MILLIS = 150;
const DELAYED_SLIDER_OPEN_WAIT_TIME_MILLIS = 250;
const SLIDER_OPEN_CLOSE_ANIMATION_DURATION_MILLIS = 150;

/*
 * TODO
 * - add keyboard controls
 * - add aria attributes and accessibility
 * - add mobile/touch controls
 * - add tests
 */

/* ******************************************************
                        PROPS AND STATE
 ****************************************************** */

/**
 * All usages of the select slider should pass in options that
 * conform to at least this shape.
 */
interface SelectSliderOption {
  key: string;
}

/**
 * The props passed in to this select slider component to render
 * the options to be selected.
 *
 * @param T the type of options that are passed in. This helps Typescript
 *          be specific about the data returned in the callbacks.
 */
interface Props<T extends SelectSliderOption> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The array of available options. These are just data objects.
   * When an option is selected, it is passed back to the consumer.
   */
  options: T[];

  /**
   * Callback when an option is selected. It is up to the consumer to choose
   * to update the selected value or not.
   *
   * @param selectedOption {T} the option that was selected
   */
  optionSelected: (selectedOption: T) => void;

  /**
   * The React element or component that will render the trigger (the element
   * that shows up when the slider is collapsed). Note that the selected value
   * is not passed in because the {@link SelectSlider} component does not know about
   * the currently selected value.
   */
  triggerElement: ReactNode;

  /**
   * Generator for the element containing the list of items to render. It is
   * given the children is must render inside itself, and must render them.
   *
   * @param children {ReactNode[]} the given slider must render these children
   */
  sliderElement: (children: ReactNode | Element) => ReactNode;

  /**
   * Generator for each option element. It should return a React element or component
   * to render the option in the UI.
   * @param option {T} the option (one of the objects from {@link options} that is
   *                   to be rendered.
   * @returns {ReactNode} the element that will display the given option.
   */
  optionElement: (option: T) => ReactNode;
}

type SliderState = 'open' | 'closing' | 'closed';

interface State {
  sliderState: SliderState;

  /**
   * The time the slider was most recently opened in epoch milliseconds
   */
  sliderOpenedAt: number | null;
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

interface StyledSliderProps {
  state: SliderState;
  height: number | null;
}

const StyledSlider = styled.div<StyledSliderProps>`
  /* Use visibility because we want to be able to calculate the rendered height
     of the slider before it is shown. */
  visibility: ${props => (props.state === 'closed' ? 'hidden' : null)};
  opacity: ${props => (props.state === 'open' ? 1 : 0)};

  position: absolute;
  z-index: 100;
  top: ${props => {
    const height = props.height || 0;
    return `calc(50% - ${height / 2}px)`;
  }};

  width: 100%;

  transition: opacity ${SLIDER_OPEN_CLOSE_ANIMATION_DURATION_MILLIS}ms ease-in-out;
`;

/* ******************************************************
                      THE COMPONENT
 ****************************************************** */

export default class SelectSlider<T extends SelectSliderOption> extends React.Component<
  Props<T>,
  State
> {
  private delayOpenSliderFuse: FuseHandle | null;
  private animateCloseSliderFuse: FuseHandle | null;

  public constructor(props: Readonly<Props<T>>) {
    super(props);

    this.state = {
      sliderState: 'closed',
      sliderOpenedAt: null
    };

    this.delayOpenSliderFuse = null;
    this.animateCloseSliderFuse = null;

    this.openSlider = this.openSlider.bind(this);
    this.delayOpenSlider = this.delayOpenSlider.bind(this);
    this.closeSlider = this.closeSlider.bind(this);
    this.optionSelected = this.optionSelected.bind(this);
  }

  private openSlider() {
    // If the slider is already open, do nothing
    // If the slider is already closing or closed, don't bother doing anything
    if (this.state.sliderState === 'open') {
      return;
    }

    // If we were in the middle of closing the slider, execute
    // that immediately
    fastForwardFuse(this.animateCloseSliderFuse);

    // If we were going to open the slider, cancel it because
    // we are opening it immediately instead
    cancelFuse(this.delayOpenSliderFuse);

    this.setState({
      sliderState: 'open',
      sliderOpenedAt: new Date().getTime()
    });
  }

  private delayOpenSlider() {
    // If we were in the middle of closing the slider, execute
    // that immediately
    fastForwardFuse(this.animateCloseSliderFuse);

    // If we were going to open the slider, cancel it because
    // we are restarting the timer on that action
    cancelFuse(this.delayOpenSliderFuse);

    this.delayOpenSliderFuse = setFuse(() => {
      this.openSlider();
      this.delayOpenSliderFuse = null;
    }, DELAYED_SLIDER_OPEN_WAIT_TIME_MILLIS);
  }

  private closeSlider() {
    // If we were going to open the slider, cancel it because
    // we are closing it now
    // NOTE: we should do this regardless of whether the slider is currently
    // closed or closing. Otherwise, a brief mouseOver will cause the slider to open
    // because we didn't cancel the delayed open
    cancelFuse(this.delayOpenSliderFuse);

    // If the slider is already closing, don't bother doing anything
    if (this.state.sliderState === 'closing' || this.state.sliderState === 'closed') {
      return;
    }

    // Start the closing animation
    this.setState({
      sliderState: 'closing',
      sliderOpenedAt: null
    });

    // Wait for the closing animation to complete
    this.animateCloseSliderFuse = setFuse(() => {
      // Hide the slider now that the closing animation is complete
      this.setState({
        sliderState: 'closed',
        sliderOpenedAt: null
      });

      this.animateCloseSliderFuse = null;
    }, SLIDER_OPEN_CLOSE_ANIMATION_DURATION_MILLIS);
  }

  private optionSelected(selectedOption: T) {
    // short-circuit if the slider was just opened. We want a small
    // delay period to avoid accidental selections
    const now = new Date().getTime();
    if (
      // The sliderOpenedAt timestamp isn't set. This is weird, but maybe means the slider isn't open?
      ObjectUtil.isNullOrUndefined(this.state.sliderOpenedAt) ||
      // Not enough time has passed to consider this selection intentional
      now - this.state.sliderOpenedAt < ACCIDENTAL_SELECTION_TIME_MILLIS
    ) {
      return;
    }

    this.props.optionSelected(selectedOption);
    this.closeSlider();
  }

  public render() {
    return (
      <StyledContainer
        className={this.props.className}
        draggable={false}
        onMouseLeave={this.closeSlider}
        onMouseDown={this.openSlider}
        onMouseEnter={this.delayOpenSlider}
        onMouseMove={this.delayOpenSlider}
      >
        {this.props.triggerElement}

        <SizeMe monitorHeight>
          {({ size }) => (
            <StyledSlider state={this.state.sliderState} height={size.height}>
              {this.props.sliderElement(
                <ol>
                  {this.props.options.map(option => (
                    <li
                      key={option.key}
                      onClick={() => this.optionSelected(option)}
                      onMouseUp={() => this.optionSelected(option)}
                    >
                      {this.props.optionElement(option)}
                    </li>
                  ))}
                </ol>
              )}
            </StyledSlider>
          )}
        </SizeMe>
      </StyledContainer>
    );
  }
}
