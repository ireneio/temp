// import
import path from 'path';

import Generator from 'yeoman-generator';

// definition
export default class Base<
  T extends Generator.GeneratorOptions = Generator.GeneratorOptions
> extends Generator {
  public state: {
    [key: string]: string | string[];
  };

  public constructor(args: string | string[], options: T) {
    super(args, options);
    this.state = options.state;
    this.sourceRoot(path.resolve(__dirname, '../templates'));
  }

  public destinationPath = (filePath: string): string => {
    const { workspace, name } = this.state;

    return super.destinationPath(`${workspace}/${name}/${filePath}`);
  };
}
