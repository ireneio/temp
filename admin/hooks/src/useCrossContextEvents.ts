// typescript import
import { Event } from 'cross-context-events';

// import
import { useEffect, useState, useMemo, useRef } from 'react';
import {
  createEvent,
  createDefaultTransport,
  useGlobalTransport,
} from 'cross-context-events';
import { areEqual } from 'fbjs';

// definition
// TODO: should check if login
export default <P>(
  name: string,
  initialProps: P,
): [P, (props: P) => P | void] => {
  const [props, setProps] = useState<P>(initialProps);
  const propsRef = useRef(initialProps);
  const RefactorEvent = useMemo(() => createEvent<P | 'init'>(name), [name]);

  useEffect((): (() => void) => {
    const callback = (event: Event<P>): void => {
      propsRef.current = event.data;
      setProps(event.data);
    };

    useGlobalTransport(
      createDefaultTransport({
        type: 'window',
        target: window.parent,
      }),
    );
    RefactorEvent.addListener(callback);

    return () => {
      RefactorEvent.removeListener(callback);
    };
  }, [RefactorEvent]);

  useEffect(() => {
    new RefactorEvent('init').emit();
  }, [RefactorEvent]);

  useEffect(() => {
    if (!areEqual(props, propsRef.current)) new RefactorEvent(props).emit();

    propsRef.current = props;
  }, [RefactorEvent, props]);

  return [props, setProps];
};
