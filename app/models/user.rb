class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:facebook]
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  has_many :listings
  has_many :categories, through: :listings
  has_many :reviews

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name
    end
  end

  def self.most_listings
    # User.joins(:listings).group(:user_id).order("count(user_id) DESC").first.name
    User.select('users.*, COUNT(listings.id) AS listings_count')
    .joins(:listings).group('users.id').order('listings_count DESC').first
  end

end
