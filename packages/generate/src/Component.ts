// import
import path from 'path';

import Base from './Base';

// definition
export default class Component extends Base {
  public async prompting(): Promise<void> {
    const { packageName, componentPath } = await this.prompt([
      {
        name: 'packageName',
        message: 'Package name',
        validate: str => (/^@/.test(str) ? true : 'Should be @workspace/name.'),
      },
      {
        name: 'componentPath',
        message: 'Component path',
        filter: words => words.replace(/\.tsx?$/, ''),
        validate: str => (str.length > 0 ? true : 'Can not empty.'),
      },
    ]);
    const [workspace, name] = packageName.replace('@', '').split(/\//);

    this.state = {
      name,
      workspace,
      componentPath,
    };
  }

  public writing(): void {
    const { componentPath } = this.state as { componentPath: string };
    const fileName = path
      .basename(componentPath)
      .replace(/^(\w)/, str => str.toLowerCase());

    this.fs.copyTpl(
      this.templatePath('component/index.tsx.tmpl'),
      this.destinationPath(`src/${componentPath}.tsx`),
    );
    this.fs.copyTpl(
      this.templatePath('component/index.less.tmpl'),
      this.destinationPath(
        `src/${path.join(componentPath, '../styles')}/${fileName}.less`,
      ),
    );
    this.fs.copyTpl(
      this.templatePath('component/gql.ts.tmpl'),
      this.destinationPath(
        `src/${path.join(componentPath, '../gqls')}/${fileName}.ts`,
      ),
    );
  }
}
