"use strict";

const global = (Function('return this'))();

/*istanbul ignore next*/
module.exports = global.setImmediate || global.setTimeout;