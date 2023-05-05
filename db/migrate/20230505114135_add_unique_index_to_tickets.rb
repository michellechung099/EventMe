class AddUniqueIndexToTickets < ActiveRecord::Migration[7.0]
  def change
    change_column :tickets, :event_id, :integer, unique: true
  end
end
