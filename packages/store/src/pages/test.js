import React from 'react';

class Test extends React.Component {
  // static async getIntialProps() {
  //   return {};
  // }

  componentDidMount() {
    console.log('D');
  }

  render() {
    return (
      <div>
        Hello
        <button
          type="button"
          onClick={async () => {
            const res = await fetch('/test', {
              method: 'post',
              headers: {
                'content-type': 'application/json',
              },
            });

            console.log(res);
            const data = await res.json();
            console.log('data==>', data);
          }}
        >
          fetch
        </button>
      </div>
    );
  }
}

export default Test;
