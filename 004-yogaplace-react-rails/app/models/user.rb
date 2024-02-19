class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :first_name, :last_name, :role, presence: true
  validates :email, :username, uniqueness: true, presence: true

  has_many :bookings
end