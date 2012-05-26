class ChangeSoldQtyInItems < ActiveRecord::Migration
  def change
  change_column :items, :sold_qty, :integer
  end
end
