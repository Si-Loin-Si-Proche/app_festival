export default ({ config }) => {
  return {
    ...config,
    web: {
      ...config.web,
    },
    experiments: {
      ...config.experiments,
      baseUrl: '/app_festival',
    },
    extra: {
      ...config.extra,
      PROJECT_TOKEN: process.env.PROJECT_TOKEN,
    },
  };
};
