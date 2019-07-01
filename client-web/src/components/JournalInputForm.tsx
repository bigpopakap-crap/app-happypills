import React from 'react';
import styled from 'styled-components';
import TextArea from 'react-autosize-textarea';

import Tag from './Tag';

import { MoodLevel, NONE } from 'utils/tags';

const MIN_ROWS = 3;

/* ******************************************************
                        PROPS AND STATE
 ****************************************************** */

interface TagAndValue {
  readonly displayText: string;
  readonly color: string;
  value: MoodLevel;
}

interface State {
  tags: TagAndValue[];
}

/* ******************************************************
                      STYLED COMPONENTS
 ****************************************************** */

const StyledForm = styled.form`
  padding: 12px;
`;

const StyledFormSection = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledTextArea = styled(TextArea)`
  width: 100%;
  resize: none;
  border: none;
  background: none;
  padding: 12px;
`;

const StyledTag = styled(Tag)`
  display: inline-block;

  margin-right: 4px;
  margin-bottom: 4px;

  &:last-child {
    margin-right: 0;
  }
`;

export default class JournalInpurForm extends React.Component<{}, State> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      tags: [
        { displayText: 'Relationship', color: '#E5DF34', value: NONE },
        { displayText: 'Hobbies', color: '#B9D345', value: NONE },
        { displayText: 'Weight', color: '#825A46', value: NONE },
        { displayText: 'Work', color: '#A9C9A9', value: NONE }
      ]
    };

    this.updateTagValue = this.updateTagValue.bind(this);
  }

  private updateTagValue(displayText: string, updatedValue: MoodLevel) {
    this.setState(prevState => {
      return {
        // Map all previous tags and their values
        tags: prevState.tags.map(tag => {
          if (tag.displayText === displayText) {
            // This is the tag we want to update.
            // Return a copy of it, with the updated value.
            return Object.assign({}, tag, { value: updatedValue });
          } else {
            // This is not the tag we want to update.
            // Return it as-is.
            return tag;
          }
        })
      };
    });
  }

  public render() {
    return (
      <StyledForm>
        <StyledFormSection>
          <button>Date</button>
          <button>Time</button>
          <button>Location</button>
          <button>Weather</button>
        </StyledFormSection>

        <StyledFormSection>
          <StyledTextArea rows={MIN_ROWS} placeholder="Start typing here..." />
        </StyledFormSection>

        <StyledFormSection>
          {this.state.tags.map(tag => (
            <StyledTag
              key={tag.displayText}
              displayText={tag.displayText}
              color={tag.color}
              value={tag.value}
              active={true}
              valueUpdated={updatedValued => this.updateTagValue(tag.displayText, updatedValued)}
            />
          ))}
        </StyledFormSection>
      </StyledForm>
    );
  }
}
