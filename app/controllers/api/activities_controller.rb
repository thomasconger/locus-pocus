class Api::ActivitiesController < ApplicationController
  wrap_parameters include: Activity.attribute_names

  #haven't refactored
  def create
    @activity = Activity.new(activity_params)
    if @activity.save
      render :show
    else
      render json: { errors: ["Activity could not be created"] }, status: :unprocessable_entity
    end
  end

  # haven't refactored
  def index
    @activities = Activity.all
    render :index
  end

  # haven't refactored
  def show
    @activity = Activity.find(params[:id])
    if @activity
      render :show
    else
      render json: { errors: "Acivity not found." }, status: :unprocessable_entity
    end
  end

  # haven't refactored
  def update
    @activity = Activity.find(params[:id])
    @activity.update(activity_params)
    render :show
  end

  def destroy
    @activity = Activity.find(params[:id])
    if @activity.delete
      render json: { "message": "The activity was deleted"}
    else
      render json: { errors: @activity.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def activity_params
    params.require(:activity).permit(:prompt, :style, :options, :user_id)
  end
end
