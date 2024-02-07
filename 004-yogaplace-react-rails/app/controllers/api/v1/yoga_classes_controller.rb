class Api::V1::YogaClassesController < ApplicationController
  before_action :set_yoga_lesson, only: [:create]
  before_action :set_yoga_class, only: %i[ show update destroy ]
  # rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  def index
    @yoga_classes = YogaClass.all.order(created_at: :desc)
    render json: @yoga_classes, include: [:yoga_lesson => {:only => [:id, :title, :description]},
                                        :user => {:only => [:id, :email, :first_name, :last_name, :username, :city, :role ]}] 
  end
  
  def show
    render json: @yoga_class, include: [:user => {:only => [:id, :email, :first_name, :last_name, :username, :city, :role ]}]

  end

  def create
    @yoga_class = @yoga_lesson.yoga_classes.new(yoga_class_params)
  
    if @yoga_class.save
      render json: @yoga_class, status: :created, location: api_v1_yoga_class_url(@yoga_class)
    else
      render json: @yoga_class.errors, status: :unprocessable_entity
    end
  end

  def update
    if @yoga_class.update(yoga_class_params)
      render json: @yoga_class.id
    else
      render json: @yoga_class.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @yoga_class.destroy
  end

  private

  def set_yoga_lesson
    @yoga_lesson = YogaLesson.find(params[:yoga_class][:yoga_lesson_id])
  end

  def set_yoga_class
    @yoga_class = YogaClass.find(params[:id])
  end

  def yoga_class_params
    params.require(:yoga_class).permit(:date, :location, :yoga_lesson_id, :user_id)
  end

  # def render_invalid(invalid)
  #   render json: {errors: ErrorMessageSerializer.error_message(invalid.record.errors)}, status: :unprocessable_entity
  # end
end
