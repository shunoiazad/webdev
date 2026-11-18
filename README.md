# SpecMate

A responsive, multi-page static website that helps college students find a laptop that fits their academic program, budget, preferred operating system, and portability needs.

Built with React (Vite), React Router, Bootstrap 5, and CSS. There is no back end or database: all content is stored in arrays of objects inside `src/data`.

## Run it

```bash
npm install
npm run dev
```

Build for deployment: `npm run build` (output in `dist`).

## Pages and routes

| Page | Route |
| --- | --- |
| Home | `/` |
| Find My Laptop (step-by-step form and curated results) | `/find` |
| Catalog (search, filters, sorting, details pop-up) | `/catalog` |
| About | `/about` |
| Contact and FAQs | `/contact` |

## Component hierarchy

```
App
├── Navbar
├── Routes
│   ├── Home        → HeroBanner, SectionHeading, FeatureCard
│   ├── Recommender → HeroBanner, ProgressBar, FormStep → OptionGroup,
│   │                 ResultsList → LaptopCard, LaptopModal
│   ├── Catalog     → HeroBanner, LaptopCard, LaptopModal
│   ├── About       → HeroBanner, SectionHeading, FeatureCard
│   └── Contact     → HeroBanner, FeatureCard, SectionHeading, FAQAccordion → FAQItem
└── Footer
```

## Data (arrays of objects)

`src/data/laptops.js`, `questions.js`, `faqs.js`, and `content.js`. Lists are rendered with `map()` and unique keys, and passed down to child components through props.

## Interactive features

Multi-step recommendation form (state), catalog search / filter / sort, laptop details pop-up, FAQ accordion, and contact form with client-side validation.

## Deployment

The site uses `HashRouter` and `base: './'`, so it works on any static host. On Netlify or Vercel, import the GitHub repository; the build command is `npm run build` and the output folder is `dist`.
