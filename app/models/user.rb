class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

devise :database_authenticatable, :registerable,
                :recoverable, :rememberable, :trackable, :validatable,
                :omniauthable, omniauth_providers: [:facebook]
                has_many :listings
                has_many :reviews
       
         def self.from_omniauth(auth)
           where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
             user.provider = auth.provider
             user.uid = auth.uid
             user.name = auth.info.name
             user.email = auth.info.email
             user.password = Devise.friendly_token[0,20]
       
           end
         end
       
         def apply_omniauth(auth)
           update_attributes(
             provider: auth.provider,
             uid: auth.uid
             )
         end
       end
       