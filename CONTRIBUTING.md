# Contributing to Rinse

Thanks for considering a contribution to Rinse. Whether it's a bug fix, feature, or design improvement, we appreciate the help.

## Getting Started

### Fork and Clone

1. **Fork the repository** on GitHub.
2. **Clone your fork locally:**
   ```bash
   git clone https://github.com/your-username/rinse-website.git
   cd rinse-website
   ```
3. **Add the upstream remote:**
   ```bash
   git remote add upstream https://github.com/yashodhar/rinse-website.git
   ```

### Install and Run

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Making Changes

### Create a Feature Branch

Always create a new branch for your work:
```bash
git checkout -b feature/your-feature-name
```

Use descriptive names. Examples:
- `feature/add-wash-score-filters`
- `fix/ghost-penalty-calculation`
- `design/neo-brutalist-buttons`

### Code and Design Guidelines

**Design Language:** Rinse uses Neo-Brutalism. This means:
- High contrast, bold colors
- Thick borders and strong visual hierarchy
- Uppercase or bold typography for emphasis
- No rounded corners (sharp, geometric edges)
- Minimal use of shadows or gradients

When writing styles in Tailwind:
- Use `border-4` or `border-8` for thick borders
- Use `uppercase` or `font-bold` for typography emphasis
- Prefer `bg-black`, `bg-white`, `text-black`, `text-white` for high contrast
- Avoid `rounded-*` utilities unless absolutely necessary
- Test your changes in the browser to ensure they match the existing visual style

**Code:**
- Keep components clean and focused
- Comment complex logic
- Use meaningful variable and function names
- Test your changes locally before submitting

## Submitting a Pull Request

1. **Sync with upstream:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request on GitHub:**
   - Write a clear title describing the change
   - In the description, explain what you changed and why
   - Link any relevant issues (e.g., "Fixes #42")
   - Include a screenshot if it's a visual change

4. **Address feedback:**
   If the maintainer requests changes, make them on your branch and push again. The PR will update automatically.

## Pull Request Checklist

Before submitting:
- [ ] Your code runs without errors (`npm run dev` works)
- [ ] You've tested your changes in the browser
- [ ] Your design follows Neo-Brutalist principles (if applicable)
- [ ] You've written clear commit messages
- [ ] Your branch is synced with `upstream/main`

## Questions or Issues?

If you're unsure about something, open an issue first to discuss it. It's better to ask than to spend time on work that might not align with the project's direction.

---

**That's it!** Thanks for helping make Rinse better.
