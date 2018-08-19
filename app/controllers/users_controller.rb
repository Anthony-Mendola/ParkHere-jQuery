class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def destinations
    if current_user
      @listingss = current_user.listings
    end
  end

end
