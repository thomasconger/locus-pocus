class Api::ActivitiesController < ApplicationController
  wrap_parameters include: Activity.attribute_names

  def create
    @activity = Activity.new(activity_params)
    if @activity.save
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @activities = Activity.all
    render :index
  end

  def show
    @activity = Activity.find(params[:id])
    render :show
  end

  def update
    @activity = Activity.find(params[:id])
    @activity.update(activity_params)
    render :show
  end

  def destroy
    @activity = Activity.find(params[:id])
    if @activity.delete
      render json: "yes"
    else
      render json: { errors: @activity.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def activity_params
    params.require(:activity).permit(:prompt, :style, :options, :presenter_id)
  end
end
