# Van Gogh Museum React app

The museum experience is rendered by React with Vite. The original page URLs remain available: `index.html`, `visit.html`, and `webstore.html`.

## Run locally

```sh
npm install
npm run dev
```

## Build for deployment

```sh
npm run build
npm run preview
```

The production build writes to `dist/` and includes the artwork and frame assets used by the pages.

## Deploy to Vercel

The included `vercel.json` configures Vercel to install dependencies, run the Vite build, and publish `dist/`.

From this project folder in PowerShell, run `npx.cmd vercel` to sign in and create a preview deployment. Run `npx.cmd vercel --prod` when you are ready to publish the production deployment.
