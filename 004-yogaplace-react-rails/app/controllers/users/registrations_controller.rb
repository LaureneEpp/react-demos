class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)
    resource.save
    sign_in(resource_name, resource)

    render json: resource.to_json, status: :created
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :username, :city, :role, :image_url)
  end

end

