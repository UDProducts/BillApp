class CreateTotalStocks < ActiveRecord::Migration
  def change
    create_table :total_stocks do |t|
      t.integer :product_id
      t.integer :total_quantity

      t.timestamps
    end
  end
end
