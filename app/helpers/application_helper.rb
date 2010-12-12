module ApplicationHelper
  def init_on_client(*units)
    units_as_strings = units.map(&:to_s).map { |u| add_root_object_name u }
    @javascript_units ||= []
    @javascript_units = (@javascript_units + units_as_strings).uniq

    response.headers['X-JavascriptUnits'] = @javascript_units.join(' ') if request && request.xhr?
  end

  def javascript_units
    @javascript_units ||= []
    @javascript_units.uniq.
      map { |u| add_prefix u  }.
      map { |c| replace_dots_with_dashes c }.join(" ")
  end

  private

  def add_root_object_name(unit_name)
    "JstructureDemo.#{unit_name}"
  end

  def add_prefix(unit_name)
    "with_js_#{unit_name}"
  end

  def replace_dots_with_dashes(class_name)
    class_name.gsub '.', '-' 
  end
end

