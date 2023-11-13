class YogaClass < ApplicationRecord
     validates :location, :date, presence: true
     belongs_to :yoga_lesson
end