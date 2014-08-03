var bitcoin_shuiping = document.getElementById('bitcoin-shuiping');
var bitcoin_yuzhi = document.getElementById('bitcoin-yuzhi');
var litecoin_shuiping = document.getElementById('litecoin-shuiping');
var litecoin_yuzhi = document.getElementById('litecoin-yuzhi');
var form = document.forms[0];
var coinkind = form.coinkind;
var bitcoin = form.bitcoin;
var litecoin = form.litecoin;

/**
 * 初始化
 */
function init(){
    bitcoin_shuiping.value = parseInt(localStorage[localStorage.bitcoin + '_bitcoin_last']);
    litecoin_shuiping.value = parseInt(localStorage[localStorage.litecoin + '_litecoin_last']);
    if(localStorage.bitcoin_yuzhi){
        bitcoin_yuzhi.value = localStorage.bitcoin_yuzhi;
    }
    if(localStorage.litecoin_yuzhi){
        litecoin_yuzhi.value = localStorage.litecoin_yuzhi;
    }

    for(var i=0; i< coinkind.length; i++){
    if(coinkind[i].value === localStorage.coinkind){
        coinkind[i].checked = true;
    }
    }

    for(var b=0; b<bitcoin.options.length; b++){
        if(bitcoin.options[b].value === localStorage.bitcoin){
            bitcoin.options[b].selected = true;
        }
    }

    for(var l=0; l<litecoin.options.length; l++){
        if(litecoin.options[l].value === localStorage.litecoin){
            litecoin.options[l].selected = true;
        }
    }
}

init();
form.onsubmit = function(){
    //显示设置
    for(var i=0; i< coinkind.length; i++){
        if(coinkind[i].checked){
            localStorage.coinkind = coinkind[i].value;
            coinnow.setIcon(localStorage.coinkind);
        }
    }

    for(var b=0; b<bitcoin.options.length; b++){
        if(bitcoin.options[b].selected){
            localStorage.bitcoin = bitcoin.options[b].value;
        }
    }

    for(var l=0; l<litecoin.options.length; l++){
        if(litecoin.options[l].selected){
            localStorage.litecoin = litecoin.options[l].value;
        }
    }

    //存储报警设置
    localStorage.bitcoin_shuiping = bitcoin_shuiping.value;
    localStorage.bitcoin_yuzhi = bitcoin_yuzhi.value;
    localStorage.litecoin_shuiping = litecoin_shuiping.value;
    localStorage.litecoin_yuzhi = litecoin_yuzhi.value;

    alert('保存成功!');

}