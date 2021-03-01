import { Schema, model, Document, ObjectId } from "mongoose";
import IBook from "./Book";

export const DOCUMENT_NAME = "BookInfo";
export const COLLECTION_NAME = "booksInfo";

export default interface IBookInfo extends Document {
  bookId: string;
  title: string;
  author: string;
  publishedAt?: Date;
  description: string;
  tags: string[]
  urlPdf?: string;
}

const schema = new Schema({
  bookId: {
     type: Schema.Types.String,
     
  },
  title: { type: Schema.Types.String, required: true },
  author: Schema.Types.String,
  publishedAt: Schema.Types.Date,
  description: {type: Schema.Types.String, required: true, maxlength: 2000},
  tags: {type: [{type: Schema.Types.String, trim: true, uppercase: true}]},
  urlPdf: {type: Schema.Types.String, required: true, trim: true},
});

schema.set("toJson", {
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});

export const BookInfoModel = model<IBookInfo>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
