class ProductsController < ApplicationController
#autocomplete :product, :code, :update_elements => {:name => '#id_element', :slogan => '#some_other_element'}
# autocomplete :product, :name
autocomplete :product, :code, :extra_data => [:name, :size1, :size2, :category], :display_value => :product_details
#autocomplete :product, :name
  # autocomplete :product, :code,
               #:column_name => "code",
               #:extra_data => {:name}


  # GET /products
  # GET /products.json
  def index
    
   if params[:from_date] && params[:to_date]
      @products = Kaminari.paginate_array(Product.order("created_at DESC").where(:created_at => Date.parse(params[:from_date]).midnight..Date.parse(params[:to_date]).midnight)).page(params[:page]).per(6)
    else
      @products = Kaminari.paginate_array(Product.order("created_at DESC").search(params[:search])).page(params[:page]).per(6)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.js
    end
  end

  # GET /products/1
  # GET /products/1.json
  def show
    @product = Product.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @product }
    end
  end

  # GET /products/new
  # GET /products/new.json
  def new
    @product = Product.new
    @product.stocks.build
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @product }
    end
  end

  # GET /products/1/edit
  def edit
    @product = Product.find(params[:id])
  end

  # POST /products
  # POST /products.json
  def create
    @product = Product.new(params[:product])

    respond_to do |format|
      if @product.save
        format.html { redirect_to new_product_path, notice: 'Product was successfully created.' }
        format.json { render json: @product, status: :created, location: @product }
      else
        format.html { render action: "new" }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /products/1
  # PUT /products/1.json
  def update
    @product = Product.find(params[:id])

    respond_to do |format|
      if @product.update_attributes(params[:product])
        format.html { redirect_to @product, notice: 'Product was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    @product = Product.find(params[:id])
    @product.destroy

    respond_to do |format|
      format.html { redirect_to products_url }
      format.json { head :no_content }
    end
  end
end
