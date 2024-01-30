class Api::V1::UsersController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all.order(created_at: :desc)
    render json: @users
  end
  
  def show
    @user = User.includes(bookings: [:yoga_class => [:yoga_lesson]])
               .find_by(id: params[:id])
  
    if @user.present?
      render json: @user, include: {
        bookings: {
          # include: {
          #   yoga_class: {
          #     only: [:id, :location, :date, :yoga_lesson_id],
          #     include: { yoga_lesson: { only: [:id, :title, :description] } }
          #   }
          # }
        }
      }
    else
      render json: {}, status: :not_found
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
