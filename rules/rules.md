# Developer Rules of Thumb 👍 

If you are writing code for the Rinse website, read this first. This is a promotional landing page. It needs to be fast, aggressive, and highly readable. We do not want over-engineered code or soft, generic web designs. 

Follow these rules of thumb to get your Pull Requests merged quickly.

## 1. Design Law: Brutalism Only
This app is built to stop roommate arguments. The design needs to look just as strict.
* **No gradients, no soft blurs.** Use solid, high-contrast colors.
* **Hard shadows only.** If you add a shadow, it must be a solid block (e.g., `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`). Do not use Tailwind's default `shadow-md` or `shadow-lg` because they blur.
* **Thick borders.** Everything gets a `border-4 border-black` unless it specifically breaks the layout.
* **Capitalize actions.** Buttons and headers should be aggressive and `uppercase`.

## 2. Mobile-First is Not Optional
Rinse targets PG residents. 99% of them will look at this website on their phones while standing in a laundry room. 
* If you build a new section, build it for a mobile screen first using base Tailwind classes.
* Add `sm:`, `md:`, and `lg:` prefixes only after the mobile view is perfect.
* If a Pull Request breaks the layout on a standard mobile viewport (320px - 400px), it will be rejected.

## 3. Keep the Tech Stack Lean
This is a landing page, not a massive web application. 
* Do not introduce state management libraries like Redux or Zustand. React's built-in `useState` is more than enough here.
* Do not install heavy animation libraries unless absolutely necessary. Use Tailwind's built-in transitions (`transition-all`, `hover:translate-x-1`, etc.).
* Keep the bundle size small. If you need an icon, import just that specific icon from `lucide-react`, not the whole library.

## 4. Commit Like a Human 👽
Your commit history is a log of what changed and why. Keep it readable.
* **Bad:** `fixed stuff` or `update UI`
* **Good:** `Fix text overflow on the Android download button for small screens`
* **Good:** `Add GitHub release API fetch logic to the hero section`

## 5. The "No Surprises" Rule for PRs
Before you open a Pull Request, you must run this checklist locally:
1. Run `npm run dev` and click through every link to ensure nothing is broken.
2. Shrink your browser window to mobile size and verify the layout.
3. Run `npm run build` to ensure Vite compiles successfully without throwing hidden typescript or syntax errors.