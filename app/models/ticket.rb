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
  validates :event_id, :name, :price, :quantity, :sales_start_time, :sales_end_time, presence: true
  validates :name, length: { maximum: 50 }

  belongs_to :event

  belongs_to :user
end
