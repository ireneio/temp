// import
import fs from 'fs';
import path from 'path';

import camelCase from 'lodash.camelcase';

import Base from './Base';

// definition
export default class Package extends Base {
  public async prompting(): Promise<void> {
    this.state = await this.prompt([
      {
        type: 'list',
        name: 'workspace',
        message: 'Choose workspace',
        choices: ['meepshop', 'store', 'admin'],
      },
      {
        name: 'name',
        message: 'Package name',
        validate: str => (str.length > 0 ? true : 'Can not empty.'),
      },
      {
        name: 'description',
        message: 'Package description',
        validate: str => (str.length > 0 ? true : 'Can not empty.'),
      },
      {
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        filter: words => words.split(/\s*,\s*/g),
      },
    ]);
  }

  public writing(): void {
    const { workspace, name, description, keywords } = this.state;
    const packageName = `@${workspace}/${name}`;
    const componentName = camelCase(name as string).replace(/^([\w])/, str =>
      str.toUpperCase(),
    );

    this.composeWith(path.resolve(__dirname, './Component'), {
      state: { packageName, componentPath: 'index' },
    });
    this.fs.writeJSON(this.destinationPath('package.json'), {
      private: true,
      name: packageName,
      description,
      license: 'ISC',
      author: 'meepshop <admin@meepshop.com>',
      version: '0.1.0',
      main: './index.js',
      types: './src/index.tsx',
      keywords,
    });
    this.fs.copyTpl(
      this.templatePath('index.js.tmpl'),
      this.destinationPath('index.js'),
    );
    this.fs.copyTpl(
      this.templatePath('testing.tsx.tmpl'),
      this.destinationPath('src/__tests__/index.tsx'),
      { workspace, componentName },
    );

    fs.symlinkSync(
      this.destinationPath(''),
      path.resolve(__dirname, '../../../node_modules', packageName),
    );
  }

  public install(): void {
    const { workspace, name } = this.state;
    const packageFolder = `${workspace}/${name}`;

    this.spawnCommandSync('locales', ['create', packageFolder]);
    this.spawnCommandSync('locales', ['unlink']);
    this.spawnCommandSync('locales', ['link']);
    this.spawnCommandSync('git', [
      'add',
      packageFolder,
      `${path.dirname(
        require.resolve('@meepshop/locales'),
      )}/locales/${packageFolder}`,
    ]);
    this.spawnCommandSync('git', [
      'commit',
      '-m',
      `feat(@${packageFolder}): Add new package`,
    ]);
  }
}
