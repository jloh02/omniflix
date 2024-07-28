import { MediaType } from "../constants";

interface IBook {
  mediaType: MediaType.BOOK;
  mediaId: number;
  title: string;
  publishedDate: string;
  imageLink: string;
  data: {
    volume_info: {
      subtitle: string;
      industry_identifiers: any[];
      page_count: number;
      preview_link: string;
      description: string;
      categories: string[];
    };
  };
}

function isBook(arg: any): arg is IBook {
  return "imageLink" in arg;
}

export default IBook;
export { isBook };
