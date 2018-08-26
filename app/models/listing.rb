class Listing < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :reviews
  validates_presence_of :title, :content, :address

  #def category_attributes=(category_attributes)
    #self.category = Category.where(:name => category_attributes[:name])
    #category_attributes.values.each do |category_attribute|
      #if !category_attribute['name'].blank?
       # category = Category.find_or_create_by(category_attribute)
        #self.categories << category
     # end
    #end
  
#uses an activerecord query "where" that grabs all the listings with an id greater than the listing thats calling it.
  def next
    if next_listing = self.class.where("id > ?", id).first
      next_listing
    else
      Listing.first
    end
  end

  def previous
    if previous_listing = self.class.where("id < ?", id).last
      previous_listing
    else
      Listing.last
    end
  end

end
