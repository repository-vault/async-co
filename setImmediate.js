"use strict";

const _global = (Function('return this'))();

/*istanbul ignore next*/
module.exports = _global.setImmediate || _global.setTimeout;
