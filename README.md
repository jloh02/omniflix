# Omniflix

Omniflix (<https://omniflix.jloh02.dev/>) is an app to help users search, organise and track the immense number of entertainment options available out there, ranging from movies and tv series to watch, books to read and games to play.

## Features

- Search, browse and track movies

## Getting Started

### External Account Pre-Requisites

The project requires a few accounts to be setup to work properly:

1. Supabase (<https://supabase.com/>)
2. OMDB API (<https://www.omdbapi.com/apikey.aspx>)

### Installation

Ensure the following are installed:

- Latest LTS version of [Node.js](https://nodejs.org/en) (This project was developed on Node.js 20)
- Node.js `yarn` package manager

Backend Development

- [Docker Desktop](https://docs.docker.com/get-docker/) (which also requires WSL if you are developing on Windows)
- [Deno](https://docs.deno.com/runtime/manual/getting_started/installation)

### Clone Repository

```
git clone https://github.com/jloh02/omniflix
cd omniflix
```

### Backend Setup

> This step is optional if developing directly on the production DB (which should **NOT** be the case)

1. Navigate to `/backend`.
2. Run `yarn` to install dependencies
3. Run `yarn db:start` to spin up local DB (This step will take a couple of minutes for your first run)
   - Take note of the `API URL` and `anon key` to be updated in environment variables later
   - If you lost these values, run `yarn db:status` to retrieve the values again
4. Run `yarn serve`. Functions will update as you save code.
5. To test locally, you can use `curl` or the `javascript` client library (refer below for more information)
   - To create a new function, run `yarn supabase functions new <function_name>`
6. After developing, run `yarn db:stop` to stop local database container

#### Testing with Curl

```
curl --request <GET/POST> 'http://localhost:54321/functions/v1/<function_name>' \
  --header 'Authorization: Bearer <SUPABASE_ANON_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{ "name":"Functions" }'
```

#### Testing with JavaScript

```js
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const { data, error } = await supabase.functions.invoke("function_name", {
  body: { data: "some_body_data" },
});
```

### Frontend Setup

1. Navigate to `/frontend`
2. Run `yarn` to install dependencies
3. Copy and rename the `.env.example` file as `.env.local` and set the necessary variables (refer below for more information)
4. Run `yarn dev` to start the server at `localhost:3000`. **It might take a couple of minutes for the server to start the first time.**
5. Point your browser to `http://localhost:3000` to see your local deployment.

#### Setting up your environment

In the `.env.local` file, these environment variables need to be set up:

1. Update your Supabase details from your project settings.

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found from the backend setup for local development. For production DB, it can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

2. Update your OMDB API key.

   ```
   NEXT_OMDB_API_KEY=[INSERT OMDB API KEY]
   ```

   `NEXT_OMDB_API_KEY` can be found in the email sent to you right after registering.
