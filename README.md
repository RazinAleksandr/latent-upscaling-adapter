# LUA — Project Page

Project page for **"LUA: Latent Upscaling Adapter for Diffusion-Based Image Synthesis"** (ECCV 2026).

A self-contained static site — plain HTML + CSS + a little vanilla JS, **no build step and no
external dependencies** (all assets are local, so it loads offline and on any static host).

- 📄 Paper (arXiv): https://arxiv.org/abs/2511.10629
- 🤗 Hugging Face: https://huggingface.co/papers/2511.10629
- 💻 Code (inference): https://github.com/vaskers5/LUA
- 🏋️ Training code: *coming soon*

## Structure
```
.
├── index.html              # the page
├── favicon.svg
├── .nojekyll               # tells GitHub Pages to serve static/ raw (no Jekyll)
├── static/
│   ├── css/style.css
│   ├── js/main.js          # copy-BibTeX button + before/after slider
│   └── images/             # figures (converted from the paper PDFs)
│       └── slider/         # before/after slider assets (currently SVG placeholders)
└── README.md
```

## Preview locally
Just open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Publish on GitHub Pages
1. Create a new repo (e.g. `lua-project-page`) and push this folder to it.
2. Repo **Settings → Pages → Build and deployment**: source **Deploy from a branch**,
   branch **`main`**, folder **`/ (root)`**, then **Save**.
3. The site goes live at `https://<user>.github.io/<repo>/` within a minute or two.

> Tip: for a `username.github.io/LUA`-style URL, name the repo `LUA`. The `.nojekyll` file is
> already included so the `static/` assets are served as-is.

## Placeholders to fill in (optional)
The page works as-is, but a few spots are marked for richer visuals. Search `index.html` for
`TODO(asset)`:

| Spot | What to add |
|---|---|
| **Before/after slider** | Replace `static/images/slider/slider_before.svg` and `slider_after.svg` with a **pixel-aligned crop pair** (`.png`): the base decode and the LUA ×4 output of the *same* region, at the same display size. Then update the two `src=` attributes. |
| **Extra results gallery** | Convert `figures/supplementary/flux_2k_1.pdf` / `flux_2k_2.pdf` to PNG and drop them into the gallery grid (or delete the block). |
| **Demo video** | Optionally add `static/videos/demo.mp4` (a latent-upscaling pass) and swap the placeholder for a `<video>` tag. |

## Updating figures
Figures were converted from the paper's vector PDFs with `pdftocairo`:
```bash
pdftocairo -png -scale-to 1600 -singlefile path/to/figure.pdf static/images/name
```
Re-run with a smaller `-scale-to` value if a PNG is too large.

## Citation
See the BibTeX block at the bottom of the page (`#bibtex`). The proceedings entry should be
updated with volume/pages once the ECCV 2026 proceedings are published.
