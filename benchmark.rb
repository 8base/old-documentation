require 'date'

diff = File.read('./diff.txt').split(/\n/)
logs = File.read('./logs.txt').split(/\n/)

authors = []
dates = []
lines = []
files = []

authorLogs = {}

diff.each do |line|
	files << line if line.match('\+\+\+')
	lines << line if line.match('\+')
end

logs.each do |line|
	if line.match('Date:')
		dates << Date.parse(line.split('Date:   ').last)
	end

	if line.match('Author:')
		authors << line

		authorLogs[line] = 0 if authorLogs[line].nil?
		authorLogs[line] += 1
	end
end

# report = {
# 	authors: authors.uniq.length,
# 	files: files.length,
# 	lines: lines.length,
# 	commits: dates.length,
# 	start: dates.sort.first,
# 	end: dates.sort.last,
# 	diff: diff.length
# }


authorLogs.each do |k, v|
	puts "#{k}: #{v}"
end