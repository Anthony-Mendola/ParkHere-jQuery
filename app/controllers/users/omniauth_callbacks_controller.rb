class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    if current_user.present?
      current_user.apply_omniauth(request.env["omniauth.auth"])
      redirect_to edit_user_registration_path, notice: "Facebook Account Linked!"
    else
      @user = User.from_omniauth(request.env["omniauth.auth"])

      if @user.persisted?
        set_flash_message(:notice, :success, :kind => "Facebook")
        sign_in_and_redirect @user
      else
        session["devise.facebook_data"] = request.env["omniauth.auth"]
        set_flash_message(:notice, :alert, :kind => "Could not sign in with Facebook")
        redirect_to new_user_registration_url
      end
    end
  end

  def failure
    redirect_to root_path
  end
end
