class CreateListings < ActiveRecord::Migration[5.1]
  def change
    create_table :listings do |t|
      t.string :title
      t.string :contact
      t.decimal :cost
      t.text :content
      t.string :address
      t.integer :category_id
      t.integer :user_id
      t.float :latitude
      t.float :longitude
      t.attachment :image
      t.binary :image

      t.timestamps
    end
  end
end
