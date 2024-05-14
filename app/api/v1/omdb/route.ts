import { MINIMUM_OMDB_SEARCH_LENGTH } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_OMDB_TYPES = ["movie", "series", "episode"] as const;
type OMDBType = (typeof ALLOWED_OMDB_TYPES)[number];

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page") ?? 1;
  const mediaTypeInput = request.nextUrl.searchParams.get("type");

  const errorStr: string[] = [];
  if (!query) errorStr.push("query");
  if (!mediaTypeInput) errorStr.push("type");
  if (errorStr.length > 0) {
    return NextResponse.json(
      { error: "Missing params: " + errorStr.map((x) => `'${x}'`).join(", ") },
      { status: 400 },
    );
  }

  const mediaType = ALLOWED_OMDB_TYPES.find(
    (validType) => validType === mediaTypeInput,
  ) as OMDBType;
  if (!mediaType) {
    return NextResponse.json(
      {
        error: "Invalid type. Allowed types: " + ALLOWED_OMDB_TYPES.join(", "),
      },
      { status: 400 },
    );
  }

  // Use title query for 2 character searches as tracked here: https://github.com/omdbapi/OMDb-API/issues/190
  const useTitleQuery = (query ?? "").length < MINIMUM_OMDB_SEARCH_LENGTH;

  if (useTitleQuery) {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.NEXT_OMDB_API_KEY}&t=${query}&page=${page}&type=${mediaType}`,
    );
    return NextResponse.json({ Search: [await res.json()] });
  }

  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${process.env.NEXT_OMDB_API_KEY}&s=${query}&page=${page}&type=${mediaType}`,
  );
  return NextResponse.json(await res.json());
}
