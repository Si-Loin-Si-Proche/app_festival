export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      PROJECT_TOKEN: process.env.PROJECT_TOKEN,
    },
  };
};
