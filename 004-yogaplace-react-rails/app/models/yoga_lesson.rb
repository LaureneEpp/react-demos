class YogaLesson < ApplicationRecord
    validates :title, :description, :yoga_category, presence: :true
    has_many :yoga_classes, dependent: :destroy
    belongs_to :yoga_category
end
