interface IBook {
  mediaId: number;
  title: string;
  publishedDate: string;
  imageLink: string;
}

function isBook(arg: any): arg is IBook {
  return "imageLink" in arg;
}

export default IBook;
export { isBook };
