// filter.js 过滤器集合
import accounting from "accounting";
import moment from "moment";

//定义用的路由集合
let arrFilder = [
	require('pages/home/filter'),
	require('pages/barcode/filter'),
	require('pages/users/filter'),
	require('pages/customerGather/filter'),
	require('pages/error/filter'),
];

let json = {};

//合并过滤器
if (arrFilder.length) {
	for (var i = 0; i < arrFilder.length; i++) {
		json = Object.assign(json, arrFilder[i]);
	}
}

json = Object.assign(json, {
	// 转换为大写
	uppercase(value) {
		if (!value) return;
		return value.toString().toUpperCase();
	},
	// 转换为小写
	lowercase(value) {
		if (!value) return;
		return value.toString().toLowerCase();
	},
	//货币过滤器
	currency(value, symbol, digit, bwf, gwf) {
		if (!value) return symbol || "¥" + "0.00";
		return accounting.formatMoney(value, symbol || "¥", digit || 2, bwf || ",", gwf || "."); // ¥4,999.99
	},
	// 时间过滤器
	date(value, gengefu, full) {
		if (!value) return;
		let ty = gengefu || "-";
		if (full) {
			return moment(value).format("YYYY" + ty + "MM" + ty + "DD HH:mm:ss");
		} else {
			return moment(value).format("YYYY" + ty + "MM" + ty + "DD");
		}
	},
	//limitTo过滤器
	limitTo(value, num) {
		if (!value) return;
		var text = "";
		if (value.length < num) {
			text = value;
		} else {
			text = value.substring(0, num) + "...";
		}
		return text;
	},
	// 图片地址过滤器
	imgBaseUrl(img) {
		if (!img) return require("common/images/gods-default-icon.png");
		if (img.indexOf("http:") !== -1 || img.indexOf("HTTP:") !== -1 || img.indexOf("https:") !== -1 || img.indexOf("HTTPS:") !== -1) {
			return img + "?imageView2/2/w/750";
		} else {
			return config.imgBaseUrl + img + "?imageView2/2/w/750";
		}
	},
	// 是否是web首页进入活动页面
	webHomeGoToActive(href){
		if(!href) return "";
		href = href.indexOf("?") != -1 ? href.replace(/\?/,"?webIn=true&"):
			href+"?webIn=true";
		return href;
	}
});

module.exports = json;
