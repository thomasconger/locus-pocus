class Activity < ApplicationRecord

  validates :user_id, presence: true

  belongs_to :user
  has_many :responses

end
