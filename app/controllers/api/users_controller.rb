class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password'] + ['activity_id']

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: "Cannot find user"
    end
  end

  def update
    @user = User.find(params[:id])
    if @user&.update(user_params)
      render :show
    end
    # if @user&.update(live_activity_id: )
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :live_activity_id, :activityId)
  end
end
