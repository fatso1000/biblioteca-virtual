import IBook, { BookModel } from "../database/models/Book";
import IBookInfo, { BookInfoModel } from "../database/models/BookInfo";
import IUser from "../database/models/User";
import IRefreshToken, { RefreshToken } from "../database/models/RefreshToken";
import { ObjectId } from "mongodb";

export default class BookHelpers {
  public static generateBook(
    user: IUser | IRefreshToken,
    frontUrl: string,
    ipAddress: string
  ) {
    return new BookModel({
      createdBy: user.id,
      createdByIp: ipAddress,
      frontUrl,
    });
  }
  public static async getRefreshToken(token: string): Promise<IRefreshToken> {
    const refreshToken = await RefreshToken.findOne({ token }).populate(
      "users"
    );
    if (!refreshToken || !refreshToken.isActive) throw "Invalid Token";
    return refreshToken;
  }
  public static async generateBookInfo(
    bookId: string,
    params: any
  ) {
    const { title, author, description, tags, urlPdf } = params;
    return new BookInfoModel({
      bookId,
      title,
      author,
      description,
      tags,
      urlPdf,
    });
  }
  public static async getBookId(bookId: string) {
    // const obj_id = new ObjectId(bookId)
    const book = await BookInfoModel.findOne(
    {bookId});
    if (!book) throw "Invalid id";
    return book;
  }
}
