class RenameItemamountToTotalAmt < ActiveRecord::Migration
  def change
  rename_column(:items,:item_amount,:total_amount)
  end
end
