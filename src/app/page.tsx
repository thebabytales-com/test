"use client";

import { useState } from "react";

interface AnalysisResult {
  keyword: string;
  searchVolume: number;
  competition: string;
  trend: string;
  estimatedProfit: number;
}

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeKeyword = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    setResult(null);

    // 模拟 API 调用
    setTimeout(() => {
      setResult({
        keyword,
        searchVolume: Math.floor(Math.random() * 100000) + 10000,
        competition: ["低", "中", "高"][Math.floor(Math.random() * 3)],
        trend: ["上升 ↗", "稳定 →", "下降 ↘"][Math.floor(Math.random() * 3)],
        estimatedProfit: Math.floor(Math.random() * 50) + 10,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            PickAI
          </h1>
          <p className="text-xl text-gray-600">
            跨境电商智能选品工具 - 让选品更简单
          </p>
        </div>

        {/* 搜索框 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="输入产品关键词（如：wireless charger）"
              className="flex-1 px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
              onKeyPress={(e) => e.key === "Enter" && analyzeKeyword()}
            />
            <button
              onClick={analyzeKeyword}
              disabled={loading || !keyword.trim()}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              {loading ? "分析中..." : "开始分析"}
            </button>
          </div>

          {/* 热门关键词 */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">热门:</span>
            {["wireless charger", "phone case", "LED lights", "yoga mat"].map((kw) => (
              <button
                key={kw}
                onClick={() => setKeyword(kw)}
                className="px-3 py-1 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4 animate-bounce">⏳</div>
            <div className="text-xl text-gray-600">正在分析市场数据...</div>
          </div>
        )}

        {/* 结果展示 */}
        {result && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">分析结果</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 搜索量 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="text-sm text-blue-600 mb-2">月搜索量</div>
                <div className="text-4xl font-bold text-blue-700">
                  {result.searchVolume.toLocaleString()}
                </div>
              </div>

              {/* 竞争程度 */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="text-sm text-purple-600 mb-2">竞争程度</div>
                <div className="text-4xl font-bold text-purple-700">
                  {result.competition}
                </div>
              </div>

              {/* 趋势 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="text-sm text-green-600 mb-2">趋势</div>
                <div className="text-4xl font-bold text-green-700">
                  {result.trend}
                </div>
              </div>

              {/* 预估利润 */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <div className="text-sm text-orange-600 mb-2">预估利润率</div>
                <div className="text-4xl font-bold text-orange-700">
                  {result.estimatedProfit}%
                </div>
              </div>
            </div>

            {/* 建议 */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <div className="font-semibold text-gray-800 mb-3">💡 选品建议</div>
              <div className="text-gray-700 leading-relaxed">
                {result.competition === "高" && result.trend.includes("下降")
                  ? "⚠️ 该产品竞争激烈且趋势下降，建议谨慎进入。"
                  : result.competition === "低" && result.trend.includes("上升")
                  ? "✅ 该产品竞争低且趋势上升，值得考虑！"
                  : "📊 该产品有潜力，建议深入研究市场和竞品。"}
              </div>
            </div>

            {/* 行动按钮 */}
            <div className="mt-6 flex gap-4">
              <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                查看详细报告
              </button>
              <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                保存到收藏
              </button>
            </div>
          </div>
        )}

        {/* 功能特点 */}
        {!result && !loading && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">📊</div>
              <div className="font-semibold text-gray-800 mb-2">数据准确</div>
              <div className="text-sm text-gray-600">实时获取市场数据</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">⚡</div>
              <div className="font-semibold text-gray-800 mb-2">快速分析</div>
              <div className="text-sm text-gray-600">秒级响应速度</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">💰</div>
              <div className="font-semibold text-gray-800 mb-2">利润估算</div>
              <div className="text-sm text-gray-600">智能成本计算</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
