class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :address, :contact, :cost, :review_list
  has_one :category
  has_one :user

  def review_list
    object.reviews.map do |review|
      {
        id: review.id,
        user: {
          id: review.user_id,
          name: User.find(review.user_id).name
        },
        content: review.content
      }
    end
  end
end
