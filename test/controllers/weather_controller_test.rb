require "test_helper"

class WeatherControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get weather_index_url
    assert_response :success
  end

  test "should get fetch_weather" do
    get weather_fetch_weather_url
    assert_response :success
  end
end
