class CreateYogaLessons < ActiveRecord::Migration[7.0]
  def change
    create_table :yoga_lessons do |t|
      t.string :title,  null: false
      t.text :description,  null: false
      t.string :category

      t.timestamps
    end
  end
end
