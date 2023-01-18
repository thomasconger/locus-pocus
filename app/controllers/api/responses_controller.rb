class Api::ResponsesController < ApplicationController
  wrap_parameters include: Response.attribute_names + ['password']

  def create
    @response = Response.new(response_params)
    if @response.save
      ActivityChannel.broadcast_to(@response.activity, @response)
      render :show
    else
      render json: { errors: @response.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
  end

  def show
    @response = Response.find(params[:id])
    if @response
      render :show
    else
      render json: { errors: "Response not found. " }, status: :unprocessable_entity
    end
  end

  def update
    @response = Response.find(params[:id])
    if @response && @response.update(response_params)
      render :show
    else
      render json: { errors: @response.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @response = Response.find(params[:id])
    if @response.delete
      render json: { "message": "The response was deleted"}
    else
      render json: { errors: @activity.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def response_params
    params.require(:response).permit(:body, :activity_id)
  end
end
