class CreateYogaClasses < ActiveRecord::Migration[7.0]
  def change
    create_table :yoga_classes do |t|
      t.references :yoga_lesson
      t.datetime :date
      t.string :location

      t.timestamps
    end
  end
end