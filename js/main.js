
//初始化设置
localStorage.coinkind = localStorage.coinkind ? localStorage.coinkind : coinnow.default_setting.coinkind;
localStorage.bitcoin = localStorage.bitcoin ? localStorage.bitcoin : coinnow.default_setting.bitcoin;
localStorage.litecoin = localStorage.litecoin ? localStorage.litecoin : coinnow.default_setting.litecoin;

var litecoin_now = function(){
    coinnow.getMarket('https://www.okcoin.com/api/ticker.do?symbol=ltc_cny', 'litecoin', 'OkCoin', 0, "¥");
    coinnow.getMarket('https://btc-e.com/api/2/ltc_usd/ticker', 'litecoin', 'BTC-E', 1, "$");
}
setInterval(litecoin_now, 2500);


var bitcoin_now = function(){
    coinnow.getMarket('https://www.okcoin.com/api/ticker.do', 'bitcoin', 'OkCoin', 0, "¥");
    coinnow.getMarket('https://data.btcchina.com/data/ticker', 'bitcoin', 'BTCChina', 1, "¥");
    coinnow.getMarket('http://www.btctrade.com/api/ticker', 'bitcoin', 'BTCTrade', 2, "¥");
    coinnow.getMarket('http://data.mtgox.com/api/1/BTCUSD/ticker', 'bitcoin', 'MtGox', 3, "$");
    coinnow.getMarket('https://btc-e.com/api/2/btc_usd/ticker', 'bitcoin', 'BTC-E', 4, "$");
}
setInterval(bitcoin_now, 2500);

//监听捐助按钮
coinnow.donate("Thanks for your support! Here is the author contact information and Bitcoin wallet address");