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
  end

  def update
  end

  def destroy
  end

  private

  def activity_params
    params.require(:activity).permit(:prompt, :style, :options, :presenter_id)
  end
end
