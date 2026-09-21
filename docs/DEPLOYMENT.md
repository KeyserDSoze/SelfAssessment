# GitHub Pages deployment

The project deploys through `.github/workflows/deploy-pages.yml`.

## Repository settings

In GitHub:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Configure the custom domain `selfassessment.tech`.
4. Enable **Enforce HTTPS** after DNS is valid.

The repository includes `public/CNAME`, so the generated site contains the custom domain declaration.

## DNS

Configure the DNS records required by GitHub Pages for the apex domain and, if desired, `www`.

The Vite build uses relative asset paths and a hash router, so the same artifact can work on both the GitHub project URL and the custom domain.

## Workflow

Pushes to `main` build the application, create a Pages artifact and deploy it. Pull requests run CI but do not publish.
