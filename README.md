# Nidhiesh M – Portfolio

A static HTML, CSS and JavaScript portfolio reorganized from the supplied single-file HTML source.

## Run locally
1. Keep the folder structure unchanged.
2. Add your profile photo at `assets/images/profile.jpg`.
3. Add your resume PDF at `documents/resume.pdf`.
4. Open `index.html` in a browser. For best results, use VS Code Live Server.

## Main files
- `index.html` – portfolio content and page structure
- `css/style.css` – original styles extracted from the HTML
- `js/main.js` – original interactions and behavior, including photo settings and skills data
- `assets/images/` – profile, project, certificate, achievement, education and icon images
- `documents/` – downloadable resume and other documents
- `data/` – reserved for future external JSON content; current portfolio content remains in HTML/JS to preserve behavior

## Profile photo
Put your own image at `assets/images/profile.jpg`, then set `PHOTO` near the top of `js/main.js` to `assets/images/profile.jpg`. Both circular profile frames use the same photo. Until then, the original placeholder remains visible.
To adjust the crop, edit `PHOTO_X`, `PHOTO_Y`, `PHOTO_ZOOM`, and `PHOTO_FIT` near the top of `js/main.js`.

## Resume
The Download Resume link points to `documents/resume.pdf`. Add your PDF with that exact filename.

## Hosting
Upload the complete `Nidhiesh-Portfolio` folder to Netlify Drop: https://app.netlify.com/drop
