/**
 * 根据参数设置时间显示的范围
 */
;
(function($) {
	$.fn.dateScope = function(options) {
		return new DateScope(this, options);
	}
	var DateScope = function(element, options) {
		var _ = this;
		_.el = $(element);
		_.selVal = '';
		_.init(options);
	}
	DateScope.prototype = {
		init: function(options) {
			var _ = this;
			_.opts = $.extend({}, {
				defaultDate: new Date(),
				dayLen: 30, //天长度
				firstDate: ''
			}, options);
			var _year = _.opts.defaultDate.getFullYear();
			var _month = _.opts.defaultDate.getFullYear();
			var _day = _.opts.defaultDate.getFullYear();
			var yearArray = [],
				monthArray = [],
				dayArray = [];
			for (var i = 0; i <= _.opts.dayLen; i++) {
				var obj = _.getBeforeDate(i, _.opts.defaultDate);
				//console.log("序号："+i);
				if (obj != null) {
					yearArray.push({
						value: obj[0].year,
						text: obj[0].year + "年"
					});
					monthArray.push({
						value: obj[0].month,
						text: obj[0].month + "月",
						year: obj[0].year
					});
					dayArray.push({
						value: obj[0].day,
						text: obj[0].day + "日",
						year: obj[0].year,
						month: obj[0].month
					});
				}
			}

			var dateSelect = _.el.AIPicker({
				fields: [{
					id: 'year',
					content: function(datas) {
						return _.arrayDedup(yearArray);
					}
				}, {
					id: 'month',
					content: function(datas) {
						var _mon = _.arrayDedup(monthArray);
						var _return = [];
						for (var i = 0; i < _mon.length; i++) {
							if (datas['year'] == _mon[i]['year']) {
								_return.push(_mon[i]);
							}
						}
						return _return;
					},
					reload: true
				}, {
					id: 'day',
					content: function(datas) {
						var _day = _.arrayDedup(dayArray);
						var _re = [];
						/*判断是否是和我的月份相同是的话返回我的数据*/
						for (var i = 0; i < _day.length; i++) {
							if (datas['month'] == _day[i]['month'] && datas['year'] == _day[i]['year']) {
								_re.push(_day[i]);
							}
						}
						return _re;
					},
					reload: true
				}],
				buttons: [{
					text: '取消',
					action: function(datas) {
						return;
					}
				}, {
					text: '确定',
					action: function(datas) {
						year = datas.year.text;
						mon = datas.month.text;
						day = datas.day.text;
						s = year + mon + day;
						_.selVal = new Date(datas.year.value, datas.month.value - 1, datas.day.value);
						_.el.val(s);
					}
				}],
				options: {
					rowNum: 5
				}
			});
			dateSelect.set({
				'year': _year,
				'month': _month,
				'day': _day
			});
		},
		getBeforeDate: function(num, date) {
			var _ = this;
			var n = num;
			var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			var year = d.getFullYear();
			var mon = d.getMonth() + 1;
			var day = d.getDate();
			if (day <= n) {
				if (mon > 1) {
					mon = mon - 1;
				} else {
					year = year - 1;
					mon = 12;
				}
			}
			d.setDate(d.getDate() - n);
			year = d.getFullYear();
			mon = d.getMonth() + 1;
			day = d.getDate();
			var _group = new Date(year, mon, day);
			var s = [];
			if (_.opts.firstDate == '') {
				s.push({
					"year": year,
					"month": mon,
					"day": day,
				});
				return s;
			} else {
				var data_arr = _.opts.firstDate.split('-');
				var y = parseInt(data_arr[0]);
				var m = parseInt(data_arr[1]);
				var dd = parseInt(data_arr[2]);
				var _dd = new Date(y, m, dd);
				if (_group.valueOf() >= _dd.valueOf()) {
					s.push({
						"year": year,
						"month": mon,
						"day": day,
					});
					return s;
				}
			}
		},
		arrayDedup: function(arr) { //去除重复对象
			var unique = {};
			arr.forEach(function(gpa) {
				unique[JSON.stringify(gpa)] = gpa
			});
			arr = Object.keys(unique).map(function(u) {
				return JSON.parse(u)
			});
			return arr;
		},
		getSelectValue: function() {
			return this.selVal;
		},
		getSelectValueStr: function() {
			var date_str = this.selVal;
			var _yyyy = date_str.getFullYear(),
				_mm = date_str.getMonth() + 1,
				_ddd = date_str.getDate();
			return _yyyy + '-' + (_mm < 10 ? ('0' + _mm) : _mm) + '-' + (_ddd < 10 ? ('0' + _ddd) : _ddd);
		}
	}
})(jQuery)