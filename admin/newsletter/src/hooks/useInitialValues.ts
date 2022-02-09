// typescript import
import { EditorState } from 'braft-editor';

// import
import { useMemo } from 'react';

import { createEditorState } from '@admin/text-editor';

// graphql typescript
import { useInitialValuesNewsLetterFragment as useInitialValuesNewsLetterFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export interface ValuesType {
  subject: string | null;
  groupId: string | null;
  template: EditorState;
}

// definition
export default (
  data: useInitialValuesNewsLetterFragmentType | null,
): ValuesType =>
  useMemo(() => {
    if (!data)
      return {
        subject: null,
        groupId: null,
        template: createEditorState(
          '<p style="text-align:center;"><strong><span style="font-size:32px">Hello World</span></strong></p>',
        ),
      };

    return {
      subject: data.subject || null,
      groupId:
        data.toUsers?.filter?.and?.find(filter => filter?.field === 'groupId')
          ?.query || 'all-total-member',
      template: createEditorState(data.template || null),
    };
  }, [data]);
