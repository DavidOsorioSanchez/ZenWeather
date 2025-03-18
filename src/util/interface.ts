export interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
        time: string;
        interval: string;
        is_day: string;
        showers: string;
        cloud_cover: string;
        wind_speed_10m: string;
        snowfall: string;
        wind_direction_10m: string;
        rain: string;
        weather_code: string;
        wind_gusts_10m: string;
    };
    current: {
        time: string;
        interval: number;
        is_day: number;
        showers: number;
        cloud_cover: number;
        wind_speed_10m: number;
        snowfall: number;
        wind_direction_10m: number;
        rain: number;
        weather_code: number;
        wind_gusts_10m: number;
    };
    hourly_units: {
        time: string;
        visibility: string;
        temperature_2m: string;
    };
    hourly: {
        time: string[];
        visibility: number[];
        temperature_2m: number[];
    };
    daily_units: {
        time: string;
        daylight_duration: string;
        wind_direction_10m_dominant: string;
        rain_sum: string;
    };
    daily: {
        time: string[];
        daylight_duration: number[];
        wind_direction_10m_dominant: number[];
        rain_sum: number[];
    };
}