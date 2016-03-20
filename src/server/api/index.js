export default function register(server, options, next) {
  next();
}

register.attributes = {
  name: 'microbrew.api',
  version: '1.0.0'
};
