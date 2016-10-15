"use strict";

const global = (Function('return this'))();

module.exports = global.setImmediate || global.setTimeout;