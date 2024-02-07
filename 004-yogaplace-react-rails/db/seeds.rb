# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

p "Seeding data"

p "Deleting all data"
User.destroy_all
YogaCategory.destroy_all
YogaClass.destroy_all
YogaLesson.destroy_all
Booking.destroy_all

User.create!(first_name: "test01", last_name: "test01", username: "test01", email: "test01@test.org", password: "password", city: "bx", role:"instructor" )
User.create!(first_name: "test02", last_name: "test02", username: "test02", email: "test02@test.org", password: "password", city: "bx", role:"instructor" )
User.create!(first_name: "test03", last_name: "test03", username: "test03", email: "test03@test.org", password: "password", city: "bx")
User.create!(first_name: "test04", last_name: "test04", username: "test04", email: "test04@test.org", password: "password", city: "bx")
User.create!(first_name: "test05", last_name: "test05", username: "test05", email: "test05@test.org", password: "password", city: "bx")
User.create!(first_name: "test06", last_name: "test06", username: "test06", email: "test06@test.org", password: "password", city: "bx")


puts "Created #{User.count} users"

10.times do 
  YogaCategory.create(
    title: Faker::Lorem.word,
    description: Faker::Lorem.paragraph(sentence_count: 4),
  )
end

puts "Created #{YogaCategory.count} categories"

20.times do |i|
  lesson = YogaLesson.create(
    title: Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.paragraph(sentence_count: 4),
    yoga_category_id: rand(1..10)
  )

  5.times do |j|
    yoga_class = lesson.yoga_classes.create(
      date: Faker::Date.forward(days: 23),
      location: Faker::Address.city, 
      user_id: rand(1..2)
    )

    5.times do |h|
      yoga_class.bookings.create(
        user_id: rand(3..6)
      )
    end
  end
end

puts "Created #{YogaLesson.count} lessons"
puts "Created #{YogaClass.count} classes"
puts "Created #{Booking.count} bookings"