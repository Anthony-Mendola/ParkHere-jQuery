class ReviewsController < ApplicationController
  before_action :set_listing

  def create
    @review = current_user.reviews.create(review_params)
    @review.listing = @listing
    @review.save
    render json: @review, status: 201
  end



  private

  def set_listing
    @listing = Listing.find(params[:listing_id])
  end

  def review_params
    params.require(:review).permit(:content)
  end
end

