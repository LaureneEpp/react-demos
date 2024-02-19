class Booking < ApplicationRecord
    belongs_to :user
    belongs_to :yoga_class
    validates :user, uniqueness: { scope: :yoga_class}
    validates :yoga_class, uniqueness: {scope: :user}
end
