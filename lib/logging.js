"use strict";

exports.__esModule = true;
exports.setLogger = setLogger;
exports.log = log;
var logger = null;

function setLogger(instance) {
  logger = instance;
}

function log() {
  if (logger) {
    var _logger;

    (_logger = logger).log.apply(_logger, arguments);
  }
}