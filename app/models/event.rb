# == Schema Information
#
# Table name: events
#
#  id              :bigint           not null, primary key
#  title           :string           not null
#  user_id         :bigint           not null
#  event_type      :string
#  category        :string
#  location        :string           not null
#  start_time      :datetime         not null
#  end_time        :datetime         not null
#  recurring       :boolean          default(FALSE)
#  summary         :text             not null
#  ticket_quantity :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  description     :text
#
class Event < ApplicationRecord
  validates :title, :user_id, :location, :start_time, :end_time, :summary, :ticket_quantity, presence: true
  validates :title, length: { maximum: 75 }
  validates :summary, length: { maximum: 140 }
  validates :ticket_quantity, numericality: { only_integer: true }
  # validates :event_type, allow_blank: true, if: :event_type_present?
  # validates :category, allow_blank: true, if: :category_present?

  belongs_to :user,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id

  has_one_attached :photo

  has_many :tickets,
    dependent: :destroy 

  # def event_type_present?
  #   event_type.present?
  # end

  # def category_present?
  #   category.present?
  # end
end
