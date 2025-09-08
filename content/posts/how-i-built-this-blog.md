+++
title = '如何构建这个Hugo博客：从零到完整功能'
date = 2025-09-08T22:43:07+08:00
draft = false
tags = ['Hugo']
+++

# 如何构建这个Hugo博客：从零到完整功能

在这篇文章中，我将详细记录构建这个Hugo博客的完整过程，包括主题选择、功能定制和各种优化实现。

## 1. 项目初始化

### 创建Hugo站点

首先使用Hugo命令创建新的站点：

```bash
hugo new site bmio
cd bmio
```

### 选择主题

经过调研，我选择了**Shibui**主题，这是一个极简主义的Hugo主题，具有以下特点：

- 极简设计，遵循日式美学
- 终端风格的导航
- 清晰的等宽字体排版
- 温暖的纸质色彩方案
- 零JavaScript依赖（纯CSS解决方案）
- 高度可定制的CSS变量
- 移动端响应式布局

```bash
git submodule add https://github.com/ntk148v/shibui.git themes/shibui
```

## 2. 基础配置

### hugo.toml配置

```toml
baseURL = 'https://example.org/'
languageCode = 'zh-cn'
title = 'bmio'
theme = 'shibui'

[markup.tableOfContents]
startLevel = 7
endLevel = 7

[params]
author = "Your Name"
email = "your.email@example.com"

[menu]
  [[menu.main]]
    name = "Posts"
    url = "/posts/"
    weight = 1
  [[menu.main]]
    name = "Tags"
    url = "/tags/"
    weight = 2
  [[menu.main]]
    name = "About"
    url = "/about/"
    weight = 3
```

## 3. 功能定制与优化

### 3.1 禁用Table of Contents

原主题默认显示文章目录，为了保持页面简洁，我采用了两种方法：

**方法一：配置禁用**
```toml
[markup.tableOfContents]
startLevel = 7
endLevel = 7
```

**方法二：模板覆盖**
创建自定义的`layouts/_default/single.html`，注释掉TOC相关代码：

```html
{{/* Table of Contents: render only when the page has one */}}
{{/* 
{{ if .TableOfContents }}
  <nav class="toc">
    <strong>Table of contents</strong>
    <div class="toc-content">
      {{ .TableOfContents }}
    </div>
  </nav>
{{ end }}
*/}}
```

### 3.2 添加代码块复制功能

这是一个重要的用户体验改进，让读者可以轻松复制代码示例。

**CSS样式 (`assets/css/custom.css`)**
```css
/* 代码块复制按钮样式 */
.code-block-wrapper {
  position: relative;
  margin: var(--spacing-base) 0;
}

.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 4px 8px;
  font-size: var(--font-size-small);
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
}

.code-block-wrapper:hover .copy-button {
  opacity: 1;
  visibility: visible;
}
```

**JavaScript功能 (`assets/js/copy-code.js`)**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(function(codeBlock) {
    // 创建包装器和复制按钮
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    
    // 实现复制功能
    copyButton.addEventListener('click', function() {
      const codeText = codeBlock.textContent;
      navigator.clipboard.writeText(codeText).then(function() {
        showCopySuccess(copyButton);
      });
    });
  });
});
```

**模板集成 (`layouts/_partials/head.html`)**
```html
{{/* 引入自定义CSS */}}
{{- with resources.Get "css/custom.css" }}
  <link rel="stylesheet" href="{{ .RelPermalink }}">
{{- end }}

{{/* 引入自定义JavaScript */}}
{{- with resources.Get "js/copy-code.js" }}
  <script src="{{ .RelPermalink }}"></script>
{{- end }}
```

### 3.3 菜单结构优化

在导航菜单中添加了Tags页面，形成完整的内容分类体系：

- **Posts**: 所有文章列表
- **Tags**: 标签分类页面
- **About**: 关于页面

## 4. 内容创建

### 创建示例文章

```bash
hugo new content posts/hello-world.md
hugo new content posts/code-examples.md
```

每篇文章都包含适当的Front Matter：

```yaml
+++
title = '文章标题'
date = 2025-01-08T20:00:00+08:00
draft = false
tags = ['标签1', '标签2']
+++
```

## 5. 开发与部署

### 本地开发

```bash
hugo server --buildDrafts
```

访问 `http://localhost:1313` 进行实时预览。

### 项目结构

```
bmio/
├── assets/
│   ├── css/
│   │   └── custom.css      # 自定义样式
│   └── js/
│       └── copy-code.js    # 复制功能
├── content/
│   ├── posts/              # 博客文章
│   └── about.md           # 关于页面
├── layouts/
│   ├── _default/
│   │   └── single.html    # 自定义单页模板
│   └── _partials/
│       └── head.html      # 自定义头部模板
├── themes/shibui/         # 主题文件
└── hugo.toml             # 配置文件
```

## 6. 技术特色

### 响应式设计
- 移动端友好的复制按钮布局
- 自适应的导航菜单
- 优化的阅读体验

### 性能优化
- 极简的CSS和JavaScript
- 资源压缩和指纹识别
- 快速的页面加载

### 用户体验
- 悬停显示的复制按钮
- 清晰的视觉反馈
- 简洁的导航结构

## 7. 总结

这个Hugo博客的构建过程展示了如何：

1. **选择合适的主题**：Shibui主题的极简设计完美符合需求
2. **功能定制**：通过覆盖模板和添加自定义资源实现个性化功能
3. **用户体验优化**：代码复制功能大大提升了技术博客的实用性
4. **结构化内容**：合理的菜单和标签系统便于内容管理

整个过程体现了Hugo的灵活性和可扩展性，让我们能够在保持简洁的同时添加实用功能。

---

*这篇文章本身就是使用上述方法构建的博客系统创建的，你现在看到的复制按钮就是我们实现的功能！*
