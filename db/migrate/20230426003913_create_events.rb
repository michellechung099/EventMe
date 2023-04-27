class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.references :user, null: false, foreign_key: true
      t.string :type
      t.string :category
      t.string :location, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.boolean :recurring, default: false
      t.text :summary, null: false
      t.integer :ticket_quantity, null: false

      t.timestamps
    end
  end
end
