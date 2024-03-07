sequelize db:migrate:undo:all
sequelize db:migrate
sequelize db:seed --seed ./src/database/seeds/20230404041612-User.js
