import React from 'react';
import styled from 'styled-components';
import TextArea from 'react-autosize-textarea';

import JournalEntryTagPill from './Tag';

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

const StyledJournalEntryTagPill = styled(JournalEntryTagPill)`
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
          <StyledJournalEntryTagPill displayText="Relationship" color="red" active={false} />
          <StyledJournalEntryTagPill displayText="Health" color="green" active={false} value={2} />
          <StyledJournalEntryTagPill displayText="Snacking" color="blue" active={false} />
          <StyledJournalEntryTagPill displayText="Kids" color="yellow" active={false} />
        </StyledFormSection>
      </StyledForm>
    );
  }
}
