class AddPlaneChargesToBill < ActiveRecord::Migration
  def change
  add_column :bills, :planecharge, :string
  end
end
