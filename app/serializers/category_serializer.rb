class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :reviews
  belongs_to :listings
end
