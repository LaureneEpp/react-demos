class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :first_name, :last_name, :role, presence: true
  validates :email, :username, uniqueness: true, presence: true

  has_many :bookings
  has_one_attached :image
<<<<<<< HEAD
=======

  after_create :attach_default_image

  private

  def attach_default_image
    default_image_path = Rails.root.join('frontend', 'src', 'assets', 'profile_default.jpeg')
    self.image.attach(io: File.open(default_image_path), filename: 'profile_default.jpeg', content_type: 'application/jpeg')
  end
>>>>>>> ea10d2e81b8197ab1d079ca47571e7d7e8a3a49b
end