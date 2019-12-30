// import
import fetch from 'node-fetch';

// definition
export default (): Promise<boolean> =>
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
{
  repository(owner: "meepshop", name: "meep-lerna") {
    pullRequests(first: 1, labels: "locale", states: OPEN) {
      totalCount
    }
  }
}

      `,
    }),
  })
    .then(res => {
      if (res.status < 200 || res.status >= 300)
        throw new Error(res.statusText);

      return res;
    })
    .then(res => res.json())
    .then(({ data, errors }) => {
      if (errors) throw new Error(JSON.stringify(errors));

      return data;
    })
    .then(
      ({
        repository: {
          pullRequests: { totalCount },
        },
      }) => totalCount !== 0,
    );
