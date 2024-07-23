import { MediaType } from "@/utils/constants";
import SearchDetails from "@/components/searchPage/searchDetails";
import getBookDetails from "@/utils/database/books/getBookDetails";

interface BookPageProps {
  params: {
    mediaId: string;
  };
}

const BookPage: React.FC<BookPageProps> = ({ params }) => {
  return (
    <SearchDetails
      mediaId={parseInt(params.mediaId)}
      mediaType={MediaType.BOOK}
      errorHeader="Book Not Found"
      errorBody="The book you're looking for could not be found."
      getDetails={async (mediaId: number, _) => {
        "use server";
        return (await getBookDetails(mediaId)) ?? null;
      }}
    />
  );
};

export default BookPage;
