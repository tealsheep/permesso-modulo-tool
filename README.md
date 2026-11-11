# 居留填表助手

通过中文问卷，辅助填写意大利邮局居留 kit 中的 Modulo 1、按申请需要填写的 Modulo 2，并生成缴费单参考件和中意双语材料清单。

**参考件只供照着手写到邮局领取的纸质表格，不用于打印提交。** 工具只做填表辅助，不提供法律建议；一切以 Questura、Poste Italiane 和 portaleimmigrazione.it 的最新要求为准。

网站：<https://tealsheep.github.io/permesso-modulo-tool/>（2026-11-10 上线）。隐私复查见 [隐私复查记录](docs/P3-PRIVACY-REVIEW.md)。

## 能做什么

- 按申请类型显示相关问题，标明纸质表格栏号及意大利文。
- 支持目前配置的 28 种类型，包括工作、自雇、学习、家庭、长期居留，以及第 27 条特殊工作续签的 14 个子类。不同类型支持的办理方式不同，以界面为准。
- 检查日期、必填项、字符、格子长度和税号等；检查不等于确认申请资格或官方认可。
- 在本机生成可查看、下载的 PDF：填写须知、表格、缴费单与常见材料清单。
- 按人保存和搜索多份申请，按人导出或删除资料，导入或导出 JSON 备份。
- 在每份申请里明确选择家属；配偶及年满 14 岁子女可另建关联申请，其他已保存人员不会自动成为家属。
- 可复制住址、电话等共同资料；切换工作、签证或收信地址选项会保留原答案，只把当前适用的答案写进参考件。

34 / 35（意大利或欧盟公民的家属）暂未支持。由 Sportello Unico 代填的首次申请、需要直接去 Questura 的情形会作提示；工具不替这些情形生成可提交文件。具体范围和待确认事项见 [需求说明](docs/SPEC.md) 与 [待确认问题](docs/OPEN_QUESTIONS.md)。

## 使用方法

1. 新建申请，选择给谁办理和申请类型。
2. 按证件及证明文件填写问卷，核对错误与提醒。
3. 生成参考件，逐页检查内容和缴费金额。
4. 照着参考件，使用黑色笔、大写字母、一格一个字填写邮局纸质表格。签名、日期及材料按实际办理要求准备。

## 隐私

应用没有账号、后台接口、分析统计、广告或追踪代码，不上传填写资料。资料保存在当前浏览器的本机存储中，PDF 也在浏览器内生成。

首次打开需要加载本站的静态代码、字体、表格、图片和 WASM；完成加载后，填写、查看材料、生成及下载参考件不再发起网络请求。刷新或重新打开页面仍需重新加载网站，不承诺关闭浏览器后仍能离线启动。网站托管平台仍会接收正常的静态文件访问请求。

备份文件包含你填写的个人资料，请保存在可信位置。清理浏览器存储、换设备或使用不同网址不会自动迁移资料；请先导出备份。在公共设备上使用后，可在“我的”清除本机资料。

## 免责声明与资料来源

这是填表辅助工具，**不提供法律建议，也不判断申请资格**。费用、材料及办理方式可能改变，各地要求也可能不同。一切以当地 Questura、[Poste Italiane](https://www.poste.it/) 和 [Portale Immigrazione](https://www.portaleimmigrazione.it/) 的最新要求为准；缴费前核对实际金额。

官方资料的来源和获取日期见 [official/SOURCES.md](official/SOURCES.md)。Modulo 2 使用按版式数据重画的版本，不放国徽；受限的官方 Modulo 2 PDF 不进入仓库或网站。本项目不是意大利政府、邮局或 Questura 的官方网站。

## 本地运行

需要 Node.js 22.13+（22 系列）、24.x 或 26+ 和 npm。建议使用 Node.js 24。

```sh
npm ci
npm run dev
```

打开终端显示的本机地址。开发环境始终使用根路径 `/`。

```sh
npm run rules:build       # 更新 docs/FIELD-RULES.md，随问卷规则一起审查
npm run check             # ESLint、单元测试、类型检查、生产构建与产物检查
npx playwright install chromium
npm run test:browser      # 开发环境交互与视觉回归（批准基准为 Windows Chromium）
npm run test:production   # 先完成 build；测试实际生产子路径与加载后零请求
npm run preview           # 本地预览 dist，不是生产服务器
```

开发不需要下载额外字体或官方表格；所需资源随仓库提供。生成文件位于被 Git 忽略的 `output/`，个人资料和真实申请备份不得加入仓库。

## 构建与 GitHub Pages

```sh
npm run build
npm run preview
```

默认生产路径为 `/permesso-modulo-tool/`。可用构建和预览进程的 `VITE_BASE_PATH` 环境变量配置其他本地目录路径，必须以 `/` 开头和结尾。例如部署到域名根目录时设置为 `/`。

```powershell
$env:VITE_BASE_PATH='/another-repo/'
npm run build
npm run test:production
npm run preview
```

macOS / Linux：

```sh
VITE_BASE_PATH=/another-repo/ npm run build
VITE_BASE_PATH=/another-repo/ npm run test:production
VITE_BASE_PATH=/another-repo/ npm run preview
```

[部署工作流](.github/workflows/pages.yml) 会安装锁定依赖、检查代码、构建并运行生产端到端测试。只有开启发布开关后，默认分支通过检查才部署；普通分支和拉取请求不会部署。工作流**仅上传 `dist/`**，构建检查禁止发布额外 PDF、受限官方 Modulo 2、已知私有参考图的原始副本或符号链接。

正式发布前需完成 [发布计划](docs/P3-PLAN.md) 中的人工验证及隐私清理。确定公开仓库后，在 GitHub 仓库 Settings → Pages 中选择 **GitHub Actions**；如需其他路径，设置仓库变量 `PAGES_BASE_PATH`。完成验证及清理后才将仓库变量 `PAGES_RELEASE_READY` 设为字符串 `true`；此后默认分支推送或在默认分支手动运行工作流会触发部署。默认关闭该开关遵循 D1 的完整验证后发布要求，并防止已确认的隐私问题尚未解决时误上线。需确保 GitHub Pages 已启用及 `github-pages` 环境保护规则正确。本仓库已于 2026-11-10 开启发布开关。

实现依据：[Vite 的 GitHub Pages 配置](https://vite.dev/guide/static-deploy#github-pages)、[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 贡献与许可

请使用明确虚构的姓名、证件、地址等测试资料。业务规则来源见 `data/` 和相关研究记录；不要凭猜测更改金额、材料或字段映射。界面遵循 [UI-DESIGN](docs/UI-DESIGN.md)，不得为消除失败而自行更新已批准截图；视觉变更需要先说明原因并获得用户确认。

原创代码和自行整理的数据以 **AGPL-3.0-only** 发布，见 [完整许可证](LICENSE) 与 [许可范围](LICENSE-SCOPE.md)。**`official/` 官方文件和样图不属于本项目的 AGPL 授权范围**，它们及其随网站分发的副本遵循原权利人的要求。字体使用 SIL OFL 1.1，其他依赖遵循各自许可；详见 [字体说明](public/fonts/NOTICE.md)。
