# The Home Edit — BHF Assessment

A small home furnishings catalog built with Next.js 15, the App Router,
TypeScript, and Tailwind CSS.

## Features

- Server-rendered product catalog using a local dataset.
- Dynamic product-detail pages at `/products/[id]`.
- Server Action to add or remove products from a shortlist.
- Shortlist count and a saved-products filter.
- Browser-cookie persistence for 30 days.
- Empty-shortlist, not-found, and unexpected-error screens.

## Requirements

- Node.js 22 or newer.
- npm.

## Run locally

After cloning the repository, open a terminal in the project folder:

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

No database, API keys, or environment variables are required.

## Production build

```bash
npm run build
npm run start
```

Stop the development server before starting the production server.

## Data and server rendering

`app/products.ts` contains three fictional products.

The homepage and detail page are Server Components. They read the
shortlist cookie on the server and render the appropriate saved state.

The homepage uses the `view` query parameter to filter the catalog:
`/?view=shortlist` displays only saved products.

## Server Action

`app/actions.ts` exports `updateShortlist`.

The product-detail form submits the product ID and a save/remove intent.
The action validates both inputs, reads the existing shortlist, updates
the cookie, and revalidates the homepage and affected detail page.

Repeated save requests do not create duplicate entries.

## Dynamic route

`app/products/[id]/page.tsx` reads the product ID from the URL.

For example, `/products/linen-duvet` displays the Linen Duvet.
Unknown product IDs call `notFound()`.

## Main files

- `app/page.tsx`: catalog, shortlist count, and saved-products filter.
- `app/products.ts`: shared product dataset.
- `app/products/[id]/page.tsx`: product details and shortlist form.
- `app/shortlist.ts`: reads and validates saved cookie data.
- `app/actions.ts`: server-side shortlist mutation.
- `app/layout.tsx`: shared layout and page metadata.
- `app/not-found.tsx`: not-found screen.
- `app/error.tsx`: unexpected-error recovery screen.

## Assumptions and limitations

- Products and prices are fictional demonstration data.
- The shortlist belongs to the current browser, not a logged-in account.
- Clearing browser cookies removes the shortlist.
- The cookie expires 30 days after the latest save/remove operation.
- The cookie stores public product IDs and is not an authorization system.
- Malformed cookie data is treated as an empty shortlist.
- Simultaneous changes in separate tabs can overwrite each other.
- There is no checkout, inventory system, or cross-device synchronization.
- A database and authentication would be appropriate for account-based
  favorites or shared business data.

## Validation

`npm run build` completed successfully, including linting and TypeScript
checks.

Manual checks to repeat before submission:

1. Open the catalog and each product-detail page.
2. Save a product and confirm the button changes.
3. Refresh and confirm the saved state remains.
4. Check the homepage count and My shortlist filter.
5. Remove all saved products and check the empty state.
6. Open an unknown product URL and check the not-found screen.
7. Check the layout in a narrow browser window.

## Dependency audit

PostCSS is overridden to version 8.5.29, and the production build passes.

npm audit reports five high-severity findings in the development-only
ESLint dependency chain involving braces. These remain unresolved.
The suggested automatic fix downgrades eslint-config-next to version 14,
so it was not applied to this Next.js 15 project.


## AI assistance

Claude assisted with implementation, Next.js explanations, and
troubleshooting. I integrated the code in VS Code and tested the
application locally, including the product pages and shortlist feature.


## Approximate time spent


Approximately 1 hour 50 minutes on project setup, implementing the catalog and
shortlist functionality , testing the main user flows,
and preparing the documentation.