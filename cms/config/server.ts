// cms/config/server.ts
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  // public HTTPS URL so Strapi generates correct links
  url: env('PUBLIC_URL'), // e.g. https://tmsestates.onrender.com

  // trust Render’s proxy so req.secure is true and cookies can be “secure”
  proxy: true,

  app: { keys: env.array('APP_KEYS') },
});
