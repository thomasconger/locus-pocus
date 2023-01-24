class Activity < ApplicationRecord

  validates :user_id, presence: true
  validates :prompt, presence: true

  belongs_to :user

  has_many :responses,
    dependent: :destroy

end
