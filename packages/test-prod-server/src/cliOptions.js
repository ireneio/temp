import commander from 'commander';
import chalk from 'chalk';

import { version } from '../package.json';

const program = new commander.Command(chalk`{cyan test-prod-server}`)
  .version(version, '-v, --version')
  .arguments('<domain> [options]')
  .usage(chalk`{green <domain>} {gray [optoins]}`)
  .description(
    chalk`Run prod server with giving the domain.
  {green Default: bellatest.stage.meepcloud.com}`,
  )
  .option(
    '-t --types [type]',
    'The types of prod servers. It can be "store".',
    val => val.match(/(store)/gi),
  )
  .option('-p --paths [paths]', 'Test those paths working.', value =>
    value.split(',').map(text => text.replace(/ |\t/g, '')),
  )
  .option(
    '--member-paths [paths]',
    'Test those paths which can only be used by members working.',
    value => value.split(',').map(text => text.replace(/ |\t/g, '')),
  )
  .option('--email <email>', 'Use to login.')
  .option('--password <password>', 'Use to login.');

const {
  args: [domain = 'bellatest.stage.meepcloud.com'],
  types = ['store'],
  paths = [],
  memberPaths = [],
  email,
  password,
} = program.parse(process.argv);

process.env.TEST_DOMAIN = domain;

if (!/stage/.test(domain)) process.env.TEST_API = 'api.meepshop.tw';

if (memberPaths.length !== 0 && (!email || !password)) {
  program.outputHelp(
    text => chalk`
  {red Options Error: should give \`--email\` and \`--password\` when using \`--member-paths\`.}
{gray ${text}}`,
  );

  process.exit(1);
}

export default {
  domain,
  types,
  paths,
  memberPaths,
  email,
  password,
};
