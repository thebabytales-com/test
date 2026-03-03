export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🤖 PickAI
          </h1>
          <p className="text-xl text-gray-600">
            智能选品助手 - AI 驱动的跨境电商选品工具
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">AI 选品推荐</h3>
            <p className="text-gray-600">基于市场数据的智能产品推荐</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">市场趋势分析</h3>
            <p className="text-gray-600">实时追踪热门产品和趋势</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">利润计算器</h3>
            <p className="text-gray-600">自动计算成本、利润和 ROI</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-purple-600 text-white px-8 py-4 rounded-xl inline-block">
            开发中... 敬请期待！
          </div>
        </div>
      </div>
    </main>
  );
}
