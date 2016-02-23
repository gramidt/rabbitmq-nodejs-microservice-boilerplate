const Sandbox = require('sandboxed-module');

global.sandboxRequire = function sandboxRequire(path, requires, globals, locals) {
  const innerRequires = requires || {};
  const innerGlobals = globals || {};
  const innerLocals = locals || {};

  innerGlobals.Promise = innerGlobals.Promise || Promise;

  return Sandbox.require(
    (process.env.APP_DIR_FOR_CODE_COVERAGE || '../../app/') + path, {
      requires: innerRequires,
      globals: innerGlobals,
      locals: innerLocals,
    });
};
