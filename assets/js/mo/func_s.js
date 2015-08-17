function s(a, st) { //Returns plural ending [$a = number to check [$b = plural ending [$c = singular ending]]]
	if(a == 0)
		return 'no ' + st + 's';
	return number_format(a) + ' ' + st + (a == 1 ? '' : 's');
}