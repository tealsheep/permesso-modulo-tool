"""Build the served static TrueType font (FontTools 4.68.0).

python build-reference-font.py NotoSansSC-VF.ttf assets/fonts/ModuloSansSC-Regular.ttf
Then run npm run fonts:build to generate the small served subset.
Source revision and license are recorded in public/fonts/NOTICE.md.
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

font = TTFont(sys.argv[1], recalcTimestamp=False)
instantiateVariableFont(font, {"wght": 400}, inplace=True)
names = {1: "Modulo Sans SC", 2: "Regular", 3: "ModuloSansSC-Regular-2.004", 4: "Modulo Sans SC Regular",
         6: "ModuloSansSC-Regular", 16: "Modulo Sans SC", 17: "Regular"}
for entry in list(font["name"].names):
    if entry.nameID in names:
        font["name"].setName(names[entry.nameID], entry.nameID, entry.platformID, entry.platEncID, entry.langID)
font.save(sys.argv[2])
print("Copyright:", ascii(next(n.toUnicode() for n in font["name"].names if n.nameID == 0)))
