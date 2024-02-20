class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :dashboard ]

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

def dashboard
  if @user.nil?
    render json: { error: 'User not found' }, status: :not_found
    return
  end

  # List of all students
  @all_users = User.all.where.not(role: "instructor")
  # List of all instructors
  @all_instructors = User.all.where(role: "instructor")
  #List of all bookings
  @all_bookings = Booking.all.order(created_at: :desc)
  # List of all classes created by current intructor
  @yoga_classes_current_instructor = YogaClass.where(user_id: @user.id)
  # Count of all classes created by current intructor
  @yoga_classes_count = @yoga_classes_current_instructor.count
  # Get all the current instructor yoga classes with no bookings
   @no_booking_yoga_classes_current_instructor = YogaClass.left_joins(:bookings).where(bookings: { id: nil }).where(user_id: @user.id)
   @no_booking_yoga_classes_current_instructor_count = @no_booking_yoga_classes_current_instructor.count
  # List of bookings for classes created by current instructor
  @bookings_current_instructor = Booking.joins(yoga_class: :yoga_lesson).where('yoga_classes.user_id = ? AND yoga_classes.date >= ?', @user.id, Date.today ).order('yoga_classes.id')
  @bookings_count = @bookings_current_instructor.count
  # List of clients for current instructor
  @clients_current_instructor = User.joins(bookings: {yoga_class: :user}).where('yoga_classes.user_id = ? AND yoga_classes.date >= ?', @user.id, Date.today ).distinct
  # List of clients per yoga_class
  @yoga_class_users_hash = {}
  @bookings_current_instructor.each do |booking|
    title = booking.yoga_class.yoga_lesson.title
    user = booking.user
    (@yoga_class_users_hash[title] ||= []) << user
  end

  render json: {
    all_users: @all_users,
    all_instructors: @all_instructors,
    all_bookings: @all_bookings.as_json(include: [:user, yoga_class: {include: [:yoga_lesson]}]),
    yoga_classes_current_instructor: @yoga_classes_current_instructor.as_json(include: :yoga_lesson),
    yoga_classes_count: @yoga_classes_count,
    no_booking_yoga_classes_current_instructor: @no_booking_yoga_classes_current_instructor.as_json(include: :yoga_lesson), 
    no_booking_yoga_classes_current_instructor_count: @no_booking_yoga_classes_current_instructor_count,
    bookings_current_instructor: @bookings_current_instructor.as_json(include: [:user, yoga_class: {include: [:yoga_lesson]}]),
    bookings_count: @bookings_count,
    yoga_class_users_hash: @yoga_class_users_hash,
    clients_current_instructor: @clients_current_instructor
  }
end
 
  private

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :username, :city, :role, :password, :password_confirmation)
  end
  
end
