class String
  def colorize(c); "\e[#{c}m#{self}\e[0m" end
  def error; colorize("1;31") end
  def bold; colorize("1") end
  def status; colorize("1;34") end
  def titlecase
    self.gsub(/\w+/) do |word|
      word.capitalize
    end
  end
end


desc "Build API"
task :build do
  
  require 'csv'
  require 'json'
  
  # Start the timer
  start = Time.now
  
  puts "Parsing `_data/data.csv`".bold
  
  # Array containing all data
  data = []
  
  CSV.foreach("_data/data.csv", :encoding => "iso-8859-1:utf-8", :headers => true, :header_converters => :symbol) do |row|
    f = row.fields
    
    # Convert data types (booleans)
    f.map! do |f|
      if f == "Yes"
        true
      elsif f == "No"
        false
      elsif f == "NR"
        nil
      else
        f
      end
    end
    
    # Convert data types
    # f[0] # facility_code
    f[1].to_s.upcase! # institution
    f[2].to_s.upcase! # city
    f[3].to_s.upcase! # state
    unless f[4] == nil; f[4] = f[4].rjust(5, '0') end # zip
    f[5].to_s.upcase! # country
    # f[6] # type
    unless f[7] == nil; f[7] = f[7].to_i  end # cross
    unless f[8] == nil; f[8].tr!('"', '') end # ope
    unless f[9] == nil; f[9] = f[9].to_i  end # bah
    # f[10] # poe
    # f[11] # yr
    unless f[12] == nil; f[12] = f[12].to_i end # gibill
    # f[13] # student_veteran
    # f[14] # student_veteran_link
    # f[15] # vetsuccess_name
    # f[16] # vetsuccess_email
    # f[17] # eight_keys
    # f[18] # correspondence
    # f[19] # flight
    unless f[20] == nil; f[20] = f[20].to_f end # grad_rate
    unless f[21] == nil; f[21] = f[21].to_i end # grad_rate_rank
    unless f[22] == nil; f[22] = f[22].to_f end # default_rate
    unless f[23] == nil; f[23] = f[23].to_i end # avg_stu_loan_debt
    unless f[24] == nil; f[24] = f[24].to_i end # avg_stu_loan_debt_rank
    unless f[25] == nil; f[25] = f[25].to_i end # indicator_group
    # f[26] # salary
    # f[27] # calendar
    unless f[28] == nil; f[28] = f[28].to_i end # tuition_in_state
    unless f[29] == nil; f[29] = f[29].to_i end # tuition_out_of_state
    
    # Save row to array
    data.push Hash[row.headers[0..-1].zip(f[0..-1])]
  end
  
  puts "Writing `api/institutions.json`".bold
  
  # Array of only institutions, location, and their facility_code
  institutions = []
  
  data.each do |el|
    institutions.push Array[el[:facility_code], el[:institution],
                            el[:city], el[:state], el[:country]]
  end
  
  File.open("api/institutions.json", 'w') { |f| f.write(institutions.to_json) }
  
  puts "Writing institution data".bold
  
  data.each do |el|
    unless el[:facility_code] == nil
      dir_path = "api/#{el[:facility_code][0..2]}"
      FileUtils.mkdir_p dir_path
      File.open("#{dir_path}/#{el[:facility_code]}.json", 'w') { |f| f.write(JSON.pretty_generate(el)) }
    end
  end
  
  puts "Finished in #{(Time.now - start).round(2)} seconds".status
end

task :default => :build
