// TODO: remove

import * as React from 'react';

export default class Example extends React.PureComponent<
  { key: string },
  { key: string }
> {
  public state = {
    // eslint-disable-next-line react/destructuring-assignment
    key: this.props.key,
  };

  private method = (key: string) => () => {
    this.setState({ key });
  };

  public render() {
    const { key } = this.state;

    return <div onClick={this.method('test')}>{key}</div>;
  }
}
