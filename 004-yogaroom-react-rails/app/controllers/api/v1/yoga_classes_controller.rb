class Api::V1::YogaClassesController < ApplicationController
  before_action :set_yoga_class, only: %i[ show update destroy ]

  def index
    @yoga_classes = YogaClass.all.order(created_at: :desc)

    render json: @yoga_classes
  end

  def show
    render json: @yoga_class
  end

  def create
    @yoga_class = YogaClass.new(yoga_class_params)

    if @yoga_class.save
      render json: @yoga_class.id, status: :created, location: api_v1_post_url(@yoga_class)
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
    def set_yoga_class
      @yoga_class = YogaClass.find(params[:id])
    end

    def yoga_class_params
      params.require(:yoga_class).permit(:title, :description, :date, :location)
    end
end
