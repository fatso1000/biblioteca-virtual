import BookHelpers from "../../helpers/Book-helpers";
import IBook, { BookModel } from "../models/Book";
import { BookInfoModel } from "../models/BookInfo";
import UserHelpers from "../../helpers/User-helpers";
import { RefreshToken } from "../models/RefreshToken";
import { refreshToken } from "./UserRepo";

export interface uploadBook extends BookRepo {
  title: string;
  author: string;
  description: string;
  tags: string[];
  urlPdf: string;
}

export default class BookRepo {
  public static async findAll() {
    const books = await BookModel.find();
    return books.map((x) => x);
  }

  public static async uploadBook(
    params: uploadBook,
    { token, ipAddress }: refreshToken
  ) {
    const refreshToken = await BookHelpers.getRefreshToken(token!);
    const user = refreshToken;

    const newBook = BookHelpers.generateBook(
      user,
      "https://dummyimage.com/600x400/000/fff",
      ipAddress
    );
    const bookId = newBook.id;

    await newBook.save();

    const newBookInfo = await BookHelpers.generateBookInfo(bookId, params);
    await newBookInfo.save();
  }
}
