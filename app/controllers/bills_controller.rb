class BillsController < ApplicationController
  autocomplete :bill, :code, :extra_data => [:name, :size]
  

 
  # GET /bills
  # GET /bills.json
  def index
    
    if params[:from_date] && params[:to_date]
      @bills = Kaminari.paginate_array(Bill.order("bills.created_at DESC").where(:bills.created_at => Date.parse(params[:from_date]).midnight..Date.parse(params[:to_date]).midnight)).page(params[:page]).per(6)
    else
      @bills = Kaminari.paginate_array(Bill.order("bills.created_at DESC").search(params[:search])).page(params[:page]).per(6)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.js
    end
  end

  def statistics
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
    @products=Product.all
    #@names=Product.select(:name)
    @modnames1=Array.new
    @modnames2=Array.new
    @modnames3=Array.new
    @modnames4=Array.new
     @h1=Hash.new
     @h2=Hash.new
     @h3=Hash.new
     @h4=Hash.new
    @products.each do |prod|
      #@h[prod.code]=prod.name
      @temp=prod.name.to_s
      @pos=@temp.index('(')
      #@pos=@pos+1
      @name=@temp[0..@pos-1]
      @len=@temp.length
      @size=@temp[@pos+1 ..@len-2]
      if prod.category==1
      @modnames1.push(@name)
      #@h1[@size]=@size
      end
      #else
      if prod.category==2
      @modnames2.push(@name)
      @h2[@size]=@size
      end
      #else
      if prod.category==3
      @size=prod.size1.to_f.to_s.concat('X')
      @size3=@size.concat(prod.size2.to_f.to_s)
      #@len=@size3.length
      #@size3=@size3[0..@len-2]
      @modnames3.push(@name)
      @h3[@size3]=@size3
      end
      #else
      if prod.category==4
      @modnames4.push(@name)
      @h4[@size]=@size
      end
      
      
    end
     @uniqs1=@modnames1.uniq
     @uniqs2=@modnames2.uniq
     @uniqs3=@modnames3.uniq
     @uniqs4=@modnames4.uniq
     @a1=Array.new
     @uniqs1.each_with_index do |uniq1,i|
      @uniq1=uniq1.to_s
      @a1[i]=Hash.new
      @items=Product.find(:all,:conditions => ['name LIKE ?',@uniq1+'%' ] )
      @items.each do |item|
       @size1=item.size1.to_s.concat("X").concat(item.size2.to_s)
       @a1[i][@size1]= @size1
      end
     end
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
    #@customer.update_attributes(:name=>params[:bill][:customer_name])
     @customer.update_attributes(:name=>params[:bill][:customer_name],:balance=>params[:bill][:customer_dues])
   # @bill.customer_dues(params[:bill][:customer_dues])
   #@bill = Bill.new(params[:id])
   # @bill.items.build
    #3.times { @bill.items.build }
     #@bill.items.build
     @bill.customer_id=@customer.id
    
     
      
    respond_to do |format|
      if @bill.save
        @bill.items.each do|item|
          item.product.total_stock.total_quantity -= item.sold_qty
          item.product.total_stock.save
        end
        
        format.html { redirect_to @bill, notice: 'Bill was successfully updated.' }
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

