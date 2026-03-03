# GitHub Actions + Cloudflare Pages 部署指南

## 前置要求

### 1. Cloudflare 账号
- 注册 Cloudflare: https://dash.cloudflare.com/
- 获取 Account ID

### 2. GitHub 仓库
- 仓库地址: https://github.com/thebabytales-com/test

---

## 📝 配置步骤

### Step 1: 获取 Cloudflare API Token

1. 登录 Cloudflare Dashboard
2. 进入: **My Profile** → **API Tokens**
3. 点击 **Create Token**
4. 选择模板: **Edit Cloudflare Workers**
5. 配置权限:
   - Account → Cloudflare Pages → Edit
   - Account Resources → Include → Your Account
6. 点击 **Continue to summary** → **Create Token**
7. **复制 Token** (只显示一次！)

### Step 2: 获取 Cloudflare Account ID

1. 登录 Cloudflare Dashboard
2. 在右侧找到 **Account ID**
3. 点击复制

### Step 3: 配置 GitHub Secrets

1. 进入 GitHub 仓库: https://github.com/thebabytales-com/test/settings/secrets/actions
2. 添加以下 Secrets:

| Secret 名称 | 值 |
|------------|-----|
| `CLOUDFLARE_API_TOKEN` | Step 1 复制的 API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Step 2 复制的 Account ID |

### Step 4: 推送代码

```bash
cd /root/.openclaw/workspace-architect
git add .
git commit -m "Add Cloudflare deployment"
git push origin main
```

### Step 5: 查看部署

1. 进入 GitHub Actions: https://github.com/thebabytales-com/test/actions
2. 查看 "Deploy to Cloudflare Pages" workflow
3. 等待部署完成 (~2-3 分钟)

---

## 🎯 Next.js 特定配置

由于 Next.js 需要特殊处理，有两种方式:

### 方式 1: 静态导出 (推荐用于简单项目)

在 `next.config.js` 添加:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### 方式 2: 使用 @cloudflare/next-on-pages (推荐)

```bash
npm install --save-dev @cloudflare/next-on-pages
```

修改 `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "pages:build": "npx @cloudflare/next-on-pages"
  }
}
```

---

## 📊 Workflow 说明

### 当前配置 (.github/workflows/deploy-cloudflare.yml)

```yaml
触发条件:
  - push 到 main 分支
  - 手动触发 (workflow_dispatch)

部署流程:
  1. 检出代码
  2. 安装 Node.js 20
  3. 安装依赖 (npm ci)
  4. 构建 (npm run build)
  5. 部署到 Cloudflare Pages
```

---

## 🔧 故障排查

### 问题 1: Build 失败
**原因**: 依赖安装失败
**解决**: 检查 package.json 和 lockfile

### 问题 2: 部署失败
**原因**: API Token 或 Account ID 错误
**解决**: 重新生成 Token 并更新 Secrets

### 问题 3: 页面空白
**原因**: Next.js 输出配置问题
**解决**: 使用 `@cloudflare/next-on-pages`

---

## 🚀 快速开始命令

```bash
# 1. 配置 Next.js 为静态导出
cd pickai
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
EOF

# 2. 重新构建测试
npm run build

# 3. 查看输出
ls -la out/
```

---

老板，配置已经准备好了！需要我执行哪一步？🐴
