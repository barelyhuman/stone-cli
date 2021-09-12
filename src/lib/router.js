const events = require("events");

export const REQUEST = Symbol("request");

export function createRouter() {
  const emitter = new events.EventEmitter();
  const ctx = this || {};
  return {
    listener: emitter,
    set(req, res) {
      ctx.req = req;
      ctx.res = res;
      emitter.emit(REQUEST);
      return;
    },
    get(path, cb) {
      if (matcher("get", path, ctx.req)) {
        return cb(ctx.req, ctx.res);
      }
    },
    post(path, cb) {
      if (matcher("post", path, ctx.req)) {
        return cb(ctx.req, ctx.res);
      }
    },
  };
}

function matcher(method, path, req, res) {
  if (req.method.toLowerCase() !== method.toLowerCase() || req.url !== path) {
    return false;
  }
  return true;
}
