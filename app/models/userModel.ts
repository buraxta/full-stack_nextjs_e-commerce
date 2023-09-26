import { compare, genSalt, hash } from "bcrypt";
import { Document, Model, Schema, model, models } from "mongoose";

interface userDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  avatar: { url: string; id: string };
  verified: boolean;
}

interface Method {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<userDocument, {}, Method>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      type: Object,
      url: String,
      id: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    throw new Error(error as any);
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  try {
    return await compare(password, this.password);
  } catch (error) {
    throw new Error(error as any);
  }
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<userDocument, {}, Method>;
