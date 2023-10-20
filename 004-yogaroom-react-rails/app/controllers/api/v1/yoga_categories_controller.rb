class Api::V1::YogaCategoriesController < ApplicationController
  before_action :set_yoga_category, only: %i[ show update destroy ]

  def index
    @yoga_categories = YogaCategory.all.order(created_at: :desc)
    render json: @yoga_categories, include: [:yoga_lessons => {:only => [:id, :title, :description, :yoga_category_id]}]
  end
  
  def show
    render json: @yoga_category
  end

  def new
  end

  def create
    @yoga_category = YogaCategory.new(yoga_category_params)
  
    if @yoga_category.save
      render json: @yoga_category, status: :created, location: api_v1_yoga_categories_url
    else
      render json: @yoga_category.errors, status: :unprocessable_entity
    end
  end

  def update
    if @yoga_category.update(yoga_category_params)
      render json: @yoga_category.id
    else
      render json: @yoga_category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @yoga_category.destroy
  end

  private

  def set_yoga_category
    @yoga_category = YogaCategory.find(params[:id])
  end

  def yoga_category_params
    params.require(:yoga_category).permit(:title, :description)
  end
end
