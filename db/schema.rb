# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120717092219) do

  create_table "bills", :force => true do |t|
    t.string   "code"
    t.text     "Particulars"
    t.string   "advance"
    t.string   "net"
    t.string   "gross"
    t.string   "vatamt"
    t.string   "amount"
    t.string   "balance"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "customer_id"
    t.string   "unpaid"
    t.string   "discount"
    t.string   "planecharge"
    t.string   "total_cft"
    t.string   "total_sqft"
    t.string   "total_ft"
  end

  create_table "customers", :force => true do |t|
    t.string   "name"
    t.text     "address"
    t.string   "phoneno"
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "balance"
  end

  create_table "items", :force => true do |t|
    t.integer  "bill_id"
    t.integer  "product_id"
    t.integer  "sold_qty",     :limit => 255
    t.string   "rate"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
    t.string   "size"
    t.string   "length"
    t.string   "no"
    t.integer  "dimensions"
    t.decimal  "vat"
    t.string   "total_amount"
    t.string   "cft"
  end

  create_table "products", :force => true do |t|
    t.string   "name"
    t.string   "code"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "category"
    t.decimal  "size1"
    t.decimal  "size2"
  end

  create_table "rails_admin_histories", :force => true do |t|
    t.text     "message"
    t.string   "username"
    t.integer  "item"
    t.string   "table"
    t.integer  "month",      :limit => 2
    t.integer  "year",       :limit => 5
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  add_index "rails_admin_histories", ["item", "table", "month", "year"], :name => "index_rails_admin_histories"

  create_table "stocks", :force => true do |t|
    t.integer  "product_id"
    t.integer  "quantity"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "cost"
    t.integer  "bill_id"
    t.integer  "supplier_id"
    t.integer  "code"
  end

  create_table "suppliers", :force => true do |t|
    t.string   "name"
    t.string   "phoneno"
    t.text     "address"
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "total_stocks", :force => true do |t|
    t.integer  "product_id"
    t.integer  "total_quantity"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "username"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
