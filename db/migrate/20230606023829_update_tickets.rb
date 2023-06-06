class UpdateTickets < ActiveRecord::Migration[7.0]
  def change
    remove_column :tickets, :user_id
    remove_column :tickets, :name
    remove_column :tickets, :price
    remove_column :tickets, :sales_start_time
    remove_column :tickets, :sales_end_time
    remove_column :tickets, :event_id
    add_column :tickets, :event_ticket_id, :bigint
  end
end
