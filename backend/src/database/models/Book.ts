import { Schema, model, Document } from "mongoose";
import IUser from "./User";

export const DOCUMENT_NAME = "Book";
export const COLLECTION_NAME = "books";

export default interface IBook extends Document {
  createdBy: IUser[];
  createdAt: Date;
  createdByIp: string;
  frontUrl: string;
}

const schema = new Schema({
  createdAt: { type: Schema.Types.Date, default: Date.now },
  createdBy: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
  createdByIp: Schema.Types.String,
  frontUrl: {type: Schema.Types.String, maxlength: 500, required: false, trim: true}
});

export const BookModel = model<IBook>(DOCUMENT_NAME, schema, COLLECTION_NAME);
