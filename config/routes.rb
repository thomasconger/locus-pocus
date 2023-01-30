Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  #Need to create route to clear all responses for a given activity

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    delete 'activities/reset/(/:id)', to: 'activities#reset'
    resources :activities, only: [:create, :index, :show, :update, :destroy]
    resources :responses, only: [:create, :index, :show, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
