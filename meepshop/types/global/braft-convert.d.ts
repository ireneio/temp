declare module 'braft-convert' {
  import { EditorState } from 'draft-js';

  export function convertRawToHTML(rawContent: object, options: object): string;
  export function convertRawToEditorState(rawContent: object): EditorState;
}
