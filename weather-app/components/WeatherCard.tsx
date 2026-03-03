import { WeatherData } from "@/types/weather";
import { translateCondition, getClothingAdvice } from "@/lib/weather";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const { location, current } = weather;
  const condition = translateCondition(current.condition.text);
  const feelsLikeC = Math.round(current.feelslike_c);
  const tempC = Math.round(current.temp_c);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-3xl p-8 shadow-xl">
      {/* 位置 */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">{location.name}</h2>
        <p className="text-blue-100">{location.country}</p>
      </div>

      {/* 当前天气 */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-7xl font-light mb-2">{tempC}°</div>
          <div className="text-xl text-blue-100">{condition}</div>
        </div>
        <div className="text-center">
          <img
            src={`https:${current.condition.icon}`}
            alt={condition}
            className="w-24 h-24 mx-auto"
          />
        </div>
      </div>

      {/* 详情 */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-white/20 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">体感温度</div>
          <div className="text-2xl font-semibold">{feelsLikeC}°</div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">湿度</div>
          <div className="text-2xl font-semibold">{current.humidity}%</div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">风速</div>
          <div className="text-2xl font-semibold">{current.wind_kph} km/h</div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">紫外线</div>
          <div className="text-2xl font-semibold">{current.uv_index}</div>
        </div>
      </div>

      {/* 穿衣建议 */}
      <div className="mt-6 bg-white/20 backdrop-blur rounded-xl p-4">
        <div className="text-sm text-blue-100 mb-2">💡 穿衣建议</div>
        <div className="font-medium">{getClothingAdvice(tempC)}</div>
      </div>
    </div>
  );
}
