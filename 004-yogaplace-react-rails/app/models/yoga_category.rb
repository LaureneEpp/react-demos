class YogaCategory < ApplicationRecord
    validates :title, :description, presence: :true
    has_many :yoga_lessons
    has_many :yoga_classes, through: :yoga_lessons
end
