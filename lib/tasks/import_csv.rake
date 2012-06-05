require 'csv'

desc "Import products from db/products.csv file"
task :import_csv => [:environment] do
  CSV.open('db/products.csv', 'r').each do |row|
    product = Product.create(:name => row[1] + "(" + row[4] + ")", :code => row[0], :size1 => row[5].split(/x/).first, :size2 => row[6].split(/x/).last, :category => row[7])
    if product.save! && product.create_total_stock!(:total_quantity => 0)
      puts row[0] + ": Created Successfully" 
    else 
      puts row[0] + ": Could not create"
    end
  end
end
