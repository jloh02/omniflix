import { testApiHandler } from "next-test-api-route-handler";
import { it, expect, describe } from "@jest/globals";
import * as appHandler from "./route";

describe("OMDB API Test", () => {
  it("should return error when no paramaters provided", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch();
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toContain("Missing params");
        expect(body.error).toContain("query");
        expect(body.error).toContain("type");
      },
    });
  });

  it("should return error when no query parameter provided", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher: (request) => {
        request.nextUrl.searchParams.append("type", "movie");
      },
      test: async ({ fetch }) => {
        const response = await fetch();
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toContain("Missing params");
        expect(body.error).toContain("query");
      },
    });
  });

  it("should return error when no type parameter provided", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher: (request) => {
        request.nextUrl.searchParams.append("query", "query");
      },
      test: async ({ fetch }) => {
        const response = await fetch();
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toContain("Missing params");
        expect(body.error).toContain("type");
      },
    });
  });

  it("should return error when invalid type provided", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher: (request) => {
        request.nextUrl.searchParams.append("query", "query");
        request.nextUrl.searchParams.append("type", "invalid");
      },
      test: async ({ fetch }) => {
        const response = await fetch();
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toContain("Invalid type");
      },
    });
  });

  it("should return a valid result with valid parameters", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher: (request) => {
        request.nextUrl.searchParams.append("query", "John");
        request.nextUrl.searchParams.append("type", "movie");
      },
      test: async ({ fetch }) => {
        const response = await fetch();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body["Search"].length).toBeGreaterThan(0);
      },
    });
  });

  it("should use title response when too many results error occurs", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher: (request) => {
        request.nextUrl.searchParams.append("query", "it");
        request.nextUrl.searchParams.append("type", "movie");
      },
      test: async ({ fetch }) => {
        const response = await fetch();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body["Search"].length).toBe(1);
      },
    });
  });

  it("should have varying page results ", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher: (request) => {
        request.nextUrl.searchParams.append("query", "lion");
        request.nextUrl.searchParams.append("type", "movie");
      },
      test: async ({ fetch }) => {
        const responsePage1 = await fetch();
        const body1 = await responsePage1.json();

        await testApiHandler({
          appHandler,
          requestPatcher: (request) => {
            request.nextUrl.searchParams.append("query", "lion");
            request.nextUrl.searchParams.append("type", "movie");
            request.nextUrl.searchParams.append("page", "2");
          },
          test: async ({ fetch }) => {
            const responsePage2 = await fetch();
            const body2 = await responsePage2.json();

            expect(responsePage1.status).toBe(200);
            expect(responsePage2.status).toBe(200);
            expect(body1.Search[0].Title).not.toEqual(body2.Search[0].Title);
          },
        });
      },
    });
  });
});
