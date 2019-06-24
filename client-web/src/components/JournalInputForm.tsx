import React from 'react';
import styled from 'styled-components';
import TextArea from 'react-autosize-textarea';

import JournalEntryTagPill from './JournalEntryTagPill';

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
  width: 100vw;
  border: none;
  background: none;
  padding: 12px;
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
          <JournalEntryTagPill tag="Relationship" color="red" active={false} />
          <JournalEntryTagPill tag="Health" color="green" active={false} />
          <JournalEntryTagPill tag="Snacking" color="blue" active={false} />
          <JournalEntryTagPill tag="Kids" color="yellow" active={false} />
        </StyledFormSection>
      </StyledForm>
    );
  }
}
