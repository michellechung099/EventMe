class CreateTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :tickets do |t|
      t.references :event, null: false, foreign_key: true
      t.string :name, null: false
      t.decimal :price, null: false
      t.integer :quantity, null: false
      t.datetime :sales_start_time, null: false
      t.datetime :sales_end_time, null: false

      t.timestamps
    end
  end
end
