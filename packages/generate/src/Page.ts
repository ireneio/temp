// import
import path from 'path';

import { isURL } from 'validator';

import Base from './Base';

// definition
export default class Page extends Base {
  private server: {
    [key: string]: string;
  };

  public async prompting(): Promise<void> {
    this.state = await this.prompt([
      {
        type: 'list',
        name: 'workspace',
        message: 'Choose workspace',
        choices: ['store', 'admin'],
      },
      {
        name: 'name',
        message: 'Package name',
        validate: str => (str.length > 0 ? true : 'Can not empty.'),
      },
      {
        name: 'pagePath',
        message: 'Page path',
        validate: str =>
          isURL(str, {
            // eslint-disable-next-line @typescript-eslint/camelcase
            require_protocol: false,
            // eslint-disable-next-line @typescript-eslint/camelcase
            require_host: false,
          })
            ? true
            : 'Must be an url.',
      },
    ]);

    const { workspace, pagePath } = this.state;
    const serverPackagePath = path.dirname(
      path.resolve(
        workspace === 'store'
          ? require.resolve('@meepshop/store')
          : require.resolve('@admin/server'),
      ),
    );

    this.server = {
      package: path.resolve(serverPackagePath, './package.json'),
      page: path.resolve(serverPackagePath, './src/pages', `.${pagePath}.ts`),
    };
  }

  public default(): void {
    this.composeWith(path.resolve(__dirname, './Package'), {
      state: this.state,
    });
  }

  public writing(): void {
    const { workspace, name } = this.state;
    const packageName = `@${workspace}/${name}`;
    const serverPackage = this.fs.readJSON(this.server.package) as {
      dependencies: { [key: string]: string };
    };

    this.fs.writeJSON(this.server.package, {
      ...serverPackage,
      dependencies: {
        ...serverPackage.dependencies,
        [packageName]: '^0.1.0',
      },
    });
    this.fs.copyTpl(this.templatePath('page.ts.tmpl'), this.server.page, {
      packageName,
    });
  }

  public install(): void {
    this.spawnCommandSync('git', [
      'add',
      this.server.package,
      this.server.page,
    ]);
  }
}
