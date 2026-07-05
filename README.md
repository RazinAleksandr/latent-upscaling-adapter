# LUA — Project Page

Project page for **"LUA: Latent Upscaling Adapter for Diffusion-Based Image Synthesis"** (ECCV 2026).

A self-contained static site — plain HTML + CSS + a little vanilla JS, **no build step and no
external requests**. The one webfont (STIX Two Text, latin subset, OFL license) is embedded in
`static/css/style.css` as a data URI, so the page loads offline and on any static host.

- 📄 Paper (arXiv): https://arxiv.org/abs/2511.10629
- 🤗 Hugging Face: https://huggingface.co/papers/2511.10629
- 💻 Code (inference): https://github.com/vaskers5/LUA
- 🏋️ Training code: *coming soon*

## Structure
```
.
├── index.html              # the page
├── favicon.svg
├── .nojekyll               # tells GitHub Pages to serve files raw (no Jekyll)
├── scripts/
│   └── prepare_images.py   # regenerates compare/ + gallery/ JPEGs from the benchmark folder
├── static/
│   ├── css/style.css       # design system + embedded STIX Two Text
│   ├── js/main.js          # drag-compare slider, zoom toggle, copy-BibTeX
│   └── images/
│       ├── *.png / *.jpg   # paper figures (converted from the paper's vector PDFs)
│       ├── compare/        # drag-compare pair: base 1024² vs LUA ×2 @ 2048² (same latent)
│       └── gallery/        # FLUX+LUA 2048² benchmark outputs (thumb_* + full-res)
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
4. After the first deploy, set the `og:image` meta tag in `index.html` to the **absolute** URL
   (`https://<user>.github.io/<repo>/static/images/latent_vs_pixel.png`) so link previews work
   on X/Slack/etc.

## Regenerating images
Paper figures were converted from the paper's vector PDFs:
```bash
pdftocairo -png -scale-to 1600 -singlefile path/to/figure.pdf static/images/name
```

The drag-compare pair and gallery come from the release benchmark
(`../2026-07-04-benchmark`, FLUX, 28 steps, RTX 6000 Ada — see its `report.md`):
```bash
python3 scripts/prepare_images.py   # requires Pillow
```
To swap the drag-compare scene, change `SLIDER_SCENE` in the script and update the two
`static/images/compare/...` paths plus the caption in `index.html`. The slider's default
"detail" crop is set by `--zoom` / `transform-origin` on `.slider img` in `style.css`.

## Citation
See the BibTeX block at the bottom of the page (`#bibtex`). The proceedings entry should be
updated with volume/pages once the ECCV 2026 proceedings are published.
