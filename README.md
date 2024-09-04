# Reminato Next.js Application

## Overview

This is a Next.js application named "Raminato" that fetches YouTube video data, stores it in a database, and provides authentication using GitHub OAuth. The application uses Prisma as the ORM and Supabase for database management.

## Features

- Fetches YouTube video data using the YouTube Data API.
- Stores video data in a PostgreSQL database using Prisma.
- Provides authentication using GitHub OAuth.
- Uses Next.js for server-side rendering and client-side navigation.
- Uses CSS inline for styling.

## Setup

1. Clone the repository.
2. Setup local postgres database using `docker-compose up -d`
3. Install dependencies using `npm install`.
4. Set up the environment variables in a `.env` file based on the provided `.env.example`
5. Set up the database using Prisma. Run `npx prisma generate` and `npx prisma db push` to create the database schema.
6. Start the development server using `npm run dev`.

- Note: If you are using Local replace url in schema and run `npx prisma generate`
## Usage

- The application fetches YouTube video data using the `fetchYoutubeVideoData` function in `pages/api/post/index.ts`.
- The video data is stored in the `VideoPost` model in the database.
- Authentication is handled using NextAuth and GitHub OAuth. The `Account` and `User` models in the database are used to store user data.
- The application uses server-side rendering and client-side navigation provided by Next.js.
- The application uses CSS inline.

## Testing

- The application includes unit tests for the function in `pages/api/post/index.ts`.
- Run `npm test` to execute the tests.

## Dependencies

- Next.js
- Prisma
- Supabase
- NextAuth
- GitHub OAuth
- YouTube Data API
- Tailwind CSS
- React, React DOM
- React Markdown, React Toastify

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.io/)
- [NextAuth](https://next-auth.js.org/)
- [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [React](https://reactjs.org/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [React Toastify](https://fkhadra.github.io/react-toastify/)