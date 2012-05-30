module ProductsHelper
def product_names()
    Product.find_by_sql("SELECT name,code from products p").to_s
    
  end
end
