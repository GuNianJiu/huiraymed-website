---
name: "replace-site-image"
description: "Replace/add an image on the HuirayMed website (cert thumbnails, map, product images): pull image from clipboard or given path, compress to JPEG via System.Drawing, save with ASCII filename into images/, update HTML reference, bump style.css/script.js cache version, verify through local server. Invoke when user asks to 替换/更换/添加 网站图片、贴图、截图、证件缩略图, or says '好了' after being asked to copy an image."
---

# 网站图片替换标准流程（汇睿生物官网）

适用于将用户提供的截图/扫描件替换或新增到网站（资质证书缩略图、地图贴图、产品图等）。

## 前置事实（必须遵守）

- 网站根目录：`c:\Users\17873\Documents\trae_projects\huiraymed-website`
- 所有网站图片必须放在 `images/` 目录，文件名用 **ASCII/拼音**（中文路径在本地服务器会 404）
- `images/` 目录必须随 Git 提交（Cloudflare Pages 部署依赖）；`images/_originals/` 与 `_sources/` 已在 .gitignore，原始大图放那里
- 缓存绕过：每次改了 CSS 或 JS，必须同步提升 `index.html` 和 `products.html` 中的版本号
  - `<link rel="stylesheet" href="style.css?v=pN">` 与 `<script src="script.js?v=pN">` 两个页面都要改，保持一致
- 聊天消息里粘贴的图片无法直接落盘，需让用户 Ctrl+C 复制后从**系统剪贴板**读取

## 执行步骤

### 1. 获取图片

优先从剪贴板（用户说"好了"或已 Ctrl+C）：

```powershell
Add-Type -AssemblyName System.Windows.Forms
$img = [System.Windows.Forms.Clipboard]::GetImage()
if ($img) { $img.Save('<dest>.png', [System.Drawing.Imaging.ImageFormat]::Png); "SAVED $($img.Width)x$($img.Height)" } else { 'NO_IMAGE' }
```

- 保存为临时 PNG 后，**必须用 Read 工具查看图片内容**，确认是用户要的图（剪贴板可能是别的截图，如网站本身截图）
- 若不是目标图，请用户重新复制目标图后回复"好了"，不要猜测、不要用 text_to_image 占位

### 2. 压缩为 JPEG（System.Drawing，勿依赖 cwebp/ImageMagick）

```powershell
Add-Type -AssemblyName System.Drawing
$src='<临时png路径>'; $dst='images\<ascii-name>.jpg'
$img=[System.Drawing.Image]::FromFile($src)
$w=1600; $h=[int]($img.Height*($w/$img.Width))   # 证书/地图类用1600宽；产品图可更小
$bmp=New-Object System.Drawing.Bitmap $w,$h
$g=[System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::White)            # JPEG无透明通道，必须白底
$g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($img,0,0,$w,$h); $g.Dispose()
$enc=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()|?{$_.MimeType -eq 'image/jpeg'}
$ep=New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality),([long[]]@(82))
$bmp.Save($dst,$enc,$ep); $bmp.Dispose(); $img.Dispose()
```

注意：`EncoderParameter` 第二参数必须传数组 `([long[]]@(82))`，直接传 `[long]82` 会报 "Parameter is not valid"。目标体积 < 300KB。压缩后删除临时 PNG。

### 3. 修改引用

- 替换 `<img src>` 或 `data-image`；新增缩略图时给 `alt` 加 `data-i18n-attr="alt:<key>"` 并在 script.js 中英文字典补 `<key>` 翻译
- 展示整份文档（证书、地图截图）：CSS 用 `object-fit: contain; background:#fff; padding:8px`（完整不裁切）
- 展示照片类（产品场景图）：用 `object-fit: cover`
- 顺手清理被替换掉的废弃代码（如无用 iframe、emoji 占位块）

### 4. 提升版本号

- 改了 CSS → style.css `?v=pN+1`；改了 JS → script.js `?v=pN+1`；两个 HTML 文件都改
- ⚠️ 编辑后警惕：用户在 IDE 中打开旧缓冲可能覆盖磁盘文件。关键编辑完成后，用 Grep/Read **复查**改动仍在（尤其 `<img>` 标签和版本号），被回退就重新应用

### 5. 本地服务器验证

- 服务器脚本：`C:\Users\17873\AppData\Local\Temp\huiray-server.ps1`（.NET HttpListener，端口 8080），未运行则后台启动：
  `Start-Process powershell -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File','<脚本路径>' -WindowStyle Hidden`
- 用 `Invoke-WebRequest` 验证：图片 HTTP 200 且体积正确；HTML 中新引用计数符合预期、旧内容计数为 0
- PowerShell 终端会有 profile 加载红字报错（ExecutionPolicy），属噪音可忽略；命令本身的输出才有效

## 易踩坑清单

- 剪贴板取图后不看内容直接用 → 用过错误截图（曾取到网站截图而非地图）
- JPEG 质量参数传标量 → Save 抛异常
- 中文文件名 → 线上/本地 404
- 只改一个 HTML 的版本号 → 另一个页面缓存旧资源
- IDE 旧缓冲覆盖 → 改完必须 Grep 复查
- 浏览器子代理（browser_use）在 WebView 超时时会给静态分析结论且可能自相矛盾；以 Invoke-WebRequest 拉取的实际 HTML/图片字节为准
