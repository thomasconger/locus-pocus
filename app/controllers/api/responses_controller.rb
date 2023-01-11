class Api::ResponsesController < ApplicationController
  wrap_parameters include: Response.attribute_names + ['password']

  def create
    @response = Response.new(response_params)
    if @response.save
      render :show
    else
      render json: { errors: @response.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
  end

  def show
    @responses = Activity.find(params[:id]).responses
    render :show
  end

  def update
  end

  def destroy
  end

  private

  def response_params
    params.require(:response).permit(:body, :activity_id)
  end
end
