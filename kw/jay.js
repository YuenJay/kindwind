localforage.config({
    driver      : localforage.LOCALSTORAGE, // Force WebSQL; INDEXDDB
    name        : 'kw',
    version     : 1.0,
    storeName   : 'KindWind', 
    description : 'Ha Ha Ha'
});
//https://github.com/YuenJay/kindwind 

var KindWind = {};
(function(_){
    String.prototype.format = function() {
        var a = arguments;
        return this.replace(/\%(\d+)/g, function(m, i) { return a[i-1]; });
    }
    String.prototype.replaceAll = function(f,r){
       return this.split(f).join(r);
    }
    _.res = [];
    _.eval = eval;
    _.name = "KindWind";
    _.version = "1.0"; 
    _.toString=function(){
        return "%1 Ver:%2".format(_.name,_.version);
    }
    for (var i in antd){
      window[i] = antd[i];
    }
    _.ajax = function(u,a,c){
        $.ajax({ 
            async: a, 
            dataType: "text",
            url:u,
            success:function(res){
                _.eval(Babel.transform(res,{
                    presets:['es2015',['react'],'stage-0']
                }).code);
                if (c){c()}
            }
        });
    }
    window.require = function(u){
        if (/^[a-zA-z].[a-zA-Z0-9]+$/.test(u)){
            return window[u];
        }
        window.exports = {};
        var s = !1;
        for (var d in _.res)if (_.res[d].u == u)s=d;
        if (s){return _.res[s].e}
        _.ajax(u,!1);
        _.res.push({u:u, e:exports }); return exports;
    }
    _.import = function (u,d,c){
        window.mountNode = document.getElementById(d);
        _.ajax(u,!0,c);
    }
    window._ = _;
})(KindWind);