class Category < ApplicationRecord
has_many :listings
has_many :users, through: :listings
validates :name, uniqueness: true
end
