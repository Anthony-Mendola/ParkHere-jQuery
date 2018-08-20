class CreateListings < ActiveRecord::Migration[5.0]
  def change
    create_table :listings do |t|
      t.string :title
      t.string :address
      t.text :content
      t.string :contact
      t.integer :category_id
      t.integer :user_id
      t.decimal :cost
      t.timestamps
    end
  end
end
