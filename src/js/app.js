document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const productInput = document.getElementById('productInput');
    const results = document.getElementById('results');

    analyzeBtn.addEventListener('click', analyzeProduct);

    function analyzeProduct() {
        const product = productInput.value.trim();
        
        if (!product) {
            alert('请输入产品名称');
            return;
        }

        // 显示加载动画
        results.innerHTML = `
            <div class="loading">
                <p>🤖 AI 正在分析 "${product}" 的市场机会...</p>
                <div class="spinner"></div>
            </div>
        `;

        // 模拟 AI 分析结果
        setTimeout(() => {
            displayResults(product);
        }, 1500);
    }

    function displayResults(product) {
        results.innerHTML = `
            <div class="result-card">
                <h2>📊 ${product} - 市场分析报告</h2>
                
                <div class="metrics">
                    <div class="metric">
                        <span class="label">市场需求</span>
                        <span class="value high">高</span>
                    </div>
                    <div class="metric">
                        <span class="label">竞争程度</span>
                        <span class="value medium">中等</span>
                    </div>
                    <div class="metric">
                        <span class="label">预估利润率</span>
                        <span class="value high">35-45%</span>
                    </div>
                    <div class="metric">
                        <span class="label">推荐指数</span>
                        <span class="value high">⭐⭐⭐⭐</span>
                    </div>
                </div>

                <div class="suggestions">
                    <h3>💡 AI 建议</h3>
                    <ul>
                        <li>目标定价: $19.99 - $29.99</li>
                        <li>最佳平台: Amazon + TikTok Shop</li>
                        <li>进货渠道: 1688 + 阿里巴巴</li>
                        <li>营销建议: 短视频展示 + KOL 合作</li>
                    </ul>
                </div>
            </div>
        `;
    }
});
