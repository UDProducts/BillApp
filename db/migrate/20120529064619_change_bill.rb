class ChangeBill < ActiveRecord::Migration
  def change
  rename_column(:bills,:vat,:gross)
  rename_column(:bills,:amt,:net)
  add_column :bills, :unpaid, :string
  add_column :bills, :discount, :string
  end
end
