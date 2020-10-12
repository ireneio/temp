// import
import path from 'path';

import getOptions from '../getOptions';

// definition
const defaultArgu = ['yarn', 'locales'];

describe('get options', () => {
  test('not find command', async () => {
    await expect(
      getOptions([...defaultArgu, 'not-existing-command']),
    ).rejects.toThrow('can not find the command');
  });

  test.each`
    repoPath
    ${undefined}
    ${'./old-admin'}
  `('command work with repoPath = $repoPath', async ({ repoPath }) => {
    expect(
      await getOptions([
        ...defaultArgu,
        'find-null',
        ...(!repoPath ? [] : ['--repo-path', repoPath]),
      ]),
    ).toEqual({
      command: 'find-null',
      options: {
        repoPath: path.resolve(
          repoPath || path.resolve(__dirname, '../../../locales'),
        ),
      },
    });
  });
});
