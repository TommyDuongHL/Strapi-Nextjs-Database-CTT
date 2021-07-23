module.exports = ({ env }) => ({
  url: env("URL", "http://145.97.18.143:1337"),
  host: env('HOST', '145.97.18.143'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '5fb3bde5231e5894f5d4d143917c5132'),
    },
  },
});
