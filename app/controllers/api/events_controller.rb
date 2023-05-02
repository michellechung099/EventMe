class Api::EventsController < ApplicationController
  before_action :require_logged_in, only: :create
  wrap_parameters include: Event.attribute_names + [:photo, :userId,:startTime, :endTime, :ticketQuantity], format: :multipart_form

  def index
    # render all events under a key of events
    @events = Event.all
    render 'api/events/index'
  end

  def create
    # use strong params to create new Event
    # if it saves successfully, render it as JSON under a key of event
    # if it fails any validations, render full error messages under a key of errors with status 422
    @event = Event.new(event_params)
    if @event.save
      render 'api/events/show'
    else
      render json: { errors: @event.errors.full_messages }, status: 422
    end
  end

  def show
    # render the event specified by params[:id] under key of event
    @event = Event.find(params[:id])
    render 'api/events/show'
  end

  private
  def event_params
    params.require(:event).permit(
      :title,
      :user_id,
      :type,
      :category,
      :location,
      :start_time,
      :end_time,
      :recurring,
      :summary,
      :ticket_quantity,
      :photo,
      :description
    )
  end
end
