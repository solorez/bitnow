
var coinnow = {

    /**
     * 默认设置项
     */
    default_setting: {
        'coinkind': 'bitcoin',
        'bitcoin': 'OkCoin',
        'litecoin': 'OkCoin'
    },

    /**
     * 创建表格
     * @param market
     * @param data
     * @param coinkind
     * @param symbol
     * @returns {HTMLElement}
     */
    createTable : function(market, data, coinkind, symbol){

        var old_data_last = localStorage[market + '_' + coinkind + '_last'];
        var new_data_last = data['ticker']['last'];
        var cls = '';
        if (Number(new_data_last) > Number(old_data_last)){
            cls = 'success';
        }else if(Number(new_data_last) < Number(old_data_last)){
            cls = 'danger';
        }

        var tds = ['last', 'buy', 'sell', 'high', 'low', 'vol'];
        var tr = document.createElement('tr');
        tr.className = cls;

        var td_market = document.createElement('td');
        td_market.textContent = market;
        tr.appendChild(td_market);

        for(var i=0; i<tds.length; i++){
            var td = document.createElement('td');
            td.textContent = data['ticker'][tds[i]];
            tr.appendChild(td);
        }

        var td_symbol = document.createElement('td');
        td_symbol.textContent = symbol;
        tr.appendChild(td_symbol);
        return tr;
    },

    /**
     * 统一api获取的数据的格式
     * ['last', 'buy', 'sell', 'high', 'low', 'vol']
     * @param data
     * @returns {*}
     */
    dataConvert: function(market, data){
        if(market === 'BTC-E'){
            //当为BTC-E
            data['ticker']['vol'] = data['ticker']['vol_cur'];
        }else if(market === 'MtGox'){
            //当为MtGox时, fuck
            meta = ['last', 'buy', 'sell', 'high', 'low', 'vol']
            data['ticker'] = {};
            for(var i=0; i<meta.length; i++){
                data['ticker'][meta[i]] = data['return'][meta[i]]['value'].substr(0, 8);
            }
            //console.log(data);       //查看转换结果
        }else if(market === 'BTCTrade'){
            data['ticker'] = data;
        }
        return data;
    },

    /**
     *
     * @param url
     * @param coinkind
     * @param market
     * @param index
     * @param symbol
     */
    getMarket: function(url, coinkind, market, index, symbol){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4){
                var data = JSON.parse(xmlhttp.responseText);
                data = coinnow.dataConvert(market, data);               //格式转换
                coinnow.updateData(coinkind, market, index, symbol, data);      //更新表格
                localStorage[market + '_' + coinkind + '_last'] = data['ticker']['last'];         //保存数据
            }
        }
        xmlhttp.send();
    },

    /**
     *
     * @param coinkind
     * @param market
     * @param index
     * @param symbol
     * @param data
     */
    updateData: function(coinkind, market, index, symbol, data){
        var last_bitcoin = document.getElementById('last-bitcoin');
        var last_litecoin = document.getElementById('last-litecoin');
        var last_bitcoin_market = document.getElementById('last-bitcoin-market');
        var last_litecoin_market = document.getElementById('last-litecoin-market');
        var litecoin_tbody = document.getElementById('litecoin-tbody');
        var bitcoin_tbody = document.getElementById('bitcoin-tbody');


        var table = coinnow.createTable(market, data, coinkind, symbol);
        var info = "<p class='text-info'>" + 'Data Sources: ' + market + ' (' +  symbol+ ') ' + '</p>';

        //就让他冗余吧!
        if(coinkind === 'bitcoin'){
            if(market === localStorage.bitcoin){
                last_bitcoin.innerHTML = data['ticker']['last'];
                last_bitcoin_market.innerHTML = info;
                if (Math.abs(Number(data['ticker']['last']) - Number(localStorage.bitcoin_shuiping)) > Number(localStorage.bitcoin_yuzhi)){
                    webkitNotifications.createNotification('../image/bitcoin-icon.png', '通知', '比特币价格：' + data['ticker']['last']).show();
                    localStorage.bitcoin_yuzhi = Number(localStorage.bitcoin_yuzhi) + 100;
                }
            }
            bitcoin_tbody.replaceChild(table, bitcoin_tbody.childNodes[index]);
        }
        else{
            if(market === localStorage.litecoin){
                last_litecoin.innerHTML = data['ticker']['last'];
                last_litecoin_market.innerHTML = info;
                if (Math.abs(Number(data['ticker']['last']) - Number(localStorage.litecoin_shuiping)) > Number(localStorage.litecoin_yuzhi)){
                    webkitNotifications.createNotification('../image/litecoin-icon.png', '通知', '莱特币价格：' + data['ticker']['last']).show();
                    localStorage.litecoin_yuzhi = Number(localStorage.litecoin_yuzhi) + 5;
                }
            }
            litecoin_tbody.replaceChild(table, litecoin_tbody.childNodes[index]);
        }

        //修改 badgeText
        if(coinkind === localStorage.coinkind && market === localStorage[coinkind]){
            coinnow.setBadgeText(data['ticker']['last']);
            coinnow.setIcon(coinkind);
        }
    },

    /**
     * 设置icon
     * @param coinkind
     */
    setIcon: function(coinkind){
        var icon = '';
        if(coinkind === 'bitcoin'){
            icon = {'path': {'19': '../image/bitcoin-icon.png'}};
        }else{
            icon = {'path': {'19': '../image/litecoin-icon.png'}};
        }
        chrome.browserAction.setIcon(icon);
    },

    /**
     * 设置badgeText
     * 注意：只能显示4个字符
     * @param coinkind
     * @param data
     */
    setBadgeText: function(text){
        chrome.browserAction.setBadgeText({text: parseInt(text).toString()});
    },

    /**
     * 监听捐助按钮
     * @param text 点击之后需要显示的文字
     */
    donate: function(text){
        var donate_button = document.getElementsByClassName('donate-button')[0];
        var donate_address = document.getElementsByClassName('donate-address')[0];
        donate_button.onclick = function(){
            donate_button.innerHTML = text;
            donate_address.style.display = 'block';
        }
    }
}