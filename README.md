

# Rinse: Official Promotional Website

**Live Site:** [https://rinse-website.vercel.app](https://rinse-website.vercel.app)

This repository contains the source code for the promotional landing page of **Rinse**, a laundry management and gamification app built for shared PG spaces. 

*(Note: This is strictly the codebase for the promotional website. The actual mobile application and backend logic live in a separate repository.)*

## What This Site Does
The Rinse website serves as the primary download hub and marketing page for the Android app. It is designed to:
* Explain the core mechanics of the app (Wash Scores, Ghost Penalties, Visual Scheduling).
* Provide direct Android `.apk` downloads by dynamically fetching the latest release data from the GitHub API.
* Showcase the app's aggressive, high-contrast Neo-Brutalist design language.

## Tech Stack
* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Deployment:** Vercel
* **Integrations:** GitHub Releases API (for dynamic versioning and downloads)

## Quick Start

To run the promotional website locally:

1. **Clone the repository**
```bash
git clone [https://github.com/yashodhar/rinse-website.git](https://github.com/yashodhar/rinse-website.git)
cd rinse-website
```

2. **Install dependencies**
```bash
npm install
```


3. **Start the development server**
```bash
npm run dev
```


The site will be available at `http://localhost:5173`.


## License
Distributed under the MIT License.  See [LICENSE.md](./LICENSE) for more information. Use it, fork it, and keep the laundry peace.