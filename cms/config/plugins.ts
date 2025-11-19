// Path: ./config/plugins.ts

export default ({ env }) => ({
  upload: {
    config: {
      // ✅ THE FIX IS HERE: The provider name is just 'cloudinary'
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_CLOUD_NAME'),
        api_key: env('CLOUDINARY_API_KEY'),
        api_secret: env('CLOUDINARY_API_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
