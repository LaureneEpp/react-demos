class CreateWeatherData < ActiveRecord::Migration[7.0]
  def change
    create_table :weather_data do |t|
      t.string :city
      t.float :temperature
      t.string :description

      t.timestamps
    end
  end
end
