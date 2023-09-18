class WeatherController < ApplicationController
    include HTTParty

    def index

    end

    def show
        # city = params[:city]
    end

    def fetch_weather
      city = params[:city]
      api_key = ENV['OPENWEATHER_API_KEY']  
      url = "https://api.openweathermap.org/data/2.5/weather?q=#{city}&appid=#{api_key}"
      response = HTTParty.get(url)
  
      if response.code == 200
        weather_data = JSON.parse(response.body)
        render json: weather_data # Use weather_data here
      else
        error_message = 'Failed to fetch weather data.'
        render json: { error: error_message }, status: :unprocessable_entity
      end
    end
end
  