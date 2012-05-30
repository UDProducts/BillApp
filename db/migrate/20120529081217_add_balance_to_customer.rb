class AddBalanceToCustomer < ActiveRecord::Migration
  def change
  add_column :customers, :balance, :string
  end
end
