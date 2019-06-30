import React from 'react';
import styled from 'styled-components';
import TextArea from 'react-autosize-textarea';

import Tag from './Tag';

const MIN_ROWS = 3;

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
  &:last-child {
    margin-right: 0;
  }
`;

export default class JournalInpurForm extends React.Component<{}, {}> {
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
          <StyledTag displayText="Relationship" color="#E5DF34" active={false} />
          <StyledTag displayText="Hobbies" color="#B9D345" active={false} value={2} />
          <StyledTag displayText="Weight" color="#825A46" active={false} />
          <StyledTag displayText="Work" color="#A9C9A9" active={false} />
        </StyledFormSection>
      </StyledForm>
    );
  }
}
