// cms/src/index.ts
export default {
  register() {},

  async bootstrap({ strapi }) {
    const count = await strapi.service("admin::user").count();
    if (count > 0) return;

    const role = await strapi.service("admin::role").getSuperAdmin();
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      strapi.log.warn("[bootstrap] No admin exists and ADMIN_EMAIL/PASSWORD not set.");
      return;
    }

    await strapi.service("admin::user").create({
      email,
      password,
      firstname: process.env.ADMIN_FIRSTNAME || "Admin",
      lastname: process.env.ADMIN_LASTNAME || "User",
      isActive: true,
      roles: [role.id],
    });

    strapi.log.info(`[bootstrap] Admin created: ${email}`);
  },
};
