class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
      t.references :user, foreign_key: true
      t.references :yoga_class, foreign_key: true
      
      t.timestamps
    end
  end
end
