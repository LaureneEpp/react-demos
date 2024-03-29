class Api::V1::YogaLessonsController < ApplicationController
  before_action :set_yoga_lesson, only: %i[ show update destroy ]

  def index
    @yoga_categories = YogaCategory.all.order(created_at: :desc)
    @yoga_lessons = YogaLesson.all.order(created_at: :desc)
    render json: @yoga_lessons, include: [:yoga_classes => {:only => [:id, :location, :date, :yoga_lesson_id, :user_id]},
                                          :yoga_category => {:only => [:id, :title, :description]}]
  end

  def by_category
    category = params[:category]
    yoga_lessons = YogaLesson.where(category: category)
    render json: yoga_lessons
  end
  
  def show
    render json: @yoga_lesson, include: [:yoga_classes => {:only => [:id, :location, :date, :yoga_lesson_id]}]
  end

  def new
  end

  def create
    @yoga_lesson = YogaLesson.new(yoga_lesson_params)
  
    if @yoga_lesson.save
      render json: @yoga_lesson, status: :created, location: api_v1_yoga_lessons_url
    else
      render json: @yoga_lesson.errors, status: :unprocessable_entity
    end
  end

  def update
    if @yoga_lesson.update(yoga_lesson_params)
      render json: @yoga_lesson.id
    else
      render json: @yoga_lesson.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @yoga_lesson.destroy
  end


  private

  def set_yoga_lesson
    @yoga_lesson = YogaLesson.find(params[:id])
  end

  def yoga_lesson_params
    params.require(:yoga_lesson).permit(:title, :description, :yoga_category_id)
  end
end
