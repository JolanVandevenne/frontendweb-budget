# Budget app

## Setup

Install all dependencies using the following command:

```bash
pnpm install
```

Create a `.env` with the following content and apply to your configuration:

```dotenv
VITE_API_URL=http://localhost:9000/api
```

## Start the app

### Development

- Start the app using `pnpm dev`. It runs on <http://localhost:5137> by default.

### Testing

- Start the playwright tests using `pnpm test:ui`. Make sure the backend is running and the database is seeded.

### Production

- Build and run the production image using Docker Compose:

  ```bash
  docker compose up --build
  ```

  This builds a multi-stage image (installs dependencies, builds the app with `pnpm build`, then serves the static `dist` folder with Nginx) and starts the container on <http://localhost:80>.

- The API URL used at build time is set via the `VITE_API_URL` build arg in `docker-compose.yml`. Adjust it there if your backend runs elsewhere.
