var rawCourses = [{
    "course_id":"CS1003",
    "course_name":"多媒体信息处理技术",
    "teacher_id":"10041",
    "course_major":"计算机科学与技术",
    "course_numbers":60,
    "course_credit":3,
    "course_term":4,
    "course_type":2,
    "course_room":null
},{"course_id":"CS1007","course_name":"算法设计与分析","teacher_id":"10041","course_major":"计算机科学与技术","course_numbers":220,"course_credit":2,"course_term":3,"course_type":2,"course_room":null},{"course_id":"CS1008","course_name":"信息安全","teacher_id":"10041","course_major":"计算机科学与技术","course_numbers":20,"course_credit":1,"course_term":4,"course_type":2,"course_room":null},{"course_id":"KJ0003","course_name":"微观经济学","teacher_id":"10041","course_major":"会计学","course_numbers":20,"course_credit":6,"course_term":1,"course_type":3,"course_room":null}]

var course = rawCourses[0]

var courseWebDbDic = {
    code:"course_id",//
    name:"course_name",//
    id:"teacher_id",
    major:"course_major",
    num:"course_numbers",//
    credit:"course_credit",//
    semester:"course_term",
    must:"course_type",
    room:"course_room",//
}
var courseDbWebDic = dict(zip(courseWebDbDic).map(x=>[x[1],x[0]]))

var courseShowOrder = ['课程名称', '课程代码', '选课人数', '学分', '上课地点',]
var courseChineseDic = dict(zip(courseShowOrder,['name','code',"num","credit","room"]))

getInfoData = (rawCourse)=>{
    var obj = {}
    for(var k of courseShowOrder){
        obj[k] = rawCourse[courseWebDbDic[courseChineseDic[k]]]
    }
    return obj
}


function setIdInfo(ind,title,d,order) {
  // 对设置一个组件 title 名字 ; 
  // d kv对象k为中文 ; order 顺序
    var obj = {d:d,title:title||""}
    obj.render = function () {
        // se("#studentInfoPanel").html("")
        var div = se("#infoPanel").append('div')
            .attr('onclick','javascript:clickPanel(this)')
                .attr('data',ind)
        div.attr('class',"panel panel-default infoPanels")
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

var handleRawCourses=(rawCourses)=>{
    var f=(rawCourse,ind)=>{
        var courseInfo = getInfoData(rawCourse)
        setIdInfo(ind,courseInfo['课程名称'],courseInfo,courseShowOrder).render()
    }
    rawCourses.map(f)
}



var rawStus = [{
    "course_id":"CS1003",
    "student_id":"2014012343",
    "score":82,
    "evalutation":null,
    "satisfaction":null,
    "select_time":null,
    "student_name":"苏颖涛",
    "student_sex":"男",
    "student_birth":"1995-11-01T16:00:00.000Z",
    "student_college":"信息科学与技术学院",
    "student_class":"计科1403",
    "student_address":"北京朝阳XXX楼XXX号",
    "student_phone":"13800000000",
    "student_status":"大三在读",
    "student_email":"suyingtao@sina.cn"
},{"course_id":"CS1003","student_id":"2014000002","score":null,"evalutation":null,"satisfaction":null,"select_time":null,"student_name":"苏祖","student_sex":"男","student_birth":null,"student_college":"信息科学与技术学院","student_class":"计科1401","student_address":null,"student_phone":null,"student_status":"大三在读","student_email":null},{"course_id":"CS1003","student_id":"2014000008","score":null,"evalutation":null,"satisfaction":null,"select_time":null,"student_name":"潘莲","student_sex":"女","student_birth":null,"student_college":"信息科学与技术学院","student_class":"计科1402","student_address":null,"student_phone":null,"student_status":"大三在读","student_email":null}]
rawStus.push({
    "course_id":"CS1007",
    "student_id":"2014012343",
    "score":99,
    "evalutation":null,
    "satisfaction":null,
    "select_time":null,
    "student_name":"苏颖涛",
    "student_sex":"男",
    "student_birth":"1995-11-01T16:00:00.000Z",
    "student_college":"信息科学与技术学院",
    "student_class":"计科1403",
    "student_address":"北京朝阳XXX楼XXX号",
    "student_phone":"13800000000",
    "student_status":"大三在读",
    "student_email":"suyingtao@sina.cn"
})
var stuWebDbDic = {
    code:"course_id",
    name:"student_name",
    classs:"student_class",
    id:"student_id",
    score:"score",
    credit:"course_credit",
    semester:"course_term",
    must:"course_type",
    mail:"student_email",
    phone:"course_major",
}

var stuDbWebDic = dict(zip(stuWebDbDic).map(x=>[x[1],x[0]]))



var stuShowOrder = ['id', 'name', 'classs', 'mail', 'score']

var keyToNameDic = {
    id:{
        name:"学号",
    },
    name:{
        name:"姓名",
    },
    classs:{
        name:"班级",
    },
    score:{
        name:"分数",
        f:(stu)=>{
            if(_editMod){
                var input = '<input type="number" id="input-'+stu.ind+
                '" class="form-control" placeholder="请评分"'+
                'style="width:100px;display:inline">'
                return input
            }else{
                return stu.score||('<em class="text-right text-muted grey">未录入</em>')
            }
        }
    },
    mail:{
        name:"联系邮箱",
        f:(stu)=>{
            return stu.mail?('<a color="#000000" class = "nav" href="mailto:'+stu.mail+'">'+stu.mail+'</a>'):('<em class="text-right text-muted grey">无</em>')
        }
    },
    op:{
        name:"操作",
    },
}
var creatTableHead=()=>{
    var strr = '<tr class="warning">\n'
    for(var x of stuShowOrder){
        strr += '    <th>'+keyToNameDic[x].name+'</th>\n'
    }
    strr += '</tr>'
    $('#stuTable').html("")
    $('#stuTable').append(strr)
}




var stuToView = (stu)=>{
    var view = {}
    for(var key in keyToNameDic){
        if("f" in keyToNameDic[key]){
            view[key] = keyToNameDic[key]["f"](stu)
        }else{
            view[key] = stu[key]
        }
    }
    return view
}

var setViewList=(viewList)=>{
    var strr = '<tr>\n'
    for(var x of stuShowOrder){
        strr += '    <td>'+viewList[x]+'</td>\n'
    }
    strr += '</tr>'
    $('#stuTable').append(strr)    
}





flashTable = () =>{
    var stus = stuAll.filter((x)=>x.code==window.code)
    $('#stuTable').html("")
    creatTableHead()
    stus.map(stuToView).map(setViewList)
    if(_editMod){
        for(var stu of stus){
            $('#input-'+stu.ind).val(stu.score)
        }
    }   
}




var test =x=>setTop()

var setTop = ()=>{
    $('#top').show()
    $('#botton').hide()
    // window._editMod = false
}
var setBotton = ()=>{
    $('#top').hide()
    $('#botton').show()
    flashTable()
}

function clickPanel (x) {
    setBotton()
    var ind = $(x).attr('data')
    var course = rawCourses[ind]
    var courseInfo = getInfoData(course)
    window.code = courseInfo['课程代码']
    // log(code,courseInfo)
    setSelfInfo(courseInfo['课程名称'],courseInfo,courseShowOrder).render()
    flashTable()
}

$('#editSwitch').on('switch-change', (_,d)=>{
    window._editMod = d.value
    log(d.value)
    d.value?$('#submit').text('提交修改').attr('class',"btn btn-primary").attr('onclick',"javascript:submit()")
    :$('#submit').text('不可用').attr('class',"btn btn-default btn-lg active")

    flashTable()
})

function submit(){
    if(!_editMod){return}
    var l = []
    var stus = stuAll.filter((x)=>x.code==window.code)
    for(var stu of stus){
        var v=$('#input-'+stu.ind).val()
        v= (v=="")?null:int(v)
        if(stu.score!=v){
            l.push([stu.id,v,window.code])
            stu.score=v
        }
    }
    if(len(l)!=0){ 
    // 传送l
    }
    log(l)
    flashTable()
}
// setBotton()

getRawStus = (d)=>{
    window.rawStus = d
    window.stuAll = rawStus.map((raw,ind)=>{
        var obj = {ind:ind}
        for(var k in stuWebDbDic){
            obj[k] = raw[stuWebDbDic[k]]
        }
        return obj
    })
}

function setDownXlsForTeacher(button,tableId,name){
    $('#'+button).on('click', function(){
        var className=rawCourses.filter(x=>x.course_id==window.code)[0].course_name
        var name = className+'课成绩汇总'
        var $this = $(this);
        //设定下载的文件名及后缀
        $this.attr('download', name+'.xls');
        //设定下载内容
        $this.attr('href', tableToExcel($('#'+tableId)[0], name));
    });
};

code = "CS1003"
_editMod = false  // 记录是否为编辑状态
setTop()
localBegin =()=>{
    code = "CS1003"
    _editMod = false  // 记录是否为编辑状态
    handleRawCourses(rawCourses)
    getRawStus(rawStus)
    // ajax('getCourses',null,handleRawCourses)
    // ajax('getCoursesAndScores',null,getRawStus)
    setTop()
    setDownXlsForTeacher('downXls','stuTable')
}
init=()=>{
    var innerF = (rawCourses,rawStus)=>{
        handleRawCourses(rawCourses)
        getRawStus(rawStus)
        setDownXlsForTeacher('downXls','stuTable')
    }
    var f = (rawCourses)=>{
        ajax('getCoursesAndScores',null,(rawStus)=>innerF(rawCourses,rawStus))
    }
    ajax('getCourses',null,f)
}

//init()
localBegin()

