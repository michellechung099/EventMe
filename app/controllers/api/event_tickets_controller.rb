class Api::EventTicketsController < ApplicationController
  before_action :require_logged_in
  wrap_parameters include: EventTicket.attribute_names

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

  private

  def event_ticket_params
    params.require(:event_ticket).permit(
      :event_id,
      :name,
      :unit_price,
      :quantity,
      :sales_start_time,
      :sales_end_time
      # might want to get rid of name for now
      # later, can put name back in to allow filtering & update tickets in accordance
      # as well as filter for purchase
      # for now, i can also just change one event to have one ticket name
    )
  end
end
