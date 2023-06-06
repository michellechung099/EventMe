class AddQuantityToEventTickets < ActiveRecord::Migration[7.0]
  def change
    add_column :event_tickets, :quantity, :integer
  end
end
