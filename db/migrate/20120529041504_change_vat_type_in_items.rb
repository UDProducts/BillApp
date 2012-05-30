class ChangeVatTypeInItems < ActiveRecord::Migration
  def change
  change_column :items, :vat, :decimal
  end
end
