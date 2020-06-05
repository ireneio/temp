// import
import React from 'react';
import { emptyFunction } from 'fbjs';

// definition
const events =
  typeof window === 'undefined'
    ? {
        dispatchEvent: emptyFunction.thatReturnsTrue,
        addEventListener: emptyFunction,
        removeEventListener: emptyFunction,
      }
    : window.events;
const EventsContext = React.createContext<EventTarget>(events);

export const EventsProvider = React.memo(({ children }) => (
  <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
));

export default EventsContext;
