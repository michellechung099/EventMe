class CreateEventTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :event_tickets do |t|
      t.references :event, null: false, foreign_key: true
      t.string :name
      t.decimal :unit_price
      t.datetime :sales_start_time
      t.datetime :sales_end_time
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
