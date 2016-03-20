/*eslint no-console: 0*/

import path from 'path';
import schema from '../../config/schema';
import initConfig from 'convict';

const config = initConfig(schema);

// Load configuration overrides from environment file.
const env = config.get('env');
const configDir = config.get('configDir');
const envFilePath = path.join(configDir, `env-${env}.json`);

try {
  config.loadFile(envFilePath);
} catch (e) {
  console.log(`Tried loading configuration for env '${env}' from ${envFilePath}, but file was not found. Using the default configuration.`);
}

if (env === 'development') {
  const localEnvFilePath = path.join(__dirname, '../../.local/env.json');
  try {
    config.loadFile(localEnvFilePath);
  } catch (e) {
    console.log(`Tried loading local env configuration from ${localEnvFilePath}, but file was not found.`);
  }
}

// Validate
// `strict: true` ensures that there are no properties that are not defined in
// the schema.
config.validate({strict: true});

// Export the configuration as an object.
const configObj = config.get();

configObj.$schema = schema;

export default configObj;
