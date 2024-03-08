const { User } = require("../../models");
// const User = Model.User;
const bcrypt = require('bcryptjs');
const {success, fail} = require("../../lib/response");
const {generateAccessToken} = require("../../lib/jwtHelper");

module.exports = {
    signUp: async (req, res) => {
        try {
            const {email, password, username} = req.body;
            await User.create({
                email,
                password: bcrypt.hashSync(password, 11),
                username
            });

            return res.status(201).json(success('create account successfully.', null));
        } catch (e) {
            console.log(e);
            return res.status(500).json(fail('something went wrong.'), null);
        }
    },

    login: async (req, res) => {
        const {email, password} = req.body;
        const user = await User.findOne({
            where: {email}
        });
        const checkPass = bcrypt.compareSync(password, user?.password ?? '');
        if (!checkPass) {
            return res.status(422).json(fail('invalid', null));
        }

        const accessToken = generateAccessToken(user.username);

        return res.status(200).json({ accessToken });
    },

    index: async (req, res) => {
        try {
            return res.status(200).json(success("success", null));
        } catch (e) {
            console.log(e);
            return res.status(500).json(fail("error", null));
        }
    },
};
