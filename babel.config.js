module.exports = function (api) {
  const platform = api.caller((caller) => caller?.platform);
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins:
      platform === "web"
        ? [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            [
              "@babel/plugin-transform-runtime",
              {
                helpers: true,
                regenerator: true,
              },
            ],
          ]
        : [],
  };
};
