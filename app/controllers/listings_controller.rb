class ListingsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_listing, only: [:show, :edit, :update, :destroy]
  before_action only: [:edit, :update, :destroy] { authorize_user!(@listing) }

  def index
    @listings = Listing.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @listings }
    end
  end

  def show
    @listing = Listing.find(params[:id])
    @category = @listing.category
    if current_user
      @review = current_user.reviews.build(listing: @listing)
    end
    respond_to do |format|
      format.html { render :show }
      format.json { render json:  @listing }
    end
  end

  def next_listing
    @listing = Listing.find(params[:id])
    @next_listing = @listing.next
    render json: @next_listing
  end

  def previous_listing
    @listing = Listing.find(params[:id])
    @previous_listing = @listing.previous
    render json: @previous_listing
  end

  def new
    @listing ||= Listing.new
    @listing.build_category
  end

  def create
    @listing = current_user.listings.new(listing_params)

    if @listing.save
      redirect_to listing_path(@listing)
    else
      redirect_to new_listing_path, alert: "You must add a title, content, cost, contact, and address to create a listing."
    end
  end

  def edit
    @listing = Listing.find(params[:id])
  end

  def update
    @listing = Listing.find(params[:id])
    if !current_user
      redirect_to new_user_session_path, alert: "You must be the owner in order to edit a listing."
    elsif current_user != @listing.user
      redirect_to :back, alert: "You must be the owner in order to edit a listing."
    else
      @listing.update(listing_params)
      redirect_to listing_path(@listing)
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    if !current_user
      redirect_to new_user_session_path, alert: "You must be the owner to delete a listing."
    elsif current_user != @listing.user
      redirect_to :back, alert: "You must be the owner to delete a listing."
    else
      @listing.destroy
      redirect_to listings_path
    end
  end


  private

  def listing_params
    params.require(:listing).permit(:title, :address, :content, :cost, :contact, :image, :longitude,
    :latitude, :category_id, :category_attribute => [:name])
  end
end

   #In this line, our set_listing action is running a database query on the
    #Listing model that will return a listing with an ID that matches the route parameters.
    #It will store this record in the @listing instance variable and make it available to views.

    def set_listing
      @listing = Listing.find(params[:id])
    end
end
