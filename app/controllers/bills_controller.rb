class BillsController < ApplicationController
  before_filter :authenticate_user!
  autocomplete :bill, :code, :extra_data => [:name, :size]
  

 
  # GET /bills
  # GET /bills.json
  def index
    if params[:from_date] && params[:to_date]
      @bills = Kaminari.paginate_array(Bill.order("created_at DESC").where(:created_at => Date.parse(params[:from_date]).midnight..Date.parse(params[:to_date]).midnight)).page(params[:page]).per(6)
    else
      @bills = Kaminari.paginate_array(Bill.order("created_at DESC").search(params[:search])).page(params[:page]).per(6)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.js
    end
  end

  # GET /bills/1
  # GET /bills/1.json
  def show
    @bill = Bill.find(params[:id])

    respond_to do |format|		
      format.html # show.html.erb
      format.json { render json: @bill }
    end
  end
  
  def showold
  @bill = Bill.find(params[:id])
    
    respond_to do |format|		
      format.html # showold.html.erb
      format.json { render json: @bill }
    end
  end


  # GET /bills/new
  # GET /bills/new.json
  def new
    @bill = Bill.new
    @bill.items.build
#    3.times { @bill.items.build }
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @bill }
    end
  end

  # GET /bills/1/edit
  def edit
    @bill = Bill.find(params[:id])
    #0product_name=Product.find(params[:bill.items.product_id])
    
  end

  # POST /bills
  # POST /bills.jsonababout:startpageout:startpage
  def create
    @bill = Bill.new(params[:bill])
    
    @customer=Customer.find_or_create_by_phoneno(params[:bill][:customer_phoneno])
     #@customer=Customer.find_or_create_by_name(params[:bill][:code])
    @customer.update_attributes(:name=>params[:bill][:customer_name],:balance=>params[:bill][:customer_dues])
    # @customer.update_attributes(:name=>params[:bill][:customer_name],:balance=>params[:bill][:customer_dues])
   # @bill.customer_dues(params[:bill][:customer_dues])
   #@bill = Bill.new(params[:id])
   # @bill.items.build
    #3.times { @bill.items.build }
     #@bill.items.build
     @bill.customer_id=@customer.id
     @bill.created_at = Time.now 
       @i=0
    @bill.items.each do|item|
        
         @stock=Stock.new
         @stock.product_id=item.product_id
         #@olds = Stock.where(:product_id => item.product_id).pluck('quantity')
        # @olds=Stock.find_by_sql("SELECT quantity FROM stocks ORDER BY stocks.created_at desc LIMIT 1")
         #@oldqty=@olds.last
         unless @stock.product_id.nil?
         @stock.quantity=Stock.where(:product_id => item.product_id).pluck('quantity').last
         @quantity=(@stock.quantity)-(item.sold_qty.to_i)
         @stock.quantity = @quantity.to_i
         @cost=Stock.where(:product_id => item.product_id).pluck('cost').last
         @stock.cost=@cost
         
        if @quantity<0
           @bill.stocks.build

         else
           @stock.save
         end
      end
          end 
          respond_to do |format|
      if @bill.save
        format.html { redirect_to new_bill_path, notice: 'Bill was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "new" }
        format.json { render json: @bill.errors, status: :unprocessable_entity }
      end
     end
          
  end

  # PUT /bills/1
  # PUT /bills/1.json
  def update
    @bill = Bill.find(params[:id])

    respond_to do |format|
      if @bill.update_attributes(params[:bill])
        format.html { redirect_to @bill, notice: 'Bill was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @bill.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bills/1
  # DELETE /bills/1.json
  def destroy
    @bill = Bill.find(params[:id])
    @bill.destroy

    respond_to do |format|
      format.html { redirect_to bills_url }
      format.json { head :no_content }
    end
  end

   def nostock
     @bill = Bill.new(params[:bill])
    respond_to do |format|
      if @bill.save
        format.html { redirect_to new_bill_path, notice: 'Bill was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @bill.errors, status: :unprocessable_entity }
      end
     end
   end  

   
  
end

