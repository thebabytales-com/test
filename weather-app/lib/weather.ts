import { WeatherData } from "@/types/weather";

const WTTR_BASE_URL = "https://wttr.in";

/**
 * 获取天气数据（从 wttr.in）
 * @param city 城市名称（英文或拼音）
 * @returns 天气数据
 */
export async function getWeather(city: string): Promise<WeatherData> {
  const url = `${WTTR_BASE_URL}/${encodeURIComponent(city)}?format=j1`;
  
  const response = await fetch(url, {
    headers: {
      "User-Agent": "curl/7.68.0", // wttr.in 需要
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.statusText}`);
  }

  return response.json();
}

/**
 * 获取天气图标 URL
 * @param iconCode 图标代码（如 "113.png"）
 * @returns 完整的图标 URL
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `https://cdn.weatherapi.com/weather/64x64/${iconCode}`;
}

/**
 * 获取中文化天气描述
 * @param condition 英文天气描述
 * @returns 中文描述
 */
export function translateCondition(condition: string): string {
  const translations: Record<string, string> = {
    "Sunny": "晴天",
    "Clear": "晴朗",
    "Partly cloudy": "多云",
    "Cloudy": "阴天",
    "Overcast": "阴天",
    "Mist": "薄雾",
    "Fog": "雾",
    "Rain": "雨",
    "Light rain": "小雨",
    "Moderate rain": "中雨",
    "Heavy rain": "大雨",
    "Snow": "雪",
    "Light snow": "小雪",
    "Moderate snow": "中雪",
    "Heavy snow": "大雪",
    "Thunderstorm": "雷阵雨",
    "Thundery outbreaks": "雷阵雨",
  };

  return translations[condition] || condition;
}

/**
 * 格式化日期
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const weekday = weekdays[date.getDay()];

  return `${month}/${day} ${weekday}`;
}

/**
 * 穿衣建议
 */
export function getClothingAdvice(tempC: number): string {
  if (tempC >= 30) {
    return "🩱 很热！穿短袖、短裤";
  } else if (tempC >= 25) {
    return "👕 热闹，穿 T 恤、薄裤";
  } else if (tempC >= 20) {
    return "👔 温暖，穿长袖、薄外套";
  } else if (tempC >= 15) {
    return "🧥 凉爽，穿外套、卫衣";
  } else if (tempC >= 10) {
    return "🧥 冷，穿厚外套、毛衣";
  } else if (tempC >= 5) {
    return "🧣 很冷，穿羽绒服、围巾";
  } else {
    return "🧤 极冷，全副武装！";
  }
}
