export default ({ config }) => {
  return {
    ...config,
    web: {
      ...config.web,
      // Forcé explicitement pour GitHub Pages (si-loin-si-proche.github.io/app_festival)
      baseUrl: '/app_festival',
    },
    extra: {
      ...config.extra,
      PROJECT_TOKEN: process.env.PROJECT_TOKEN,
    },
  };
};
