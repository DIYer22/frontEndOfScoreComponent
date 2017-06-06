se = d3.select
sa = d3.selectAll


var flatColors = [
   '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
   '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
   '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
   '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
  ]

getFlatColor = (ind)=>{
    return flatColors[ind%flatColors.length]
}

var drawPie = (dataset,id,xy)=>{
  if(!xy){
    var width = 600, height = 300;
  }else{
    var width = xy[0], height = xy[1];
  }
  // 创建一个分组用来组合要画的图表元素
  $('#'+id).html(' ')
  
  var main = d3.select('#'+id).append('svg').attr({width:width,height:height}).append('g')
   .classed('main', true)
   .attr('transform', "translate(" + width/2 + ',' + height/2 + ')');

  // 转换原始数据为能用于绘图的数据
  var pie = d3.layout.pie()
   .sort(null)
   .value(function(d) {
    return d.value;
   });
  // pie是一个函数
  var pieData = pie(dataset);
  // 创建计算弧形路径的函数
  var radius = (width>height?height:width)/3;
  var arc = d3.svg.arc()
   .innerRadius(0)
   .outerRadius(radius);
  var outerArc = d3.svg.arc()
   .innerRadius(1.2 * radius)
   .outerRadius(1.2 * radius);
  var oArc = d3.svg.arc()
   .innerRadius(1.1 * radius)
   .outerRadius(1.1 * radius);
  var slices = main.append('g').attr('class', 'slices');
  var lines = main.append('g').attr('class', 'lines');
  var labels = main.append('g').attr('class', 'labels');
  // 添加弧形元素（g中的path）
  var arcs = slices.selectAll('g')
   .data(pieData)
   .enter()
   .append('path')
   .attr('fill', function(d, i) {
    return getColor(i);
   })
   .attr('d', function(d){
    return arc(d);
   });
  // 添加文字标签
  var texts = labels.selectAll('text')
   .data(pieData)
   .enter()
   .append('text')
   .attr('dy', '0.35em')
   .attr('fill', function(d, i) {
    return getColor(i);
   })
   .text(function(d, i) {
    return d.data.name+':'+d.data.value;
   })
   .style('text-anchor', function(d, i) {
    return midAngel(d)<Math.PI ? 'start' : 'end';
   })
   .attr('transform', function(d, i) {
    // 找出外弧形的中心点
    var pos = outerArc.centroid(d);
    // 改变文字标识的x坐标
    pos[0] = radius * (midAngel(d)<Math.PI ? 1.5 : -1.5);

    return 'translate(' + pos + ')';
   })
   .style('opacity', 1);

  var polylines = lines.selectAll('polyline')
   .data(pieData)
   .enter()
   .append('polyline')
   .attr('points', function(d) {
    return [arc.centroid(d), arc.centroid(d), arc.centroid(d)];
   })
   .attr('points', function(d) {
    var pos = outerArc.centroid(d);
    pos[0] = radius * (midAngel(d)<Math.PI ? 1.5 : -1.5);
    return [oArc.centroid(d), outerArc.centroid(d), pos];
   })
   .style('opacity', 0.5);
 
  function midAngel(d) {
  return d.startAngle + (d.endAngle - d.startAngle)/2;
  }
  function getColor(idx) {
  var palette = [
   '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
   '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
   '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
   '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
  ]
  return palette[idx % palette.length];
  }
}
// 测试代码
// var pieTestDataset = [
// {name: '购物', value: 983},
// {name: '日常饮食', value: 300},
// {name: '医药', value: 1400},
// {name: '交通', value: 402},
// {name: '杂费', value: 134}
// ];

// drawPie(pieTestDataset,'drawPie')




var scoreToGpa = (x, getStr)=>{
    var level,gpas,gpa
    if((95 <= x)&&(x <= 100)){
        level="A+"
        gpas="4.33"
        gpa=4.33
    }
    if((90 <= x)&&(x <= 94)){
        level="A"
        gpas="4.00"
        gpa=4.00
    }
    if((85 <= x)&&(x <= 89)){
        level="A-"
        gpas="3.67"
        gpa=3.67
    }
    if((82 <= x)&&(x <= 84)){
        level="B+"
        gpas="3.33"
        gpa=3.33
    }
    if((78 <= x)&&(x <= 81)){
        level="B"
        gpas="3.00"
        gpa=3.00
    }
    if((75 <= x)&&(x <= 77)){
        level="B-"
        gpas="2.67"
        gpa=2.67
    }
    if((72 <= x)&&(x <= 74)){
        level="C+"
        gpas="2.33"
        gpa=2.33
    }
    if((68 <= x)&&(x <= 71)){
        level="C"
        gpas="2.00"
        gpa=2.00
    }
    if((64 <= x)&&(x <= 67)){
        level="C-"
        gpas="1.67"
        gpa=1.67
    }
    if((61 <= x)&&(x <= 63)){
        level="D+"
        gpas="1.33"
        gpa=1.33
    }
    if((60 <= x)&&(x <= 60)){
        level="D"
        gpas="1.00"
        gpa=1.00
    }
    if((0 <= x)&&(x <= 59)){
        level="F"
        gpas="0.00"
        gpa=0.00
    }
    if(getStr){
      return [gpa, gpas]
    }else{
      return gpa
    }
}
// range(x=>scoreToGpa(x),100)


function setSelfInfo(title,d,order) {
  // 对设置一个组件 title 名字 ; 
  // d kv对象k为中文 ; order 顺序
    var obj = {d:d,title:title||""}
    obj.render = function () {
        se("#selfInfoPanel").html("")
        var div = se("#selfInfoPanel").append("div").attr('class',"panel panel-default")
        div.append('div').attr('class',"panel-heading").append('h4').text(obj.title)
        var dl = div.append('dl').attr("class", "dl-horizontal")
        for(var k of order){
                dl.append('dt').text(k)
                dl.append('dd').text(obj.d[k])
        }
        return obj
    }
    return obj
}

ajax = (url, data, f)=>{
  $.ajax({
    url:'/'+url,
    data: data?{data:data}:null,
    type:'get',
    dataType:'jsonp', 
    success: f,
    error: function (error , data, status) {
      console.log(JSON.stringify(error));
    }
  });
}


var checkTemple = '<div style="" class="col-sm-offset-1 col-sm-10"><div class="checkbox scChecks"><label><input type="checkbox" onclick="javascript:{fun}" id="{id}">{name}</label></div></div>'
_checkFuns = {}
setChecks = (id,checks,f,checked)=>{
    f = f||((x,y)=>console.log(x,y))
    _checkFuns[id] = function(thiss){
        var name = $(thiss).attr('id')
        var tag = $(thiss)[0].checked
        f(name,tag)
    }
    var funName = '_checkFuns.'+id+'(this)'
    $('#'+id).html('')
    for(var name of checks){
        var html = checkTemple.format({
          name:name,
          id:name,
          fun:funName,
        })
        $('#'+id)[0].append($(html)[0])
    }
    if(checked){
      $('#'+id+' input').attr("checked","checked")
    }
}
getChecksValue = (id)=>{
    var checks = $('#'+id+' input')
    var l = []
    for (var i = 0; i < checks.length; i++) {
        l.push([checks[i].id,checks[i].checked])
    };
    return dict(l)
}


/**
* 将html的table转成Excel的data协议类型数据，不支持ie
*   table 是HTML DOM Document 对象
× name 是sheet的名称
*/
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
                             + '<head><meta http-equiv="Content-type" content="text/html;charset=UTF-8" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>'
                             + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g, function(m, p) {
                    return c[p];
                })
            };
 
    return function(table, name) {
        var ctx = {
            worksheet : name || 'Worksheet',
            table : table.innerHTML
        }
        return uri + base64(format(template, ctx));
    }
})();
 

function setDownXls(button,tableId,name){
    $('#'+button).on('click', function(){
        var $this = $(this);
        //设定下载的文件名及后缀
        $this.attr('download', name+'.xls');
        //设定下载内容
        $this.attr('href', tableToExcel($('#'+tableId)[0], name));
    });
};




