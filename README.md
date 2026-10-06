<div align="center">
  <img
  src="https://github.com/d2lang/text-to-diagram-site/blob/6e91e491a0ac913b1ac8b9f710d520cdee903057/public/svg/switch.svg"
  width="150px"
  height="150px"
  />
  <h1>Text to diagram comparisons</h1>
  <a href="https://text-to-diagram.com">Go to comparisons site</a>
  <p>Compare syntax, layouts, outputs between languages for generating diagrams with text.</p>
</div>

<p align="center">
  <img align="center" width="754" alt="Screen Shot 2022-10-22 at 3 57 45 PM" src="https://user-images.githubusercontent.com/3120367/197365340-9d4ab821-acd9-4a64-9c9b-035da7f7a6bb.png">
</p>

[![ci](https://github.com/d2lang/text-to-diagram-site/actions/workflows/ci.yml/badge.svg)](https://github.com/d2lang/text-to-diagram-site/actions/workflows/ci.yml)
[![daily](https://github.com/d2lang/text-to-diagram-site/actions/workflows/daily.yml/badge.svg)](https://github.com/d2lang/text-to-diagram-site/actions/workflows/daily.yml)
[![license](https://img.shields.io/github/license/d2lang/text-to-diagram-site?color=9cf)](./LICENSE)

<a href="https://vercel.com/open-source-program"><img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge-2026.svg" /></a>

_Full disclosure: This site and D2 were originally created at Terrastruct. Today, the
site is maintained by the independent D2 project, fiscally sponsored by Hack Club. D2
appears first; otherwise, it gets no special treatment. Contributions and corrections
are welcome—even ones that make D2 look bad. We'll include them without bias and then
furiously improve D2._

### Currently supported comparisons

High-quality comparisons take a lot of work, which will only get more as the number of
examples grows. Other than D2, the currently supported set are what seem to be the most
popular tools for text-to-diagram.

- D2
- Mermaid
- GraphViz
- PlantUML

For completeness, you may want to also evaluate less popular tools/languages. The best
catalog we've found is
[https://xosh.org/text-to-diagram/](https://xosh.org/text-to-diagram/).

## FAQ

- See [https://text-to-diagram.com#faq](https://text-to-diagram.com#faq)

## Contributing

### Run locally

```sh
# Only needed first run
git submodule update --init --recursive
npx --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile

npx --yes --package=yarn@1.22.22 -- yarn dev
```

### Production hosting

Vercel builds the `master` branch as a static site for `text-to-diagram.com` and
`www.text-to-diagram.com`. Use Node.js 24 and Yarn 1.22.22. Initialize both public
Git submodules before building, then run:

```sh
git submodule update --init --recursive
npx --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile
npx --yes --package=yarn@1.22.22 -- yarn build
```

The existing build exports `out/`, including `index.html`, `404.html`, the sitemap,
robots file, and browser assets. The checked-in examples are already rendered;
production builds do not need D2, Mermaid, Graphviz, or PlantUML. No application
server or production environment secrets are required.

Import this repository into the D2 Vercel team as `text-to-diagram`. The
`vercel.json` settings select **Other** as the framework and `out` as the output.
Choose a fixed **Standard** build machine, disable on-demand concurrency, and
require the existing GitHub checks `ci` and `nofixups` before assigning production
domains. Keep the public PR and daily workflows enabled.

Add both custom domains in the project's **Domains** settings. Configure
`www.text-to-diagram.com` to redirect to `text-to-diagram.com` and select status
**301** explicitly; Vercel's default domain redirect status is **308**. This
project setting is required alongside the redirect intent declared in
`vercel.json`.

`vercel.json` preserves the static 404, current security headers, Plausible
script/event proxies, and browser cache lifetimes on apex pages, assets, and
proxy responses. The domain redirect uses Vercel's default response headers. Its
301 retains the original path and query, including repeated query parameters.
This corrects the former CloudFront function, which double-encoded already
escaped query values. There is no catch-all rewrite to `index.html`: missing
paths must keep a 404 status.

Before changing DNS, verify both hostnames, a missing path, `/404`, `/404.html`,
representative CSS/JavaScript/WASM and images, `/js/script.js`, and `/api/event`.
The DNS and retained AWS rollback resources are managed in `d2lang/infra`; review
and apply that repository's migration plan separately. Keep the former S3 bucket
and CloudFront distribution through the rollback window.

For an application regression, promote the previous working Vercel deployment.
For a hosting rollback, pause automatic Vercel deployments, re-enable the retained
CloudFront distribution through a reviewed Terraform change, wait for it to be
`Deployed`, and restore its former DNS aliases. Verify HTTPS and redirects after
DNS convergence. The AWS deployment job is retired; do not restore it while
Vercel owns production.

### Adding examples

Please follow the examples in `src/examples`.

1. Create a folder in `src/examples` with a short name of the example
1. Add in that folder:

- `description.txt` to describe what the example aims to demonstrate.
- `render/` for SVG renders
- `syntax/` for texts
- If there are languages with errors for this example, `error/`

1. Create the text for as many languages as you can. It's okay if not totally complete. We
   or others can fill.
1. Run `./ci/render.sh` (with the respective tools installed)

- Pre-requisite tools:
  - `mermaid-cli` (`mmdc`)
  - `plantuml`
  - `graphviz` (`dot`)
  - `d2`

<img alt="CLI render" src="/docs/assets/render.png" />

### Adding features

If you think there's a significant feature that people want to compare against, feel free
to add a line in `src/components/Features.tsx`.

### Adding languages

If you wish to add a new language, please fill out as many of the examples and features as
possible. It's a lot of work, but if there's enough interest in the language, perhaps
others will help out.
