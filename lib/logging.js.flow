
export type Logger = {
  log?: (...messages: any[]) => void;
}

let logger: Logger = null

export function setLogger(instance: Logger) {
  logger = instance
}

export function log(...message: any) {
  if (logger) {
    logger.log(...message)
  }
}