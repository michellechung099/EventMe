class AddDefaultValueToTicketQuantity < ActiveRecord::Migration[7.0]
  def change
    change_column_default :events, :ticket_quantity, 0
  end
end
