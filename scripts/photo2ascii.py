#!/usr/bin/env python3
"""Turn a photo into an ASCII density grid for the ASCII site.

Only the quantised grid is written to the repo (src/ascii/portrait.json).
The original photo never needs to be committed or published.

usage: python3 scripts/photo2ascii.py photo.jpg [--cols 110] [--out src/ascii/portrait.json]
"""
import argparse, json
from PIL import Image, ImageOps, ImageFilter, ImageEnhance

ap = argparse.ArgumentParser()
ap.add_argument('photo')
ap.add_argument('--cols', type=int, default=110)
ap.add_argument('--out', default='src/ascii/portrait.json')
ap.add_argument('--levels', type=int, default=10)
ap.add_argument('--contrast', type=float, default=1.35)
ap.add_argument('--invert', action='store_true', help='use for photos with a dark background')
a = ap.parse_args()

im = ImageOps.exif_transpose(Image.open(a.photo)).convert('L')
im = ImageOps.autocontrast(im, cutoff=2)
im = ImageEnhance.Contrast(im).enhance(a.contrast)
im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=120))
CELL_ASPECT = 0.5  # monospace cell is ~2x taller than wide
rows = max(1, round(a.cols * im.height / im.width * CELL_ASPECT))
small = im.resize((a.cols, rows), Image.LANCZOS)
px = list(small.getdata())
lv = a.levels - 1
# density: dark pixel -> dense glyph (site is ink on paper)
dens = [(p if a.invert else 255 - p) * lv // 255 for p in px]
data = ''.join(str(min(9, d)) for d in dens)
json.dump({'cols': a.cols, 'rows': rows, 'data': data}, open(a.out, 'w'))
print(f'wrote {a.out}: {a.cols}x{rows}')
