class Api::UsersController < ApplicationController
  wrap_parameters include: Response.attribute_names + ['password']

  def create
    
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

  def response_params
    params.require(:response).permit(:email, :username, :password)
  end
end
