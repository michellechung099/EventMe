class EventTicket < ApplicationRecord
  belongs_to :event

  belongs_to :user

  has_many :tickets,
    dependent: :destroy
end
