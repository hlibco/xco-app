# XCO-APP

> Front-end of the XCO Project

> This APP displays the Provider Summary of the Top 100 Diagnosis Related Groups behind a protected url route.

APP Url: [http://www.xcoproject.com/](http://www.xcoproject.com/)

Credentials:

```bash
username: pablo
password: picasso
```

The Back-end code of the XCO Project has its own repository and is deployed independently. It gives more flexibility about tooling and deployment process.

## Topology

- Host/PaaS: Surge.sh
- DNS: Google Domains

## Requirements

Before running this project locally, it's required to have the XCO-API project up and running, serving HTTP traffic in the port 3009.

## Build Setup

```bash
# install dependencies
$ yarn install --ignore-engines

# serve with hot reload at localhost:3010
$ yarn start

# build for production and launch server
$ yarn build
$ yarn serve

# generate static project
$ yarn generate
```

## Bonus Features

- Login screen
- Authorization token persisted in the Local Storage and sent in the header of the request for the API
- Filter the fields returned by the API. (_Example:_ provider_name,provider_city,provider_state...)

## Extra Features

- Logout
- The query params in the URL of the page change on every submit of the `Filters` form (without refrshing the page). This allow a shareable url with pre-selected filters
- Pre-fill the filters form with values from the URL query params

## Production

The front-end of the XCO Project is hosted on [surge.sh](https://surge.sh). The Surge's deployment process is faster and simpler then Heroku's. For SPAs that don't require Server Side Rendering (SSR), I'd go with Surge or [Netlify](https://www.netlify.com/). If the project's requirements are more complex or need more robustness, I'd suggest Amazon S3 + Cloudfront.

## Technical Choices

- Javascript Library: VueJS / Nuxt (Great tooling, DX and features)
- CSS Preprocessor: Stylus (Faster and cleaner to write compared to Scss/Less)

## Preview

http://www.xcoproject.com/providers

![summary](docs/summary.png "Summary")

---

http://www.xcoproject.com/

![login](docs/login.png "Login")
