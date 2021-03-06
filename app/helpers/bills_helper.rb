module BillsHelper
  def income_chart_series(bills,start_time)
   bills_by_day = Bill.where(:created_at => start_time.beginning_of_day..Time.zone.now.end_of_day).
                  group("date(created_at)").
                  select("created_at,sum(amount) as totalamount")
      (start_time.to_date..Date.today).map do|date|
      bill=bills_by_day.detect{ |bill| bill.created_at.to_date == date }
      bill && bill.totalamount.to_f||0
      end
  end
end
