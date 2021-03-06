'use strict';

exports = module.exports = function (app, mongoose) {
    var userSchema = new mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        roles: {
            admin: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'},
            account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'}
        },
        isActive: {
            type: Boolean,
            default: true
        },
        canDelete: {
            type: Boolean,
            default: true
        },
        timeCreated: {type: Date, default: Date.now},
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        search: [String]
    });
    userSchema.methods.canPlayRoleOf = function (role) {
        if (role === "admin" && this.roles.admin) {
            return true;
        }

        if (role === "account" && this.roles.account) {
            return true;
        }

        return false;
    };
    userSchema.methods.defaultReturnUrl = function () {
        var returnUrl = '/';
        if (this.canPlayRoleOf('account')) {
            returnUrl = '/';
        }

        if (this.canPlayRoleOf('admin')) {
            returnUrl = '/admin/';
        }

        return returnUrl;
    };
    userSchema.statics.encryptPassword = function (password, done) {
        var bcrypt = require('bcrypt-nodejs');
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return done(err);
            }

            bcrypt.hash(password, salt, null, function (err, hash) {
                done(err, hash);
            });
        });
    };
    userSchema.statics.validatePassword = function (password, hash, done) {
        var bcrypt = require('bcrypt-nodejs');
        bcrypt.compare(password, hash, function (err, res) {
            done(err, res);
        });
    };
    userSchema.index({username: 1}, {unique: true});
    userSchema.index({timeCreated: 1});
    userSchema.index({search: 1});
    userSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('User', userSchema);
};
