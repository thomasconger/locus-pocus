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
  end

  def show
  end

  def update
  end

  def destroy
  end

  private

  def activity_params
    params.require(:activity).permit(:prompt, :type, :body, :presenter_id)
  end
end
