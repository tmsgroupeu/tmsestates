// ./src/index.ts
import type { Core } from '@strapi/strapi';

export default {
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const email = process.env.ADMIN_RESET_EMAIL;
    const password = process.env.ADMIN_RESET_PASSWORD;

    if (!email || !password) return;

    const roles = await strapi.db.query('admin::role').findMany({ where: { code: 'strapi-super-admin' } });
    const superAdmin = roles?.[0];

    const hasher = strapi.service('admin::auth'); // v5 service
    const hashed = await hasher.hashPassword(password);

    const userQuery = strapi.db.query('admin::user');
    const existing = await userQuery.findOne({ where: { email } });

    if (existing) {
      await userQuery.update({ where: { id: existing.id }, data: { password: hashed } });
      strapi.log.info(`[bootstrap] Reset admin password for ${email}`);
    } else {
      await userQuery.create({
        data: {
          email,
          username: email,
          firstname: 'Admin',
          lastname: 'User',
          isActive: true,
          password: hashed,
          roles: [superAdmin?.id].filter(Boolean),
        },
      });
      strapi.log.info(`[bootstrap] Created admin ${email}`);
    }
  },
};
