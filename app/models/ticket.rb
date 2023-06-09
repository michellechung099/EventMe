# == Schema Information
#
# Table name: tickets
#
#  id               :bigint           not null, primary key
#  event_id         :bigint           not null
#  name             :string           not null
#  price            :decimal(, )      not null
#  quantity         :integer          not null
#  sales_start_time :datetime         not null
#  sales_end_time   :datetime         not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Ticket < ApplicationRecord
  validates :quantity, presence: true
  validates :quantity, numericality: { greater_than: 0 }

  belongs_to :buyer,
    class_name: "User",
    optional: true

  belongs_to :event_ticket
end
