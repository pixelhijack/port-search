## Improvements, potential next steps, roadmap
- Add an Error boundary to handle errors more gracefully on the UI
- Find Typescript localisation promise type error fix (params vs LayoutProps)
- whitelist IPv4 vs IPv6 IP Addresses at mongodb
- verify mongodb connection and create db model upsert on CSV parsing (Port / Cruise Schemas)
- swap the static mocks to mongodb provided dynamic db responses
- potential use of OpenAI API middleware for data cleaning CSV duplicates / normalisation
- create a details sub route for certain cruises
- change search to a query string + backend response based approach instead filtering cache
- verify passing production Vercel build
- verify a docker build
- add dynamic React handling of mobile layouts

## Localisation setup
[next-intl](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## NPM scripts to run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
