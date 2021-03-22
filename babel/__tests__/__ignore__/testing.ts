// definition
export default [
  [
    `import React from 'react';

export const SubComponent = React.memo(() => {});

export default React.memo(() => {})`,
    `"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SubComponent = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SubComponent = /*#__PURE__*/_react["default"].memo(function FrontEndBabelAddDisplayNameSubComponent() {});

exports.SubComponent = SubComponent;
SubComponent.displayName = "FrontEndBabelAddDisplayNameSubComponent";

var main = /*#__PURE__*/_react["default"].memo(function FrontEndBabelAddDisplayName() {});

main.displayName = "FrontEndBabelAddDisplayName"
var _default = /*#__PURE__*/main;
exports["default"] = _default;`,
  ],
  [
    `import React from 'react';

export const Context = React.createContext({})

export default React.createContext({})`,
    `"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Context = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Context = /*#__PURE__*/_react["default"].createContext({});

exports.Context = Context;
Context.displayName = "FrontEndBabelAddDisplayNameContext";

var main = /*#__PURE__*/_react["default"].createContext({});

main.displayName = "FrontEndBabelAddDisplayName"
var _default = /*#__PURE__*/main;
exports["default"] = _default;`,
  ],
];
