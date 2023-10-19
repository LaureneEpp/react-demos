# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

p "Seeding data"

p "Deleting all data"
YogaClass.destroy_all
YogaLesson.destroy_all

20.times do |i|
  lesson = YogaLesson.create(
    title: Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.paragraph(sentence_count: 4),
    category: Faker::Lorem.word
  )

  5.times do |j|
    lesson.yoga_classes.create(
      date: Faker::Date.forward(days: 23),
      location: Faker::Address.city
    )
  end
end

puts "Created #{YogaLesson.count} lessons"
puts "Created #{YogaClass.count} classes"