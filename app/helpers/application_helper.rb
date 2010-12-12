module ApplicationHelper
  def init_on_client(*units)
    units_as_strings = units.map &:to_s
    @javascript_units ||= []
    @javascript_units = (@javascript_units + units_as_strings).uniq

    response.headers['X-JavascriptUnitInit'] = @javascript_units.join(' ')
  end

  def javascript_units
    @javascript_units ||= []
    @javascript_units.uniq.
      map { |u| add_prefix u  }.
      map { |c| replace_dots_with_dashes c }.join(" ")
  end

  private

  def add_prefix(unit_name)
    "with_js_unit_#{unit_name}"
  end

  def replace_dots_with_dashes(class_name)
    class_name.gsub '.', '-' 
  end
end

