class TotalStocksController < ApplicationController
  # GET /total_stocks
  # GET /total_stocks.json
  def index
    @total_stocks = TotalStock.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @total_stocks }
    end
  end

  # GET /total_stocks/1
  # GET /total_stocks/1.json
  def show
    @total_stock = TotalStock.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @total_stock }
    end
  end

  # GET /total_stocks/new
  # GET /total_stocks/new.json
  def new
    @total_stock = TotalStock.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @total_stock }
    end
  end

  # GET /total_stocks/1/edit
  def edit
    @total_stock = TotalStock.find(params[:id])
  end

  # POST /total_stocks
  # POST /total_stocks.json
  def create
    @total_stock = TotalStock.new(params[:total_stock])

    respond_to do |format|
      if @total_stock.save
        format.html { redirect_to @total_stock, notice: 'Total stock was successfully created.' }
        format.json { render json: @total_stock, status: :created, location: @total_stock }
      else
        format.html { render action: "new" }
        format.json { render json: @total_stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /total_stocks/1
  # PUT /total_stocks/1.json
  def update
    @total_stock = TotalStock.find(params[:id])

    respond_to do |format|
      if @total_stock.update_attributes(params[:total_stock])
        format.html { redirect_to @total_stock, notice: 'Total stock was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @total_stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /total_stocks/1
  # DELETE /total_stocks/1.json
  def destroy
    @total_stock = TotalStock.find(params[:id])
    @total_stock.destroy

    respond_to do |format|
      format.html { redirect_to total_stocks_url }
      format.json { head :no_content }
    end
  end
end
