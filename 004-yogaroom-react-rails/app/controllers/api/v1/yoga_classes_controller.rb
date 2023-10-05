class Api::V1::YogaClassesController < ApplicationController
  before_action :set_yoga_class, only: %i[ show update destroy ]

  # GET /yoga_classes
  def index
    @yoga_classes = YogaClass.all

    render json: @yoga_classes
  end

  # GET /yoga_classes/1
  def show
    render json: @yoga_class
  end

  # POST /yoga_classes
  def create
    @yoga_class = YogaClass.new(yoga_class_params)

    if @yoga_class.save
      render json: @yoga_class, status: :created, location: api_v1_yoga_class_path(@yoga_class)
    else
      render json: @yoga_class.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /yoga_classes/1
  def update
    if @yoga_class.update(yoga_class_params)
      render json: @yoga_class
    else
      render json: @yoga_class.errors, status: :unprocessable_entity
    end
  end

  # DELETE /yoga_classes/1
  def destroy
    @yoga_class.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_yoga_class
      @yoga_class = YogaClass.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def yoga_class_params
      params.require(:yoga_class).permit(:title, :description)
    end
end
