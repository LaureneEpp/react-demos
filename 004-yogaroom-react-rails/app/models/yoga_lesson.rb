class YogaLesson < ApplicationRecord
    validates :title, :description, :category, presence: :true
    has_many :yoga_classes, dependent: :destroy
end
