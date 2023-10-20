class YogaCategory < ApplicationRecord
    validates :title, :description, presence: :true
    has_many :yoga_lessons
end
