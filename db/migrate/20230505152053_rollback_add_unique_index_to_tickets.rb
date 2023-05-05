class RollbackAddUniqueIndexToTickets < ActiveRecord::Migration[7.0]
  def change
    remove_index :tickets, :event_id
  end
end
