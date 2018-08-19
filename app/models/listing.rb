class Listing < ApplicationRecord
belongs_to :category
belongs_to :user
has_many :reviews

geocoded_by :address
after_validation :geocode

validates :title, :content, :cost, :contact, :image, presence: true
validates :title, length: { in: 1..90 }
validates :content, length: { minimum: 10 }

has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>"  }, default_url: "/images/:style/missing.png"
validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

def self.search(search)
    if search
       search = search.downcase
        where("lower(title) LIKE ?", "%#{search}%")
    else
      all
    end
  end


    end