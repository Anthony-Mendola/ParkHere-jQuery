class Listing < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :reviews
  validates_presence_of :title, :content, :address

  def category_attributes=(category_attributes)
    category_attributes.values.each do |category_attribute|
      if !category_attribute['name'].blank?
        category = Category.find_or_create_by(category_attribute)
        self.categories << category
      end
    end
  end

  def next
    if next_dest = self.class.where("id > ?", id).first
      next_dest
    else
      Listing.first
    end
  end

  def previous
    if previous_dest = self.class.where("id < ?", id).last
      previous_dest
    else
      Listing.last
    end
  end

end
