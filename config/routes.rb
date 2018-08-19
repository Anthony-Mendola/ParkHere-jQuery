Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  root 'listings#index'

  resources :listings do
    resources :reviews #Nested Resource
  end

  resources :categories do
    resources :listings
  end
end
