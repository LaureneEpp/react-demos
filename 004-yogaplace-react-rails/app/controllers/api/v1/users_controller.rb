class Api::V1::UsersController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all.order(created_at: :desc)
    render json: @users
  end
  
  def show
    @usere = current_user
    if @user.present?
      render json: @user
    else
      render json: {}, status: 404
    end
  end
  
  def edit
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  private

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :username, :city, :role, :password, :password_confirmation)
  end
  
end
