BillApp::Application.routes.draw do
  resources :suppliers do
  get :autocomplete_supplier_phoneno, :on => :collection
  end

  resources :total_stocks

  resources :products do
    get :autocomplete_product_code, :on => :collection
    get :autocomplete_product_name, :on => :collection
  end
  resources :stocks

  resources :customers do
   get :autocomplete_customer_phoneno, :on => :collection
  end

  resources :bills  do
    get :autocomplete_bill_code, :on => :collection
    get :autocomplete_bill_rate, :on => :collection 
       
  end

  
  resources :items do
   get :autocomplete_item_rate, :on => :collection
  end

  match "items/add_items" => "items#add_items", :via => :post
  get "statistics" => "bills#statistics"

  get "home/index"
  get "bills/nostock"
  
 mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  devise_for :users

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
   root :to => 'bills#new'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
