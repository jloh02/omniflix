import { NextRequest, NextResponse } from "next/server";

const ALLOWED_OMDB_TYPES = ["movie", "series", "episode"] as const;
type OMDBType = (typeof ALLOWED_OMDB_TYPES)[number];

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page") ?? 1;
  const mediaTypeInput = request.nextUrl.searchParams.get("type");

  const OMDB_API_KEY = process.env.NEXT_OMDB_API_KEY;

  if (!OMDB_API_KEY)
    return NextResponse.json(
      { error: "Internal error occurred: Unknown API key" },
      { status: 500 },
    );

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

  // Use searches that returns "too many results" (https://github.com/omdbapi/OMDb-API/issues/190)
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&page=${page}&type=${mediaType}`,
  );
  const resBody = await res.json();
  if (!resBody.Error) return NextResponse.json(resBody);

  const titleRes = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${query}&type=${mediaType}`,
  );
  const titleResBody = await titleRes.json();

  // Return 404 when error returned by title API
  if (titleResBody.Error)
    return NextResponse.json(titleResBody, { status: 404 });

  // Format data so it matches the search API
  return NextResponse.json({ Search: [titleResBody] });
}
