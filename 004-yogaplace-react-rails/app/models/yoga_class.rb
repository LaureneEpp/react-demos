class YogaClass < ApplicationRecord
     validates :location, :date, presence: true
     belongs_to :yoga_lesson
     has_one :yoga_category, through: :yoga_lesson
     has_many :bookings
end