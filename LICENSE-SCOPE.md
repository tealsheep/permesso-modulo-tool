# 许可范围与第三方资料

本项目的原创代码和自行整理的数据（包括 `src/`、`scripts/`、`data/`、`data-tools/`）按 GNU Affero General Public License version 3 发布，SPDX 标识为 `AGPL-3.0-only`。完整、未经修改的许可正文见同目录的 `LICENSE`。

## 官方文件不在 AGPL 许可范围内

`official/` 中的官方表格、说明文件以及空白缴费单样图不是本项目原创作品，**不属于本项目 AGPL 授权范围**。本项目不代表这些文件的权利人授予再使用许可。其来源、取得日期和已知限制见仓库的 `official/SOURCES.md`；使用这些资料应遵守原权利人的要求。

网站构建产物中的官方 Modulo 1 PDF 和缴费单图片也适用这项范围说明。受限的官方 Modulo 2 PDF 不进入仓库或网站；工具按版式数据重画，不放国徽。

## 不得公开分发的个人资料参考图

`docs/design/2026-11-05_ui-reference.webp` 经提供者确认含真实个人资料，不属于本项目授权公开分发的内容。它不进入网站 `dist/`。按 D51，公开仓库重新开始，该文件和旧 Git 历史都移到仓库外私人保管，不在公开仓库中。本许可文件不授权披露个人资料。

## 字体和依赖

- Modulo Sans SC 字体源自 Noto Sans SC，按 SIL Open Font License 1.1 分发。字体不改用 AGPL；见 `public/fonts/LICENSE`、`public/fonts/NOTICE.md`（网站中为 `fonts/`）。
- HarfBuzz 的许可与版权声明见 `public/fonts/HARFBUZZ-LICENSE`。
- npm 依赖仍遵循各自的许可证及版权声明；安装版本由 `package-lock.json` 固定。本项目的许可证不替代第三方许可。
