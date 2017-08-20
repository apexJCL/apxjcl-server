import { Document, model, Schema } from 'mongoose'
import { JWTHandler } from '../utils/jwt.generator'
import * as BCrypt from 'bcrypt'

export interface IUser extends Document {
    username: string,
    password: string
}

export const UserSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
            minlength: 6
        },
        password: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
);

UserSchema.methods.checkPassword = function (password: string) {
    return BCrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    return JWTHandler.sign({
        username: this.username
    })
};

UserSchema.pre('save', function (this: any, next) {
    if (!this.isModified('password')) {
        return next();
    }
    BCrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            return next();
        })
        .catch(e => {
            console.log(e);
            return next(e);
        })
});

export const User = model<IUser>('User', UserSchema);
