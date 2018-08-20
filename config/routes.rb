Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # get '/listings/indexes', to: 'listings#listing_indexes'

  resources :users, only: [:show] do
    resources :listings, to: 'users#listings'
  end

  resources :listings do
    resources :categories
    resources :reviews
  end

  root 'welcome#index'

  get '/listings/:id/next', to: 'listings#next_listing'

  get '/listings/:id/previous', to: 'listings#previous_listing'

  # get '/listings/lastfirst' to: 'listings#last_and_first'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
