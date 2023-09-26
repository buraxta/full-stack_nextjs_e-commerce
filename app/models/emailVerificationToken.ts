import { compare, genSalt, hash } from "bcrypt";
import { Model, ObjectId, Schema, model, models } from "mongoose";

interface EmailVerificationToken extends Document {
  user: ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const emailVerificationTokenSchema = new Schema<
  EmailVerificationToken,
  {},
  Methods
>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

emailVerificationTokenSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("token")) return next();

    const salt = await genSalt(10);
    this.token = await hash(this.token, salt);
    next();
  } catch (error) {
    throw new Error(error as any);
  }
});

emailVerificationTokenSchema.methods.compareToken = async function (
  tokenCompare
) {
  try {
    return await compare(tokenCompare, this.token);
  } catch (error) {
    throw new Error(error as any);
  }
};

const EmailVerificationToken =
  models.EmailVerificationToken ||
  model("EmailVerificationToken", emailVerificationTokenSchema);

export default EmailVerificationToken as Model<
  EmailVerificationToken,
  {},
  Methods
>;
