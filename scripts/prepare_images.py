#!/usr/bin/env python3
"""Prepare web assets for the LUA project page.

Sources:
  - Paper figures:   ../LUA/figures/*.pdf  (converted separately via pdftocairo)
  - Benchmark shots: ../2026-07-04-benchmark/<scene>/{base_1024.png, lua_2k/final_2048.png}

Outputs (static/images/):
  - compare/<scene>_base_1024.jpg + <scene>_lua_2048.jpg   (drag-compare pair)
  - gallery/thumb_<scene>.jpg (640px) + <scene>.jpg (2048px) (click-through gallery)

Usage: python3 scripts/prepare_images.py
Requires: Pillow
"""
import os
from PIL import Image

BENCH = "/home/research/eccv2026/2026-07-04-benchmark"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "static", "images")

SCENES = ["01_valley", "02_fisherman", "03_fox", "04_tokyo", "05_bee"]
SLIDER_SCENE = "05_bee"


def save_jpg(img, path, quality=88):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.convert("RGB").save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{path}  {os.path.getsize(path)//1024} KB")


def main():
    # Drag-compare set (kept at native resolutions; CSS scales all to one box):
    # LUA output vs (a) its 1024^2 base, (b) direct 2048^2 sampling of the same prompt
    base = Image.open(f"{BENCH}/{SLIDER_SCENE}/base_1024.png")
    lua = Image.open(f"{BENCH}/{SLIDER_SCENE}/lua_2k/final_2048.png")
    direct = Image.open(f"{BENCH}/{SLIDER_SCENE}/direct_2k/final_2048.png")
    save_jpg(base, f"{OUT}/compare/{SLIDER_SCENE}_base_1024.jpg", 92)
    save_jpg(lua, f"{OUT}/compare/{SLIDER_SCENE}_lua_2048.jpg", 90)
    save_jpg(direct, f"{OUT}/compare/{SLIDER_SCENE}_direct_2048.jpg", 90)

    # Gallery: 640px thumbs + full-res 2048 click-through
    for s in SCENES:
        im = Image.open(f"{BENCH}/{s}/lua_2k/final_2048.png")
        save_jpg(im, f"{OUT}/gallery/{s}.jpg", 88)
        th = im.resize((640, 640), Image.LANCZOS)
        save_jpg(th, f"{OUT}/gallery/thumb_{s}.jpg", 84)


if __name__ == "__main__":
    main()
