# 🧪 天气 App - 完整测试计划

## 📊 测试概览

| 测试类型 | 覆盖范围 | 优先级 | 工具 |
|---------|---------|--------|------|
| 烟雾测试 | 核心功能 | P0 | 手动 |
| 单元测试 | 函数/组件 | P1 | Jest |
| 集成测试 | API + 组件 | P1 | Jest + RTL |
| E2E 测试 | 用户流程 | P2 | Playwright |
| 边界测试 | 异常场景 | P0 | 手动 + Jest |
| 性能测试 | 加载速度 | P1 | Lighthouse |

---

## 🔥 阶段 1: 烟雾测试 (Smoke Test) - P0

### 目标
在 30 分钟内验证核心功能是否可用

### 测试用例

#### TC-SM-001: API 可用性
```
步骤:
1. 访问 https://wttr.in/Beijing?format=j1
2. 检查返回 JSON 格式

预期:
✅ 返回状态码 200
✅ 包含 current 条件
✅ 包含 location 信息
✅ 数据结构正确

实际结果: [待填写]
状态: [PASS/FAIL]
```

#### TC-SM-002: 城市搜索功能
```
步骤:
1. 打开应用
2. 搜索 "Beijing"
3. 观察结果显示

预期:
✅ 显示北京天气
✅ 温度合理 (-50 ~ 60°C)
✅ 天气描述正确

实际结果: [待填写]
状态: [PASS/FAIL]
```

#### TC-SM-003: 当前天气显示
```
步骤:
1. 搜索任意城市
2. 检查天气卡片

预期:
✅ 显示温度
✅ 显示天气图标
✅ 显示湿度、风速
✅ 显示穿衣建议

实际结果: [待填写]
状态: [PASS/FAIL]
```

#### TC-SM-004: 3天预报
```
步骤:
1. 搜索城市
2. 检查预报组件

预期:
✅ 显示未来 3 天
✅ 每天有最高/最低温度
✅ 每天有天气图标

实际结果: [待填写]
状态: [PASS/FAIL]
```

---

## 🎯 阶段 2: 单元测试 - P1

### lib/weather.ts 函数测试

#### TC-UNIT-001: translateCondition()
```typescript
describe('translateCondition', () => {
  test('翻译晴天', () => {
    expect(translateCondition('Sunny')).toBe('晴天');
  });

  test('翻译小雨', () => {
    expect(translateCondition('Light rain')).toBe('小雨');
  });

  test('未知天气返回原文', () => {
    expect(translateCondition('Unknown')).toBe('Unknown');
  });
});
```

#### TC-UNIT-002: getClothingAdvice()
```typescript
describe('getClothingAdvice', () => {
  test('30°C 建议', () => {
    expect(getClothingAdvice(30)).toContain('短袖');
  });

  test('10°C 建议', () => {
    expect(getClothingAdvice(10)).toContain('厚外套');
  });

  test('0°C 建议', () => {
    expect(getClothingAdvice(0)).toContain('极冷');
  });
});
```

#### TC-UNIT-003: formatDate()
```typescript
describe('formatDate', () => {
  test('格式化日期', () => {
    const result = formatDate('2026-03-03');
    expect(result).toMatch(/\d+\/\d+ 周[一二三四五六日]/);
  });
});
```

---

### 组件测试

#### TC-COMP-001: SearchBar 组件
```typescript
describe('SearchBar', () => {
  test('渲染搜索框', () => {
    render(<SearchBar onSearch={jest.fn()} isLoading={false} />);
    expect(screen.getByPlaceholderText('输入城市')).toBeInTheDocument();
  });

  test('输入并搜索', async () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('输入城市');
    await userEvent.type(input, 'Beijing');
    await userEvent.click(screen.getByText('搜索'));

    expect(mockSearch).toHaveBeenCalledWith('Beijing');
  });

  test('加载时禁用', () => {
    render(<SearchBar onSearch={jest.fn()} isLoading={true} />);
    expect(screen.getByText('搜索')).toBeDisabled();
  });
});
```

#### TC-COMP-002: WeatherCard 组件
```typescript
describe('WeatherCard', () => {
  const mockWeather: WeatherData = {
    location: { name: 'Beijing', country: 'China', /* ... */ },
    current: { temp_c: 25, condition: { text: 'Sunny', icon: '' }, /* ... */ }
  };

  test('显示城市名', () => {
    render(<WeatherCard weather={mockWeather} />);
    expect(screen.getByText('Beijing')).toBeInTheDocument();
  });

  test('显示温度', () => {
    render(<WeatherCard weather={mockWeather} />);
    expect(screen.getByText('25°')).toBeInTheDocument();
  });
});
```

---

## 🚨 阶段 3: 边界测试 - P0

### TC-EDGE-001: 空输入
```
步骤:
1. 搜索框留空
2. 点击搜索

预期:
✅ 不发送请求
✅ 或显示"请输入城市名"

当前状态: [待测试]
```

### TC-EDGE-002: 特殊字符
```
测试输入:
- "<script>alert(1)</script>"
- "../../etc/passwd"
- "'; DROP TABLE users;--"
- "🌧️⛈️🌨️"

预期:
✅ 正确转义
✅ 不导致 XSS
✅ 或显示错误提示

当前状态: [待测试]
```

### TC-EDGE-003: 不存在的城市
```
步骤:
1. 搜索 "ThisCityDoesNotExist12345"
2. 观察结果

预期:
✅ 显示友好错误提示
✅ 不崩溃
✅ 可以重新搜索

当前状态: [待测试]
```

### TC-EDGE-004: 超长输入
```
步骤:
1. 输入 1000 个字符
2. 点击搜索

预期:
✅ 限制输入长度
✅ 或显示错误提示

当前状态: [待测试]
```

### TC-EDGE-005: 网络错误
```
步骤:
1. 断开网络
2. 搜索城市

预期:
✅ 显示"网络错误"
✅ 提供重试按钮
✅ 不崩溃

当前状态: [待测试]
```

### TC-EDGE-006: API 超时
```
步骤:
1. 模拟 API 30秒超时
2. 观察结果

预期:
✅ 显示"请求超时"
✅ 可以重试

当前状态: [待测试]
```

---

## 🔄 阶段 4: 集成测试 - P1

### TC-INT-001: 搜索流程
```typescript
describe('搜索流程', () => {
  test('完整搜索', async () => {
    // 模拟 API 返回
    mockFetch.mockResolvedValue({
      json: async () => mockWeatherData
    });

    render(<Home />);

    // 输入城市
    await userEvent.type(screen.getByPlaceholderText('输入城市'), 'Beijing');
    await userEvent.click(screen.getByText('搜索'));

    // 等待结果
    await waitFor(() => {
      expect(screen.getByText('Beijing')).toBeInTheDocument();
    });
  });
});
```

### TC-INT-002: 错误处理
```typescript
describe('错误处理', () => {
  test('API 失败显示错误', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<Home />);

    await userEvent.type(screen.getByPlaceholderText('输入城市'), 'InvalidCity');
    await userEvent.click(screen.getByText('搜索'));

    await waitFor(() => {
      expect(screen.getByText(/获取天气失败/)).toBeInTheDocument();
    });
  });
});
```

---

## 🌐 阶段 5: E2E 测试 - P2

### TC-E2E-001: 用户完整流程
```typescript
test('用户查询天气', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // 搜索城市
  await page.fill('input[placeholder="输入城市"]', 'Beijing');
  await page.click('button:has-text("搜索")');

  // 验证结果
  await expect(page.locator('text=Beijing')).toBeVisible();
  await expect(page.locator('text=°')).toBeVisible();
});
```

---

## ⚡ 阶段 6: 性能测试 - P1

### TC-PERF-001: 首屏加载
```
目标:
✅ LCP < 2.5秒
✅ FID < 100ms
✅ CLS < 0.1

工具:
- Google Lighthouse
- WebPageTest

当前: [待测试]
```

### TC-PERF-002: API 响应时间
```
目标:
✅ P50 < 500ms
✅ P95 < 1.5s
✅ P99 < 3s

工具:
- API 监控
- 日志分析

当前: [待测试]
```

---

## 🎨 阶段 7: 兼容性测试 - P2

### TC-COMPAT-001: 浏览器兼容性
```
测试浏览器:
✅ Chrome (最新)
✅ Firefox (最新)
✅ Safari (最新)
✅ Edge (最新)
✅ Mobile Safari (iOS)
✅ Chrome Mobile (Android)
```

### TC-COMPAT-002: 屏幕尺寸
```
测试尺寸:
✅ 1920x1080 (桌面)
✅ 768x1024 (平板)
✅ 375x667 (手机)
✅ 320x568 (小屏手机)
```

---

## 📊 测试执行计划

### Week 1: 3月3-7日

| 日期 | 测试类型 | 测试用例数 | 负责人 |
|------|---------|-----------|--------|
| 周一 | 烟雾测试 | 4 | Tester |
| 周二 | 边界测试 | 6 | Tester |
| 周三 | 单元测试 | 8 | Developer |
| 周四 | 集成测试 | 2 | Developer |
| 周五 | Bug 修复 | - | All |

### Week 2: 3月10-14日

| 日期 | 测试类型 | 测试用例数 | 负责人 |
|------|---------|-----------|--------|
| 周一 | E2E 测试 | 5+ | Tester |
| 周二 | 性能测试 | 2 | Tester |
| 周三 | 兼容性测试 | 8 | Tester |
| 周四 | 回归测试 | 全部 | All |
| 周五 | 发布准备 | - | All |

---

## 📝 测试报告模板

### 日期: YYYY-MM-DD

| 用例ID | 用例名称 | 优先级 | 状态 | Bug ID | 备注 |
|--------|---------|--------|------|--------|------|
| TC-SM-001 | API 可用性 | P0 | ✅ PASS | - | - |
| TC-EDGE-003 | 不存在的城市 | P0 | ❌ FAIL | BUG-001 | 需要添加错误提示 |

**总结**:
- 总用例数: 35
- 通过: 30
- 失败: 5
- 阻塞: 0

**通过率**: 85.7%

---

## 🐛 Bug 跟踪

### BUG-001: 不存在的城市没有友好提示
```
严重程度: P1
状态: Open
负责人: [待分配]
描述: 搜索不存在的城市时，显示通用错误，不够友好
复现步骤:
1. 搜索 "InvalidCity123"
2. 观察错误提示

预期: "找不到该城市，请检查拼写"
实际: "获取天气失败"
```

---

## 🎯 测试完成标准

- ✅ 所有 P0 用例通过
- ✅ P1 用例通过率 > 90%
- ✅ 阻塞 Bug 全部修复
- ✅ 性能指标达标
- ✅ 无安全漏洞

---

## 📚 测试资源

### 工具
- Jest - 单元测试
- React Testing Library - 组件测试
- Playwright - E2E 测试
- Lighthouse - 性能测试
- MSW - Mock Service Worker

### 文档
- [Jest 文档](https://jestjs.io/)
- [RTL 文档](https://testing-library.com/)
- [Playwright 文档](https://playwright.dev/)

---

**下一步**: 执行烟雾测试，验证核心功能！🚀
