// cms/config/admin.ts
export default ({ env }) => ({
  url: '/admin',
  auth: { secret: env('ADMIN_JWT_SECRET') },

  // remove the old expiresIn warning by using sessions
  auth: {
    sessions: {
      // tighten if you want; these are sane defaults
      maxRefreshTokenLifespan: '30d',
      maxSessionLifespan: '7d',
    },
    secret: env('ADMIN_JWT_SECRET'),
  },

  // make cookies work behind the proxy + cross-site if needed
  cookies: {
    secure: true,       // requires proxy:true + PUBLIC_URL=https://...
    sameSite: 'none',   // works across subdomains/custom domains
  },

  // optional but recommended to silence the transfer salt warning
  transfer: {
    token: { salt: env('TRANSFER_TOKEN_SALT') },
  },
});
