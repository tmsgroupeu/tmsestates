// cms/config/admin.ts
export default ({ env }) => ({
  url: '/admin',

  // SINGLE auth block (fixes TS1117) + sessions (replaces deprecated expiresIn)
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      maxRefreshTokenLifespan: '30d',
      maxSessionLifespan: '7d',
    },
  },

  // API tokens for programmatic access
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },

  // Silences “Missing transfer.token.salt” warning, enables content transfer
  transfer: {
    token: { salt: env('TRANSFER_TOKEN_SALT') },
  },
});
