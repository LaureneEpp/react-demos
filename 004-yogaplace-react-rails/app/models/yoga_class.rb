class YogaClass < ApplicationRecord
     validates :location, :date, presence: true
     # validates :yoga_lesson, uniqueness: { scope: :user }
     belongs_to :yoga_lesson
     belongs_to :user
     has_one :yoga_category, through: :yoga_lesson
     has_many :bookings, dependent: :destroy
end