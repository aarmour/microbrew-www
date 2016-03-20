import config from '../config';
import monitoring from 'good';
import consoleReporter from 'good-console';

const options = {
  opsInterval: config.monitoring.opsInterval,
  reporters: [
    {
      reporter: consoleReporter,
      events: { log: '*', response: '*' }
    }
  ]
};

export default {
  register: monitoring,
  options
};
