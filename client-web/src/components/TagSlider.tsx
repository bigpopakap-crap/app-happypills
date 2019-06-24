import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default class TagSlider extends React.Component<Props, {}> {
  public render() {
    return (
      <div className={this.props.className}>1 2 3 4 5</div>
    );
  }
}
