
function deepCopy(p, c) {
	// c = c ||((p.constructor === Array)?[]: {});
    c = (p.constructor === Array)?[]: {}
	for (var i in p) {
		if (typeof p[i] === 'object' && p[i] != null) {
            if(!(typeof c[i] === 'object' && p[i].constructor==c[i].constructor))
            {
                c[i] = (p[i].constructor === Array) ? [] : {};
            }
			c[i]=deepCopy(p[i], c[i]);
		} else {
			c[i] = p[i];
		}
	}
	return c;
}
function items(obj){ // dic.items() in Python
    var arr = [];
    for(var item in obj){
        arr.push([item,obj[item]]);
    }
    return arr;
}
function zip (arr1, arr2) {
    var obj = []
    for (var i = 0; i < arr1.length; i++) {
        obj.push([arr1[i],arr2[i]])
    }
    return obj
}

function dict(zipedDic){
    var dic = {}
    for(var kv of zipedDic){
        dic[kv[0]] = kv[1]
    }
    return dic
}
int = parseInt
float = parseFloat
round = function(x,y) {
    if(arguments.length == 1){
        return Math.round(x)
    }
    return Math.round(x*Math.pow(10,y))/Math.pow(10,y)
}

pow = Math.pow
log = console.log
logg = (x)=> log(x)||x  // log(x) and return x

info = console.info
table = console.table
len= (x)=>x.length
str = (x,print,deep)=>{
    deep = print===undefined?0:deep
    print=print===undefined?true:print
    var strr=""

    if(typeof x=='object'){
        strr+='\n'
        for (var i in x) {
            strr+=range(()=>'  ',deep).join(' ')+i+': '+str(x[i],false,deep+1)+',\n'
        };
        strr= strr.slice(0,strr.length-2)
    }else{
        strr+=x.toString()
    }
    if(print){
        log(strr)
    }else{
        return strr
    }
}

max=(x)=>{
    var m=x[0]
    for (var i = 0; i < x.length; i++) {
        m=x[i]>m?x[i]:m
    };
    return m
}
rn = (x)=>int(x*Math.random())
sum = (arr)=>{
        var summ = 0
        for (var i in arr){
                summ += arr[i]
        }
        return summ
}
function range (f,n,max) {
	// 1.Python 用法
	// 2.执行 f(n['property']) 并返回新的 [] 或 {}
	// range(10) =>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	// range(x=>x*2,5,10) =>[10, 12, 14, 16, 18]
	// range(x=>x+x,['a', 'b', 'c'])
	// =>["aa", "bb", "cc"]

	var flag = (typeof f == "number")

	if(flag){
		max =(typeof n == "number")?n:max
		n = f
		f = x=>x
	}
	var items = n
	var obj = (n.constructor === Array)?[]:{}
	if(typeof n == "number"){
		obj = []
		items = []
		var i=max?n:0
		max=max||n
		while(i!=max){items.push(i);i++}
	}

 	for (var i in items) {
 		obj[i]=f(items[i])
 	}
 	return obj
 }

 encodeJson = JSON.stringify
 decodeJson = JSON.parse

 window._requstingTags={} // 记录哪些Ajax正在请求
 getJson = (key, obj, callBack,tag)=>{  
 // 配合flask中的函数使用 
 // 调用sever端的key(obj)函数 并执行callBack
 // tag 为string 将用于阻塞重复tag的请求
    var f = callBack
    if(tag){
        if(typeof tag != 'string')tag = key;
        if(window._requstingTags[tag]&&window._requstingTags[tag].blocked){
            window._requstingTags[tag].next = obj
            return; // tag为true,则阻塞 return
        }else{
            window._requstingTags[tag] = window._requstingTags[tag]?window._requstingTags[tag]:{}
            window._requstingTags[tag].blocked = true
            window._requstingTags[tag].next = obj
            f = (d)=>{
                callBack(d)
                window._requstingTags[tag].blocked = false
                if(!(obj===window._requstingTags[tag].next)){
                    // log('obj',obj);
                    // log('next',window._requstingTags[tag].next)
                    getJson(key, window._requstingTags[tag].next, callBack,tag)
                }
            }
        }
    }
    var tmp = {}
    tmp[key] = obj
    // log(tmp,obj)
    $.getJSON('/getJson/'+JSON.stringify(tmp),
        null,
        f
        )
    }
String.prototype.replaceAll = function (exp, newStr) {
    return this.replace(new RegExp(exp, "gm"), newStr);
};
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }

    var data = arguments;        //如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        //如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replaceAll("{" + key + "}", value);
        }
    }   
    return result;
}
    	
        