Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  config.railties_order = [:all, :main_app]

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resources :activities, only: [:create, :index, :show, :update, :destroy]
    resources :responses, only: [:create, :index, :show, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
