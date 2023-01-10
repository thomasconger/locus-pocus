class CreateResponses < ActiveRecord::Migration[7.0]
  def change
    create_table :responses do |t|
      t.json :body, null: false
      t.references :activity, foreign_key: true, null: false

      t.timestamps
    end
  end
end
