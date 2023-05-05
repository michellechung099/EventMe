Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
      # resources :tickets, only: [:index, :show, :create, :update, :delete], shallow: true
    # end

    resource :session, only: [:show, :create, :destroy]
    resources :events, only: [:create, :update, :destroy, :index, :show] do
      resources :tickets, only: [:index, :show, :create, :update, :destroy]
    end
    get 'user/events/user_events', to: 'events#user_events'
    get '/api/tickets', to: 'tickets#index'
    delete '/events/:id', to: 'events#destroy'
  end

  get '*path', to: "static_pages#frontend_index", constraints: -> (req) {!req.xhr? && req.format.html?}
  # get '*path', to: "static_pages#frontend_index", constraints: ->(req) {
  #   req.path.exclude? 'rails/active_storage'
  # }
end
