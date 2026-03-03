"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import Forecast from "@/components/Forecast";
import { WeatherData } from "@/types/weather";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/weather/${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        throw new Error("获取天气失败");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🌤️ 天气 App
          </h1>
          <p className="text-gray-600">实时天气，精准预报</p>
        </div>

        {/* 搜索框 */}
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        {/* 加载状态 */}
        {isLoading && (
          <div className="text-center text-gray-600 py-12">
            <div className="text-4xl mb-4">⏳</div>
            <div>正在获取天气数据...</div>
          </div>
        )}

        {/* 天气卡片 */}
        {weather && !isLoading && (
          <div className="space-y-6">
            <WeatherCard weather={weather} />
            <Forecast weather={weather} />
          </div>
        )}

        {/* 初始提示 */}
        {!weather && !isLoading && !error && (
          <div className="text-center text-gray-500 py-12">
            <div className="text-6xl mb-4">🌍</div>
            <div className="text-xl mb-2">输入城市名称开始查询</div>
            <div className="text-sm">支持中文拼音或英文城市名</div>
          </div>
        )}
      </div>
    </main>
  );
}
