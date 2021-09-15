const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }

    ]
})

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email

    }, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token });

    return token;
}

//stored messages
// userSchema.methods.addMessage = async function (name, email, message) {
//     try {
//         this.messages = this.messages.concat({ name, email, message });
//         await this.save();
//         return this.messages
//     } catch (err) {
//         console.log(err)
//     }
// }

const User = model('user', userSchema);

module.exports.User = User;