class Api::V1::BookingsController < ApplicationController
  before_action :set_booking, only: %i[ show update destroy ]
  
      def index
        @bookings = Booking.all.order(created_at: :desc)
        render json: @bookings, include: { yoga_class: {only: [:id, :location, :date, :yoga_lesson_id], include: { yoga_lesson: { only: [:id, :title, :description, :yoga_category_id], include: {yoga_category: {only: [:id, :title, :description]}} } }
            },:user => {:only => [:id, :first_name, :last_name, :username, :email, :city, :role]}
          }
      end
    
      def show
        render json: @booking
      end
    
      def new
      end

      def create
        @booking = Booking.new(booking_params)
      
        if @booking.save
          render json: @booking, status: :created, location: api_v1_bookings_url
        else
          render json: @booking.errors, status: :unprocessable_entity
        end
      end
    
      def update
        if @booking.update(booking_params)
          render json: @yoga_class.id
        else
          render json: @yoga_class.errors, status: :unprocessable_entity
        end
      end
    
      def destroy
        @booking.destroy
      end

      private

      def set_booking
        @booking = Booking.find(params[:id])
      end
    
      def booking_params
        params.require(:booking).permit(:yoga_class_id, :user_id)
      end
end