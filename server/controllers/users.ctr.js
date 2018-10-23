var express = require('express');
var auth = require('../middleware/checkfields.js');
const sqlite3 = require("sqlite3").verbose();

var router = express.Router();


router.route('/')
.get(function (req, res) {
    let db = new sqlite3.Database("./database/vueapp.db");
    let sql = `SELECT * FROM users `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        return res.json({
            status: true,
            profiles: rows
        });
    });
})
    .post(auth.multipartMiddleware, function (req, res) {
        if (auth.isEmpty(req.body.name) || auth.isEmpty(req.body.email) || auth.isEmpty(req.body.company_name) || auth.isEmpty(req.body.password)) {
            return res.json({
                'status': false,
                'message': 'All fields are required'
            });
        }

        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            let db = new sqlite3.Database("../database/vueapp.db");
            let sql = `INSERT INTO users(name,email,company_name,password) VALUES('${
                req.body.name
                }','${reqBody.email}','${req.body.company_name}','${hash}')`;
            db.run(sql, function (err) {
                if (err) {
                    throw err;
                } else {
                    return res.json({
                        status: true,
                        message: "User Created"
                    });
                }
            });
            db.close();
        });
    });

router.route('/login')
    .post(auth.multipartMiddleware, function (req, res) {
        let db = new sqlite3.Database("../database/vueapp.db");
        let sql = `SELECT * from users where email='${req.body.email}'`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            db.close();

            if (rows.length == 0) {
                return res.json({
                    status: false,
                    message: "Sorry, wrong email"
                });
            }
            let user = rows[0];

            let authenticated = bcrypt.compareSync(req.body.password, user.password);
            delete user.password;
            if (authenticated) {
                //  create payload for JWT
                const payload = { user: user };
                // create token
                let token = jwt.sign(payload, app.get("appSecret"), {
                    expiresIn: "24h" // expires in 24 hours
                });

                return res.json({
                    status: true,
                    user: user,
                    token: token
                });
            }

            return res.json({
                status: false,
                message: "Wrong Password, please retry"
            });
        });
    });



module.exports = router;