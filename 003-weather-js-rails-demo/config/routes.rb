Rails.application.routes.draw do
# config/routes.rb
root 'weather#index'
get '/weather', to: 'weather#fetch_weather'

end