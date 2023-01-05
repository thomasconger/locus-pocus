class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.string :prompt, null: false
      t.string :type, null: false
      t.json :body, null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
