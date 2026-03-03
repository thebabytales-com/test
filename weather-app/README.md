# 🌤️ Weather App MVP

一个简单实用的天气应用，使用免费 API（无需 API key）

## 技术栈
- **前端**: React + Next.js
- **样式**: TailwindCSS
- **数据源**: wttr.in（免费，无需注册）
- **部署**: Vercel/Netlify（一键部署）

## 功能
- ✅ 当前天气显示
- ✅ 3天天气预报
- ✅ 城市搜索
- ✅ 响应式设计
- 📦 离线缓存（开发中）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 项目结构

```
weather-app/
├── app/
│   ├── page.tsx          # 主页面
│   ├── layout.tsx        # 布局
│   └── api/
│       └── weather/
│           └── [city].ts # 天气 API 路由
├── components/
│   ├── WeatherCard.tsx   # 天气卡片
│   ├── SearchBar.tsx     # 搜索框
│   └── Forecast.tsx      # 预报组件
├── lib/
│   └── weather.ts        # 天气数据处理
└── types/
    └── weather.ts        # 类型定义
```

## API 示例

```bash
# 当前天气
curl "wttr.in/Beijing?format=j1"

# 3天预报
curl "wttr.in/Beijing?format=j1"
```

## TODO
- [ ] PWA 支持
- [ ] 多城市管理
- [ ] 天气图表
- [ ] 穿衣建议
- [ ] 推送通知

---

**开始时间**: 2026-03-03
**状态**: 🚧 开发中
