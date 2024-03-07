require("dotenv").config();

module.exports = {
    apps : [{
      name: process.env.APP_NAME || 'obga02_backend',
      script: "node index.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      combine_logs: true,
      watch: true,
      autorestart: true,
      ignore_watch: ["node_modules", "src/uploads", ".git", "src/public/export", "src/config/index.json"],
    }]
  }