# Reference font source

`ModuloSansSC-Regular.ttf` is the full, fixed-weight Regular source used only by the build tool. Its bytes match the previous full served font (SHA-256 `a6f612dd00283e84125e23febb7f29c5a73e3527ac7192db83e1ea7e87e463ed`). This directory is outside `public/` and is not copied to the published site.

Source provenance, modification/renaming and Adobe copyright/RFN notices: [font notice](../../public/fonts/NOTICE.md). The font remains under SIL OFL 1.1, reproduced here in `LICENSE`.

Run `npm run fonts:build` to derive the small served font from code/data copy. The generated `subset-manifest.json` records source/input/output hashes and coverage metadata. Normal builds use local files and need no Python or network. Updating the upstream source uses `scripts/build-reference-font.py` first, followed by the Node build tool.
