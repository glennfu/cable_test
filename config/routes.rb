Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  patch '/do_thing' => 'test#do_thing', as: :do_thing
  
  root to: "test#index"
end
