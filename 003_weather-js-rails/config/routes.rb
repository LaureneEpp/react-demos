Rails.application.routes.draw do
  root 'weather#index'
  get '/weather', to: 'weather#fetch_weather'
  get '/location', to: 'weather#fetch_location'
end