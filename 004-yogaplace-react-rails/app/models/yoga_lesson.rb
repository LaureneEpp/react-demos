class YogaLesson < ApplicationRecord
    validates :title, :description, :yoga_category, presence: :true
    validates :title, uniqueness: { scope: :yoga_category_id }
    has_many :yoga_classes, dependent: :destroy
    belongs_to :yoga_category
end
