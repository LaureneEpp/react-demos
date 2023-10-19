Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :yoga_lessons do
        resources :yoga_classes, except: [:index, :delete]
      end
      resources :yoga_classes, only: [:index, :delete]
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
