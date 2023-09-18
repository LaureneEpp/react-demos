class WeatherController < ApplicationController
  include HTTParty

  def index
  end

  def fetch_weather
    city = params[:city]
    api_key = 'a6cbbf1ad1acfdc008e9c17f33b0f05a'

    url = "https://api.openweathermap.org/data/2.5/weather?q=#{city}&appid=#{api_key}"
    response = HTTParty.get(url)

    if response.code == 200
      weather_data = JSON.parse(response.body)
      render json: weather_data
    else
      # error_message = 'Fail to fetch weather data !'
      error_message = ''
      render json: { error: error_message }, status: :unprocessable_entity
    end
  end
end