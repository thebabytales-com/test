import { NextRequest, NextResponse } from "next/server";
import { getWeather } from "@/lib/weather";

export async function GET(
  request: NextRequest,
  { params }: { params: { city: string } }
) {
  try {
    const city = decodeURIComponent(params.city);
    const weather = await getWeather(city);

    // 缓存 10 分钟
    return NextResponse.json(weather, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
