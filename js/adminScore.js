
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
    for(var k in courseWebDbDic){
        obj[k] = rawCourse[courseWebDbDic[k]]
    }
    return obj
}

handleRawCourses = rawCourses=>(dict(rawCourses.map(getInfoData).map(x=>[x.code,x])))


var rawStus = [{
    "course_id":"CS1003",
    "student_id":"2014012343",
    "score":96,
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
rawStus.push({
    "course_id":"KJ0003",
    "student_id":"2014012343",
    "score":59,
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
rawStus.push({
    "course_id":"CS1008",
    "student_id":"2014012343",
    "score":59,
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
rawStus.push({"course_id":"CS1008","student_id":"2014000002","score":null,"evalutation":null,"satisfaction":null,"select_time":null,"student_name":"苏祖","student_sex":"男","student_birth":null,"student_college":"信息科学与技术学院","student_class":"计科1401","student_address":null,"student_phone":null,"student_status":"大三在读","student_email":null})
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
}

var stuDbWebDic = dict(zip(stuWebDbDic).map(x=>[x[1],x[0]]))


// **************

var stuShowOrder = ['id', 'name', 'classs', 'getedGpa','getedCredit', 'notPass',]

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
    getedGpa:{
        name:"GPA",
        f:(stu)=>{
            return round(stu.getedGpa,2)
        }
    },
    getedCredit:{
        name:"获得学分",
    },
    notPass:{
        name:"未通过课程",
        f:(stu)=>{
            if(len(stu.notPass)==0){
                return ('<em class="text-right text-muted grey">无</em>')
            }
            return stu.notPass.map(x=>coursesDic[x.code].name).join(', ')
        }
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


// ['id', 'name', 'classs', 'gpa','getedCredit', 'notPassNum',]

setStusListToView = (stusList)=>{
    creatTableHead()
    stusList.map(stuToView).map(setViewList)
}
getStusList = (rawStus)=>{
    var webStus = rawStus.map(d=>{
        var obj = {}
        for(var k in stuWebDbDic){
            var _k = stuWebDbDic[k]
            // log(k,_k,(_k in d)?d[_k]:coursesDic[d['course_id']][k])
            obj[k] = (_k in d)?d[_k]:coursesDic[d['course_id']][k]
        }
        return obj
    })

    var stus = {}
    for(var d of webStus){
        stus[d.id] = (d.id in stus)?[...stus[d.id],d]:[d]
    }
    var stusList = []
    for(var k in stus){
        var l = stus[k]
        sl = l.filter(x=>x.score!=null)
        var getedCredit = sum(sl.filter(x=>x.score>=60).map(x=>x.credit))
        var credit = sum(sl.map(x=>x.credit))
        var getedGpa = credit && sum(sl.map(x=>x.credit*scoreToGpa(x.score)))/credit
        var notPass = sl.filter(x=>x.score<60)
        var notPassNum = len(notPass)
        // log(l[0].name,l,sl,credit)
        var obj = {
            id:l[0].id,
            name:l[0].name,
            classs:l[0].classs,
            getedGpa:getedGpa,
            getedCredit:getedCredit,
            notPass:notPass,
            notPassNum:notPassNum,
        }
        stusList.push(obj)
    }
    return stusList
}

var selectList = ['name','id','classs','gpagt','gpalt']
var getSelectInput = ()=>{
    var obj = {}
    for(var k of selectList){
        var input = $('#'+k+'Input')
        obj[k] = input.val()
    }
    obj['pass'] = getChecksValue('passInput')
    // log(obj)
    return obj
}

inn = (c,strr)=> strr.indexOf(c)!=-1
var filterFunDic = {
    'name':(d,stu)=>{
        if(d==''){
            return true
        }
        return inn(d,stu.name)
    },
    'id':(d,stu)=>{
        if(d==''){
            return true
        }
        return inn(d,stu.id)
    },
    'classs':(d,stu)=>{
        if(d==''){
            return true
        }
        return inn(d,stu.classs)
    },
    'gpagt':(d,stu)=>{
        if(d==''){
            return true
        }
        return stu.getedGpa>=float(d)
    },
    'gpalt':(d,stu)=>{
        if(d==''){
            return true
        }
        return stu.getedGpa<=float(d)
    },
    'pass':(d,stu)=>{
        var k = len(stu.notPass)?'有':'无'
        return d[k]
    },
}

stuFilter = (stu,inputs)=>{
    for(var k in filterFunDic){
        if(!filterFunDic[k](inputs[k],stu)){
            return false
        }
    }
    return true
}


changeSelect = ()=>{
    var inputs = getSelectInput()
    var stus = stusList.filter(stu=>stuFilter(stu,inputs))
    setStusListToView(stus)
    log(inputs,stus)
}


handleRawStusAndCourses = (rawStus,rawCourses)=>{
    window.rawStus = rawStus
    window.rawCourses = rawCourses
    window.coursesDic = handleRawCourses (rawCourses)
    window.stusList = getStusList(rawStus)
    setStusListToView(stusList)
}


selectList.map(k=>$('#'+k+'Input').focusout(changeSelect))
passChecks = ['有','无']
setChecks('passInput',passChecks,changeSelect,true)
setDownXls('downXls','stuTable','成绩统计')

localBegin = ()=>{
    handleRawStusAndCourses(rawStus,rawCourses)
}

init = ()=>{
    var f = (rawCourses)=>{
        ajax('getCoursesAndScores',null,(rawStus)=>handleRawStusAndCourses(rawStus,rawCourses))
    }
    ajax('getCourses',null,f)
}

//init()
localBegin()