class Api::V1::YogaClassesController < ApplicationController
  before_action :set_yoga_class, only: %i[ show update destroy ]

  def index
    @yoga_classes = YogaClass.all.order(created_at: :desc)
    render json: @yoga_classes, include: [:yoga_lesson => { only: [:id, :title, :description] },
                                          :user => { only: [:id, :email, :first_name, :last_name, :username, :city, :role] }]
  end
  
  def show
    render json: @yoga_class, include: [:user => {:only => [:id, :email, :first_name, :last_name, :username, :city, :role ]}, :yoga_lesson => {:only => [:id, :title, :description]}]
  end

  def new
  end

  def create
    @yoga_class = YogaClass.new(yoga_class_params)
    
    if @yoga_class.save
      render json: @yoga_class, status: :created, location: api_v1_yoga_classes_url
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
    head :no_content
  end

  private

  def set_yoga_class
    @yoga_class = YogaClass.find(params[:id])
  end

  def yoga_class_params
    params.require(:yoga_class).permit(:date, :location, :yoga_lesson_id, :user_id)
  end

end
