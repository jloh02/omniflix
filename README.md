# Omniflix

Omniflix (<https://omniflix.jloh02.dev/>) is an app to help users search, organise and track the immense number of entertainment options available out there, ranging from movies and tv series to watch, books to read and games to play.

## Features

- Search, browse and track movies

## Getting Started

### Installation

1. Install the latest LTS version of Node.js
2. Clone this repository and navigate to it.
3. Run `yarn install` to install dependencies.
4. Copy and rename the `.env.example` file as `.env` and set the necessary variables (refer below for more information)
5. Run `yarn dev` to start the server at `localhost:3000`. **It might take a couple of minutes for the server to start the first time.**
6. Point your browser to `http://localhost:3000` to see your local deployment.

### Setting up your environment

The project requires a few accounts to be set to work properly:

1. Supabase (<https://supabase.com/>)
2. OMDB API (<https://www.omdbapi.com/apikey.aspx>)

In the .env file, these environment variables need to be set up:

1. Update your Supabase details from your project settings.

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

2. Update your OMDB API key.

   ```
   NEXT_OMDB_API_KEY=[INSERT OMDB API KEY]
   ```

   `NEXT_OMDB_API_KEY` can be found in the email sent to you right after registering.
