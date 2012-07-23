require 'csv'

desc "Import products from db/products.csv file"
task :import_csv => [:environment] do
  CSV.open('db/products.csv', 'r').each do |row|
    product = Product.create(:name => row[1] + "(" + row[4] + ")", :code => row[0], :size1 => row[2].split(/[xX]/).first, :size2 => row[3].split(/[xX]/).last, :category => row[5])
    if product.save! && product.create_total_stock!(:total_quantity => 0)
      puts row[0] + ": Created Successfully" 
    else 
      puts row[0] + ": Could not create"
    end
  end
end
