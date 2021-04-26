// import
import React from 'react';
import { emptyFunction, UserAgent } from 'fbjs';

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

export const globalEvents = UserAgent.isBrowser('IE')
  ? 'window.events = new EventTarget();'
  : `
var Event = function(type, bubbles, cancelable, target) {
  this.initEvent(type, bubbles, cancelable, target);
};

Event.prototype.initEvent = function(type, bubbles, cancelable, target) {
  this.type = type;
  this.bubbles = bubbles;
  this.cancelable = cancelable;
  this.target = target;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault = function() {
  this.defaultPrevented = true;
};

var EventTarget = function() {
  this.listeners = {};
};

EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function(type, callback) {
  if (!(type in this.listeners))
    this.listeners[type] = [];

  this.listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function(type, callback) {
  if (!(type in this.listeners))
    return;

  var stack = this.listeners[type];

  for (var i = 0, l = stack.length; i < l; i++)
    if (stack[i] === callback) {
      stack.splice(i, 1);
      return;
    }
};

EventTarget.prototype.dispatchEvent = function(event) {
  if (!(event.type in this.listeners))
    return true;

  var stack = this.listeners[event.type];

  event.target = this;

  for (var i = 0, l = stack.length; i < l; i++)
    stack[i].call(this, event);

  return !event.defaultPrevented;
};

window.events = new EventTarget();
`;

export const EventsProvider = React.memo(({ children }) => (
  <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
));

export default EventsContext;
