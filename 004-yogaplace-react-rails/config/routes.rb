Rails.application.routes.draw do
  get 'private/test'
  devise_for :users, 
    path: '', 
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
    resources :users, only: [:show, :edit, :update]

  namespace :api do
    namespace :v1 do
      resources :users
      get "dashboard/:id", to: "users#dashboard", as: :dashboard
      resources :yoga_categories
      resources :yoga_lessons do
        resources :yoga_classes, except: [:index, :delete]
      end
      resources :yoga_classes
      resources :bookings
      get '/users/:username' => 'users#user_page'
    end 
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  get '/about' => 'homepage#aboutpage'
  
end
