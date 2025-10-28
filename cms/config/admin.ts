// cms/config/admin.ts
export default ({ env }) => ({
  url: '/admin',

  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      // 30 days
      maxRefreshTokenLifespan: 30 * 24 * 60 * 60 * 1000,
      // 7 days
      maxSessionLifespan: 7 * 24 * 60 * 60 * 1000,
    },
  },

  apiToken: { salt: env('API_TOKEN_SALT') },

  transfer: { token: { salt: env('TRANSFER_TOKEN_SALT') } },
});
