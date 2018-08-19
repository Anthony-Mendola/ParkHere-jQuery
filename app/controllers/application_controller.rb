class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :owner?
  def owner?(resource)
    current_user && resource.user_id == current_user.id
  end

  def authorize_user!(resource)
    if !owner?(resource)
      flash[:alert] = "You are not allowed to change someone else's #{resource.model_name.to_s.downcase}."
      redirect_back(fallback_location: root_path)
    end
  end

end

#redirect_back is a new rails 5 method to deal with HTTP_REFERER not present error
