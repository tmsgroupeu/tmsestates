export default {
  register() {},
  async bootstrap({ strapi }) {
    try {
      const adminService = strapi.service("admin::user");
      const count = await adminService.count();

      if (count > 0) {
        strapi.log.info("[bootstrap] Admin already exists. Skipping creation.");
        return;
      }

      const email = process.env.ADMIN_EMAIL;
      const password = process.env.ADMIN_PASSWORD;
      if (!email || !password) {
        strapi.log.warn("[bootstrap] No admin exists and ADMIN_EMAIL/PASSWORD missing.");
        return;
      }

      const role = await strapi.service("admin::role").getSuperAdmin();
      await adminService.create({
        email,
        password,
        firstname: process.env.ADMIN_FIRSTNAME || "Admin",
        lastname: process.env.ADMIN_LASTNAME || "User",
        isActive: true,
        roles: [role.id],
      });

      strapi.log.info(`[bootstrap] Admin created: ${email}`);
    } catch (e: any) {
      strapi.log.error(`[bootstrap] Failed: ${e?.message || e}`);
    }
  },
};
