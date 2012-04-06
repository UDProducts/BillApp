class ItemsController < ApplicationController
helper_method :sort_column, :sort_direction, :sort_directionname
  # GET /items
  # GET /items.json
  def index
    #@items=Item.all
    #@items = Item.search(params[:search]).order(:name)
     #@items = Item.find(:all, :conditions => ['name LIKE ?', "%#{params[:search]}%"])
     @item=Item.new
     if params[:sort] == 'name'
      @dir=sort_directionname
      end
     if params[:sort] == 'name'&& @dir =='asc'
      @items=Item.find(:all, :include => :product, :order => 'products.name')
     # params[:direction] =='desc'   
     else if
      params[:sort] == 'name'&& @dir =='desc'
      @items=Item.find(:all, :include => :product, :order => 'products.name desc')
      #params[:direction] =='asc'   
     else      	
      @items = Item.order(sort_column+" "+ sort_direction)
     end
     end
     	
         respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @items }
        end
  end

  # GET /items/1
  # GET /items/1.json
  def show
    @item = Item.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @item }
    end
  end

  # GET /items/new
  # GET /items/new.json
  def new
    @item = Item.new
    
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @item }
    end
    
  end

  # GET /items/1/edit
  def edit
    @item = Item.find(params[:id])
   
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(params[:item])

    respond_to do |format|
      if @item.save
        format.html { redirect_to items_path, notice: 'Item was successfully created.' }
        format.json { render json: @item, status: :created, location: @item }
      else
        format.html { render action: "new" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /items/1
  # PUT /items/1.json
  def update
    @item = Item.find(params[:id])

    respond_to do |format|
      if @item.update_attributes(params[:item])
        format.html { redirect_to items_path, notice: 'Item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.html { redirect_to items_url }
      format.json { head :no_content }
    end
  end
 
    private

   def sort_directionname
    @dir = sort_direction == "asc" ? "desc" : "asc"
    return @dir
   end
   
   def sort_column
     Item.column_names.include?(params[:sort]) ? params[:sort] : "rate"
   end

   def sort_direction
     %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
   end
end
