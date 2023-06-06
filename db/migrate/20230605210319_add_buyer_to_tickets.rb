class AddBuyerToTickets < ActiveRecord::Migration[7.0]
  def change
    add_reference :tickets, :buyer, foreign_key: { to_table: :users }
  end
end
