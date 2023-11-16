# Next news

Welcome to **Next.js - Hygraph news starter**, an open-source plug and play template and starter for you media apps or blogs! It's build on top of [next-enterprise](https://github.com/Blazity/next-enterprise) so it comes packed with functionalities designed to assist you in creating an app that is not only high-performing and maintainable but also enjoyable to use.

<br />
<a href="https://discord.gg/fyWtyNKmfX" style="width: 100%; display: flex; justify-content: center;">
  <img src="https://discordapp.com/api/guilds/1111676875782234175/widget.png?style=banner2" alt="Blazity Discord Banner"/>
</a>
<br />

## Table of Contents

- [Next.js Enterprise Boilerplate](#nextjs-enterprise-boilerplate)
  - [Table of Contents](#table-of-contents)
  - [More resources](#more-resources)
  - [🎯 Getting Started](#-getting-started)
  - [🚀 Deployment](#-deployment)
  - [📃 Scripts Overview](#-scripts-overview)
  - [🤝 Contribution](#-contribution)
  - [💌 Support](#support)
  - [📜 License](#-license)
  - [Contributors](#contributors)

## More resources

You can find more in depth dive into project's underlying architecture in the [next-enteprise](https://github.com/Blazity/next-enterprise) repository.

## 🎯 Getting Started

To get started with this boilerplate, follow these steps:

1. Fork & clone repository:

```bash
## Don't forget to ⭐ star and fork it first :)
git clone https://github.com/<your_username)/next-news.git
```

2. Install the dependencies:

```bash
yarn install --frozen-lockfile
```

3. Provide required env variables:

```bash
# url of your site, used for SEO and sitemaps
NEXT_PUBLIC_SITE_URL="my-site.app"
# hygraph's graphql content api url - you can find it in API Acess tab on Hygraph
NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL="https://region.hygraph.com/v2/projectId/environment"
# secret used for authenticating webhooks (generate it yourself)
HYGRAPH_WEBOOK_SECRET="my-secret-123"
```

Search engine - take it from your algolia project's config
```bash
NEXT_PUBLIC_ALGOLIA_API_ID=""
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=""
```

Analytics - used for counting views on your articles. Needed for 'Trending Articles' section
```bash
GA_MEASUREMENT_ID=""
GA_PROPERTY_ID=""
# Base64 endoded service account containing:
# {
#   "private_key: "private-key-value"
#   "client_email": "service-account-email@project.iam.gserviceaccount.com"
# }
GA_BASE64_SERVICE_ACCOUNT=""
```

4. Run the development server:

```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 🚀 Deployment

Easily deploy your Next.js app with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=next-enterprise) by clicking the button below: //final repo name goes here

[![Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise) //final repo name goes here

## 📃 Scripts Overview

The following scripts are available in the `package.json`:

- `dev`: Starts the development server along with codegen watcher
- `build`: Builds the app for production
- `start`: Starts the production server
- `lint`: Lints the code using ESLint
- `lint:fix`: Automatically fixes linting errors
- `prettier`: Checks the code for proper formatting
- `prettier:fix`: Automatically fixes formatting issues
- `analyze`: Analyzes the bundle sizes for Client, Server and Edge environments
- `storybook`: Starts the Storybook server
- `build-storybook`: Builds the Storybook for deployment
- `test`: Runs unit and integration tests
- `codegen`: Runs codegen on your public content api url
- `e2e:headless`: Runs end-to-end tests in headless mode
- `e2e:ui`: Runs end-to-end tests with UI
- `format`: Formats the code with Prettier
- `postinstall`: Applies patches to external dependencies
- `preinstall`: Ensures the project is installed with Yarn
- `coupling-graph`: **Generates a coupling and cohesion graph for the components**

## 🤝 Contribution

Contributions are always welcome! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes, and commit them using the [Conventional Commits](https://www.conventionalcommits.org/) format.
4. Push your changes to the forked repository.
5. Create a pull request, and we'll review your changes.

## Support

If you're looking for help or simply want to share your thoughts about the project, we encourage you to join our Discord community. Here's the link: [https://blazity.com/discord](https://blazity.com/discord). It's a space where we exchange ideas and help one another. Everyone's input is appreciated, and we look forward to welcoming you.

## 📜 License

This project is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://bstefanski.com/"><img src="https://avatars.githubusercontent.com/u/28964599?v=4?s=100" width="100px;" alt="Bart Stefanski"/><br /><sub><b>Bart Stefanski</b></sub></a><br /><a href="https://github.com/Blazity/next-enterprise/commits?author=bmstefanski" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jjablonski-it"><img src="https://avatars.githubusercontent.com/u/51968772?v=4?s=100" width="100px;" alt="Jakub Jabłoński"/><br /><sub><b>Jakub Jabłoński</b></sub></a><br /><a href="#infra-jjablonski-it" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/mszczep4niak"><img src="https://avatars.githubusercontent.com/u/35572075?v=4?s=100" width="100px;" alt="Marcin Szczepaniak"/><br /><sub><b>Marcin Szczepaniak</b></sub></a><br /><a href="https://github.com/Blazity/next-enterprise/commits?author=Pierniki" title="Code">💻</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
