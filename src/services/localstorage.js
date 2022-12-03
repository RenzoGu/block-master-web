var localStore = function(key) {
	var setExpiryTime = function(timeInDs) {
		retention_period = timeInDs*24*60*60*1000;
	};

	var retention_period = setExpiryTime(60); // 1 hour
	
	var get = function() {
		var prevValue = JSON.parse(window.localStorage.getItem(key) || "{}");
		if(Object.keys(prevValue).length > 0) {
			if(Date.now() - prevValue.timestamp > retention_period) {
				window.localStorage.removeItem(key);
				return undefined;
			} else {
				return prevValue.value;
			}
		} else {
			return undefined;
		}
	};
	
	var set = function(value) {
		var storeData = {
			timestamp: Date.now(),
			key : key,
			value : value || ""
		};
		window.localStorage.setItem(key, JSON.stringify(storeData));
	};

	var remove = function() {
		const item = JSON.parse(window.localStorage.getItem(key));
		if(item) {
			window.localStorage.removeItem(key);
		}
	}

	return {
		setExpiryTime,
		get,
		set,
		remove
	}
};

export default localStore