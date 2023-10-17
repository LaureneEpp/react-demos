class YogaClass < ApplicationRecord
     validates :title, :description, :location, :date, presence: true
     validates :title, uniqueness: true
end
