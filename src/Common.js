export const isNumberKey = e => {
	if ((e.which >= 48 && e.which <= 57) || e.which === 8 || e.which === 46) {
		return;
	} else {
		e.preventDefault();
	}
};

export const isAnyKey = e => {
	return;
};

export const isEnterKey = key => {
	return key === 'Enter';
};
