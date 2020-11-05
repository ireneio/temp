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

  public prompt<T>(questions: Generator.Question<T>[]): Promise<T> {
    return super
      .prompt(
        questions.map((question: Generator.Question<T>) => ({
          ...question,
          when: !this.state?.[question.name as string],
        })),
      )
      .then(result => ({
        ...this.state,
        ...result,
      }));
  }

  public destinationPath = (filePath: string): string => {
    const { workspace, name } = this.state;

    return super.destinationPath(`${workspace}/${name}/${filePath}`);
  };
}
