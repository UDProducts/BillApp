class AddCftToItems < ActiveRecord::Migration
  def change
   add_column :items, :cft, :string
  end
end
