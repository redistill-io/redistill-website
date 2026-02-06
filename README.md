# Redistill Website

Static marketing and documentation site for the [Redistill](https://github.com/redistill-io/redistill) project.

The site is a pure HTML/CSS static build, designed for white background and grey/blue accents, and is suitable for
hosting directly on GitHub Pages, Cloudflare Pages or any static host.

## Structure

- `index.html` – homepage with hero, key metrics, features, use cases and quick start.
- `benchmarks.html` – benchmark results and methodology, summarising the main project `docs/BENCHMARKS.md`.
- `roadmap.html` – future enhancements and roadmap, collated from Architecture, Features, TLS and tuning docs.
- `contact.html` – contact information, including `hello@shaikhshahid.com`.
- `docs/` – HTML documentation pages based on the upstream markdown:
  - `index.html` – docs index
  - `quickstart.html`
  - `features.html`
  - `architecture.html`
  - `config.html`
  - `examples.html`
  - `performance-tuning.html`
  - `production-guide.html`
  - `tls.html`
- `assets/css/styles.css` – shared styles, layout and responsive navigation.
- `assets/img/` – static images used by the site (see below).

## Images

To reuse charts and diagrams from the main Redistill repository, copy the following files:

```text
Redistill/docs/img/throughput.png           -> redistill-website/assets/img/throughput.png
Redistill/docs/img/latency.png              -> redistill-website/assets/img/latency.png
Redistill/docs/img/bandwidth.png            -> redistill-website/assets/img/bandwidth.png
Redistill/docs/img/Redistill_Architecture.png -> redistill-website/assets/img/Redistill_Architecture.png
```

Without these images the pages still render, but charts and diagrams will be blank.

## Developing locally

Because the site is fully static, you can open `index.html` directly in a browser or serve it with any static file
server (for example, from the project root):

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploying via GitHub + Cloudflare Pages

1. **Push to GitHub**
   - Create a new GitHub repository (for example, `redistill-website`).
   - Commit the contents of this directory and push to the new repo.

2. **Create a Cloudflare Pages project**
   - In the Cloudflare dashboard, go to **Pages** and create a new project.
   - Choose **Connect to Git** and select the `redistill-website` repository.
   - Set **Framework preset** to `None`.
   - Set **Build command** to empty (no build step).
   - Set **Output directory** to `/` (project root).

3. **Deploy**
   - Cloudflare Pages will automatically deploy on each push to the default branch.
   - Optionally configure a custom domain for the Pages project.

After deployment, you should be able to visit:

- `/` – homepage
- `/docs/` – documentation index
- `/benchmarks.html` – benchmarks page
- `/roadmap.html` – roadmap and future enhancements
- `/contact.html` – contact page

