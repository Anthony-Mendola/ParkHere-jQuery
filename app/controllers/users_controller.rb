class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def listings
    if current_user
      @listings = current_user.listings
    end
  end

end
