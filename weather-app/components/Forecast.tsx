import { WeatherData } from "@/types/weather";
import { translateCondition, formatDate } from "@/lib/weather";

interface ForecastProps {
  weather: WeatherData;
}

export default function Forecast({ weather }: ForecastProps) {
  if (!weather.forecast) return null;

  const forecastDays = weather.forecast.forecastday;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">未来预报</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecastDays.map((day, index) => {
          const maxTemp = Math.round(day.day.maxtemp_c);
          const minTemp = Math.round(day.day.mintemp_c);
          const condition = translateCondition(day.day.condition.text);
          const isToday = index === 0;

          return (
            <div
              key={day.date}
              className={`p-4 rounded-2xl ${
                isToday
                  ? "bg-blue-50 border-2 border-blue-200"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-gray-800">
                    {isToday ? "今天" : formatDate(day.date)}
                  </div>
                  <div className="text-sm text-gray-500">{condition}</div>
                </div>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={condition}
                  className="w-12 h-12"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-gray-800">
                  {maxTemp}°
                </div>
                <div className="text-lg text-gray-500">{minTemp}°</div>
              </div>

              <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                <span>💧 {day.day.daily_chance_of_rain}%</span>
                <span>💨 {day.day.maxwind_kph} km/h</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
