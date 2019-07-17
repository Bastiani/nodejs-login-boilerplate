"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);











const UserSchema = new (0, _mongoose.Schema)(
  {
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
      description: 'Whether the user is admin or not',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'User',
  },
);

UserSchema.index({ name: 'text' });
UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('save', function hashPassword(next) {
  // Hash the password
  if (this.isModified('password')) {
    this.encryptPassword(this.password)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(err => next(err));
  } else {
    return next();
  }
});

UserSchema.methods = {
  async authenticate(plainText) {
    try {
      return await _bcryptjs2.default.compare(plainText, this.password);
    } catch (err) {
      return false;
    }
  },
  async encryptPassword(password) {
    return _bcryptjs2.default.hash(password, 8);
  },
};

exports. default = _mongoose.model('User', UserSchema);
