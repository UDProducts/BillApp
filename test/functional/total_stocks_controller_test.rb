require 'test_helper'

class TotalStocksControllerTest < ActionController::TestCase
  setup do
    @total_stock = total_stocks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:total_stocks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create total_stock" do
    assert_difference('TotalStock.count') do
      post :create, total_stock: @total_stock.attributes
    end

    assert_redirected_to total_stock_path(assigns(:total_stock))
  end

  test "should show total_stock" do
    get :show, id: @total_stock
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @total_stock
    assert_response :success
  end

  test "should update total_stock" do
    put :update, id: @total_stock, total_stock: @total_stock.attributes
    assert_redirected_to total_stock_path(assigns(:total_stock))
  end

  test "should destroy total_stock" do
    assert_difference('TotalStock.count', -1) do
      delete :destroy, id: @total_stock
    end

    assert_redirected_to total_stocks_path
  end
end
