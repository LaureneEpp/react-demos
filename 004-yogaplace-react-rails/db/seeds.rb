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
User.create!(first_name: "test07", last_name: "test07", username: "test07", email: "test07@test.org", password: "password", city: "bx")
User.create!(first_name: "test08", last_name: "test08", username: "test08", email: "test08@test.org", password: "password", city: "bx")
User.create!(first_name: "test09", last_name: "test09", username: "test09", email: "test09@test.org", password: "password", city: "bx")
User.create!(first_name: "test10", last_name: "test10", username: "test10", email: "test10@test.org", password: "password", city: "bx")



puts "Created #{User.count} users"

10.times do 
  YogaCategory.create(
    title: Faker::Lorem.word,
    description: Faker::Lorem.paragraph(sentence_count: 4),
  )
end

puts "Created #{YogaCategory.count} categories"


20.times do 
  YogaLesson.create(
    title: Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.paragraph(sentence_count: 4),
    yoga_category_id: rand(1..10)
  )
end

100.times do
      YogaClass.create(
      date: Faker::Date.forward(days: 23),
      location: Faker::Address.city, 
      user_id: rand(1..2),
      yoga_lesson_id: rand(1..20)
    )
end

150.times do
  Booking.create(
    user_id: rand(3..10),
    yoga_class_id: rand(1..100)
  )
end

puts "Created #{YogaLesson.count} lessons"
puts "Created #{YogaClass.count} classes"
puts "Created #{Booking.count} bookings"