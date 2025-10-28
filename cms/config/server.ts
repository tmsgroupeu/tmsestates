// cms/config/server.ts
export default ({ env }) => ({
  url: env('PUBLIC_URL', 'https://tmsestates.onrender.com'),
  proxy: true, // IMPORTANT: trust X-Forwarded-* from Render so ctx.secure === true
  host: '0.0.0.0',
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
