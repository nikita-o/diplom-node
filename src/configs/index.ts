// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const { env } = process;
export const config = () => ({
  host: env.HOST || 'localhost',
  port: +env.PORT || 3000,
  prod: !!+env.PROD || false,
  // secure
  refreshLifetime: +env.REFRESH_LIFETIME || 10e8,
  refreshLength: +env.REFRESH_LENGTH || 64,
  jwtLifetime: +env.JWT_LIFETIME || 3600,
  jwtSecret: env.JWT_SECRET || 'secret',
});
