var tableHeadOrder = ['semester','code', 'name',
'must', 'credit', 'gpas',
 'score','starIcon','evalate',"operate"]
 // 列表排序
var rawScores = [{
    "course_id":"CS0001",
    "course_name":"离散数学",
    "teacher_id":"10031",
    "course_major":"计算机科学与技术",
    "course_numbers":60,
    "course_credit":8,
    "course_term":1,
    "course_type":3,
    "course_room":null,
    "score":90,
    "evalutation":"非常好",
    "satisfaction":5,
    "teacher_name":"苏年"
},{"course_id":"CS0006","course_name":"微机系统","teacher_id":"10003","course_major":"计算机科学与技术","course_numbers":20,"course_credit":7,"course_term":6,"course_type":3,"course_room":null,"score":70,"evalutation":null,"satisfaction":3,"teacher_name":"王文一"},{"course_id":"CS1000","course_name":"计算机图形学","teacher_id":"10039","course_major":"计算机科学与技术","course_numbers":20,"course_credit":7,"course_term":2,"course_type":2,"course_room":null,"score":63,"evalutation":null,"satisfaction":null,"teacher_name":"蒋晓"},{"course_id":"CS1003","course_name":"多媒体信息处理技术","teacher_id":"10041","course_major":"计算机科学与技术","course_numbers":60,"course_credit":3,"course_term":4,"course_type":2,"course_room":null,"score":82,"evalutation":null,"satisfaction":null,"teacher_name":"楮俊强"},{"course_id":"CS1004","course_name":"数字信号处理","teacher_id":"10018","course_major":"计算机科学与技术","course_numbers":220,"course_credit":8,"course_term":1,"course_type":2,"course_room":null,"score":95,"evalutation":null,"satisfaction":null,"teacher_name":"金晶"},{"course_id":"CS1008","course_name":"信息安全","teacher_id":"10041","course_major":"计算机科学与技术","course_numbers":20,"course_credit":1,"course_term":4,"course_type":2,"course_room":null,"score":null,"evalutation":null,"satisfaction":null,"teacher_name":"楮俊强"},{"course_id":"CS1010","course_name":"信息对抗","teacher_id":"10049","course_major":"计算机科学与技术","course_numbers":140,"course_credit":1,"course_term":4,"course_type":2,"course_room":null,"score":78,"evalutation":null,"satisfaction":null,"teacher_name":"水年章"},{"course_id":"GG0002","course_name":"概率统计","teacher_id":"10020","course_major":"计算机科学与技术","course_numbers":140,"course_credit":1,"course_term":2,"course_type":1,"course_room":null,"score":82,"evalutation":null,"satisfaction":null,"teacher_name":"陈娣芝"}]

var dbWebDic = {
    "teacher_id":"teacher_id",
    "course_major":"course_major",
    "course_numbers":"course_numbers",
    "course_room":"course_room",
    "teacher_name":"teacher_name",
    "course_credit":"credit",
    "course_term":"semester",
    "course_id":"code",
    "course_name":"name",
    "course_type":"must",
    "score":"score",
    "evalutation":"evalate",
    "satisfaction":"star",
}
var webDbDic = dict(items(dbWebDic).map(x=>[x[1],x[0]]))

var keyToNameDic = {
    "semester": {
        "name": "学期"
    },
    "code": {
        "name": "课程代码"
    },
    "name": {
        "name": "课程名称"
    },
    "must": {
        "name": "课程性质",
        "f":(s)=>{
            return ['通识', '公共必修',
             '专业选修', '专业必修'][s.must]
        }
    },
    "credit": {
        "name": "学分"
    },
    "gpas": {
        "name": "绩点"
    },
    "score": {
        "name": "分数",
        "f":(s)=>{
            return s.score==null?"<em class='text-right text-muted'>未录入</em>":s.score
        }
    },
    "starIcon": {
        "name": "课程评分",
        "f":(score)=>{
            return "<div  style='color:rgba(10,10,10,0.2)'><span style='color:orange'>"+
            '★'.repeat(score["star"])+"</span>"+'☆'.repeat(5-score["star"])
            "</div>"
            return score["star"]?
            "<div style='color:orange'>"+'★'.repeat(score["star"])+"</div>"
            :"<em class='text-right text-muted'>未评分</em>"
        }
    },
    "evalate": {
        "name": "评论",
        "f": (s)=>{
            return s["evalate"]||
            "<em class='text-right text-muted grey'>未评论</em>"
        }
    },
    "operate":{
        "name": "操作",
        "f": (score)=>{
            return '<button data="'+score.i+
            '" class="btn btn-info" '+
            'onclick="javascript:changeEvalate(this)">'+
            (score['star']?"改评论":"写评论")+'</button>'
        }
    }
}

var otherNeedInfo = ["star"]
var dbToWeb = (raw)=>{
    var web = {}
    for(var k in webDbDic){
        if(tableHeadOrder.includes(k) || 
            otherNeedInfo.includes(k)){
            web[k] = raw[webDbDic[k]]
        }
    }

    var gpass = scoreToGpa(web["score"],true)
    web["gpa"] = gpass[0]
    web["gpas"] = gpass[1]
    return web
}

var scoreToView = (score)=>{
    var view = {}
    for(var key in keyToNameDic){
        if("f" in keyToNameDic[key]){
            view[key] = keyToNameDic[key]["f"](score)
        }else{
            view[key] = score[key]
        }
    }
    return view
}
var setViewList=(viewList)=>{
    var strr = '<tr>\n'
    for(var x of tableHeadOrder){
        strr += '    <td>'+viewList[x]+'</td>\n'
    }
    strr += '</tr>'
    $('#scoreTable').append(strr)    
}



// log(scores[0])
var score = {
    "semester": '2017 01',
    "code": 'CS8080',
    "name": '计算机导论',
    "must": '必修',
    "credit": 3.0,
    "gpa": 2.33,
    "score": 90,
    "star": 4,
    "evalate": '课程很棒，老师讲的也不错！<a> 更多</a>'
}

var creatTableHead=()=>{
    var strr = '<tr class="warning">\n'
    for(var x of tableHeadOrder){
        strr += '    <th>'+keyToNameDic[x].name+'</th>\n'
    }
    strr += '</tr>'
    $('#scoreTable').append(strr)
}






modalTmp = {
    data:{}
}
$('#myModal').on('hidden.bs.modal', function () {
  $('#hiddenModals').append($('#myModal .modal-body>div')[0])
})
var setModal = (modalDivId,f)=>{
    $('#myModalLabel').text($('#'+modalDivId).attr('modalTitle'))
    $('#myModal .modal-body').html('')
    $('#myModal .modal-body').append($('#'+modalDivId))
    modalTmp.f = ()=>{
        f()
        $('#myModal').modal('hide')
        
    }
    $('#myModal').modal('show')
}






// setModal(id,f)

function changeEvalate(x) {
    // 修改评论
    var ind = $(x).attr('data')
    log(ind)
    var id = 'evalateInputPanel'
    var score = scores[ind]
    $('#'+id).attr('modalTitle','请评价 '+score.name)
    $('#evalateScore').val('★'.repeat(score.star))
    $('#evalateString').val(score.evalate)
    var f = ()=>{
        var data = {}
        data[webDbDic["code"]] = scores[ind].code 
        data[webDbDic["star"]] = $('#evalateScore').val()&&len($('#evalateScore').val())
        data[webDbDic["evalate"]] = $('#evalateString').val()||null
        log(data)
        //发送给服务器后回掉刷新
        // location.reload(true)
        var f = (d)=>{
            log(d,data)
            location.reload(true)
        }
        ajax('getAllScore', data, log)
    }
    setModal(id,f)
}




function handelRawScores(rawScores){
    var scores = rawScores.map((x,i)=>{

        var score = dbToWeb(x)
        score["i"] = i
        return score
    })

    window.scores = scores
    score = scores[0]
    $('#scoreTable').html('')
    creatTableHead()
    scores.map(scoreToView).map(setViewList)
    var studentInfo = {
        '姓名':'杨磊',
        '班级':'计科1403',
        '学号':'2013011013'
    }

    studentInfo['学分']=studentInfo.credit = sum(scores.map(x=>x.credit))
    studentInfo.gpas = sum(scores.map(x=>x.gpa*x.credit))/studentInfo.credit
    studentInfo['绩点']=studentInfo.gpas = round(studentInfo.gpas,2)
    var order = ['姓名',"班级","学号","学分","绩点"]
    setSelfInfo(studentInfo['姓名']+'的成绩',studentInfo,order).render()
}

setSelect = ()=>{
    mustChecks = ['公共必修','专业必修','专业选修','通识']
    mustList = ['通识', '公共必修','专业选修', '专业必修']
    var allF = ()=>{
        var d = getChecksValue('semesterSelect')
        var _tmp = rawScores.filter(x=>d[x.course_term])
        log(d)

        var d = getChecksValue('mustSelect')
        log(d)
        d = items(d).map(x=>x[1]?mustList.indexOf(x[0]):-1)
        var tmp = _tmp.filter(x=>d.indexOf(x.course_type)!=-1)
        handelRawScores(tmp)

    }

    var mustF = ()=>{
        var d = getChecksValue('mustSelect')
        log(d)
        d = items(d).map(x=>x[1]?mustList.indexOf(x[0]):-1)
        var tmp = rawScores.filter(x=>d.indexOf(x.course_type)!=-1)
        handelRawScores(tmp)
    }
    setChecks('mustSelect',mustChecks,allF,true)

    set = (list)=>{
        return items(dict(zip(list,range(len(list))))).map(x=>x[0])
    }

    semesters = set(rawScores.map(x=>x.course_term))
    var semesterF = ()=>{
        var d = getChecksValue('semesterSelect')
        log(d)
        var tmp = rawScores.filter(x=>d[x.course_term])
        handelRawScores(tmp)

    }

    setChecks('semesterSelect',semesters,allF,true)
}



localBegin = ()=>{
    ajax = log
    handelRawScores(rawScores)
    setSelect()
    setDownXls('downXls','scoreTable','个人成绩')
}

// 
;(init = ()=>{

    var f = (rawScores)=>{
        handelRawScores(rawScores)
        setSelect()
        setDownXls('downXls','scoreTable','个人成绩')
    }
    ajax('getAllScore', null, f)
    // scores.map(log)
})

//init()
localBegin()









