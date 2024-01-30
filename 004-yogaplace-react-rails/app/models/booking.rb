class Booking < ApplicationRecord
    belongs_to :user
    belongs_to :yoga_class

    validates :user, uniqueness: { scope: :yoga_class}
end
