const cron = require("node-cron");

module.exports = {
  cron: cron.schedule("0 0 * * *", () => {
    console.log("Reward event cronjob");
  }),
};
