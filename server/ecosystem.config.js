module.exports = {
  apps: [
    {
      name: "pivot",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
