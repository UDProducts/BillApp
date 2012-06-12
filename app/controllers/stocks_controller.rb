class StocksController < ApplicationController
autocomplete :product, :code, :extra_data => [:name, :size1, :size2,:category]
  # GET /stocks
  # GET /stocks.json
  def index
if params[:from_date] && params[:to_date]
      @stocks = Kaminari.paginate_array(Stock.order("stocks.created_at DESC").where(:stocks.created_at => Date.parse(params[:from_date]).midnight..Date.parse(params[:to_date]).midnight)).page(params[:page]).per(6)
    else
      @stocks = Kaminari.paginate_array(Stock.order("stocks.created_at DESC").search(params[:search])).page(params[:page]).per(6)
    end


    respond_to do |format|
      format.html # index.html.erb
      format.js
    end
  end

  # GET /stocks/1
  # GET /stocks/1.json
  def show
    @stock = Stock.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @stock }
    end
  end

  # GET /stocks/new
  # GET /stocks/new.json
  def new
    @stock = Stock.new
    
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @stock }
    end
  end

  # GET /stocks/1/edit
  def edit
    @stock = Stock.find(params[:id])
  end

  # POST /stocks
  # POST /stocks.json
  def create
    @stock = Stock.new(params[:stock])
    @supplier=Supplier.find_or_create_by_phoneno(params[:stock][:supplier_phoneno])
     #@customer=Customer.find_or_create_by_name(params[:bill][:code])
    #@customer.update_attributes(:name=>params[:bill][:customer_name])
     @supplier.update_attributes(:name=>params[:stock][:supplier_name])
     @stock.supplier_id=@supplier.id
    
    #@oldstock=Stock.where(:product_id => @stock.product_id).last
    @stock.product.total_stock.total_quantity += @stock.quantity
    #@stock.quantity= @stock.quantity+@oldstock.quantity
    respond_to do |format|
      if @stock.save && @stock.product.total_stock.save
        format.html { redirect_to new_stock_path, notice: 'Stock was successfully created.' }
        format.json { render json: @stock, status: :created, location: @stock }
      else
        format.html { render action: "new" }
        format.json { render json: @stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /stocks/1
  # PUT /stocks/1.json
  def update
    @stock = Stock.find(params[:id])

    respond_to do |format|
      if @stock.update_attributes(params[:stock])
        format.html { redirect_to @stock, notice: 'Stock was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stocks/1
  # DELETE /stocks/1.json
  def destroy
    @stock = Stock.find(params[:id])
    @stock.destroy

    respond_to do |format|
      format.html { redirect_to stocks_url }
      format.json { head :no_content }
    end
  end
end
