# Modulo Sans SC Regular (derived from Noto Sans SC)

- Upstream: https://github.com/notofonts/noto-cjk
- Revision: `f8d157532fbfaeda587e826d4cd5b21a49186f7c`
- Source: https://raw.githubusercontent.com/notofonts/noto-cjk/f8d157532fbfaeda587e826d4cd5b21a49186f7c/Sans/Variable/TTF/Subset/NotoSansSC-VF.ttf
- License: SIL Open Font License 1.1. The upstream license is reproduced in `LICENSE` alongside this file.
- Source SHA-256: `d68bafcb48a2707749396aa12bbbd833cb70401f3a9a689fd2902c7e0d295964`
- Regular source SHA-256: `a6f612dd00283e84125e23febb7f29c5a73e3527ac7192db83e1ea7e87e463ed`
- Initial build-time subset SHA-256: `301591719a5714fbef92ad997bb7cf0d4621cd613ff9c06ef07594459c198e82`
- Downloaded: 2026-11-06. Regular source size: 10,596,272 bytes. Initial served subset: 323,672 bytes / 1555 characters. Current generated metadata is in `assets/fonts/subset-manifest.json`.

Copyright © 2014-2021 Adobe (http://www.adobe.com/), with Reserved Font Name 'Source'.

Modification: fixed the variable font at weight 400 (Regular) with FontTools 4.68.0 and renamed the derivative to Modulo Sans SC. No outlines were otherwise edited. Rebuild with `scripts/build-reference-font.py` and the pinned source above. The derivative remains under SIL OFL 1.1.

The full Regular source is stored under `assets/fonts/` and is not shipped by Vite. `npm run fonts:build` uses HarfBuzz to retain fixed text from TypeScript/TSX literals and decoded data JSON, plus supported Latin/extended, combining, punctuation and symbol ranges. It runs automatically for dev/test/build; the dev server also watches source/data additions, changes and removals. Build output and coverage are verified, and unchanged inputs reuse the cached result. The served font changes when the character corpus changes; the generated manifest records its current hash.

The small static subset and HarfBuzz WASM are fetched during application startup, so generating a reference PDF after startup makes no network requests. Runtime HarfBuzz subsetting remains: it further reduces the font to characters used by that particular PDF, then pdf-lib/fontkit embeds those bytes with its own subsetting disabled. The old fontkit subsetter dropped CJK glyphs in OTF and TTF experiments, so it is deliberately not used for subsetting. The font is not used as the application's UI font.
