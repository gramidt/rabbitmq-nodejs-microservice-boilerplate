const sandbox = require('sandboxed-module');

global.requireSubject = function requireSubject(path, requires, globals, locals) {
  const innerRequires = requires || {};
  const innerGlobals = globals || {};
  const innerLocals = locals || {};

  innerGlobals.Promise = innerGlobals.Promise || Promise;

  return sandbox.require(`../../spec/coverage/instrument/${path}`, {
    requires: innerRequires,
    globals: innerGlobals,
    locals: innerLocals,
  });
};
