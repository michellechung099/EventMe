class Api::EventTicketsController < ApplicationController
  before_action :require_logged_in
  wrap_parameters include: EventTicket.attribute_names

  def index
    @tickets = EventTicket.where(user_id: current_user.id)
    render 'api/event_tickets/index'
  end

  def show
    @ticket = EventTicket.find(params[:id])
    render 'api/event_tickets/show'
  end

  def create
    @event = Event.find(params[:event_id])
    @ticket = EventTicket.new(event_ticket_params)
    @ticket.user_id = current_user.id
    @ticket.event_id = params[:event_id]
    @event.ticket_quantity += params[:event_ticket][:quantity].to_i
    @event.save!

    if @ticket.save!
      render :show
    else
      render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @event = Event.find(params[:event_id])
    @ticket = EventTicket.find(params[:id])
    @event.ticket_quantity = params[:event_ticket][:quantity].to_i
    @event.save!

    # debugger

    if @ticket.update(event_ticket_params)
      render :show
    else
      render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def event_ticket_params
    params.require(:event_ticket).permit(
      :name,
      :unit_price,
      :quantity,
      :sales_start_time,
      :sales_end_time
    )
  end
end
