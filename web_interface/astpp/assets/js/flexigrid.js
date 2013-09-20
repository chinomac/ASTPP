/*
 * Flexigrid for jQuery - New Wave Grid
 *
 * Copyright (c) 2008 Paulo P. Marinas (webplicity.net/flexigrid)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-04-01 00:09:43 +0800 (Tue, 01 Apr 2008) $
 */
(function(a){
    a.addFlex=function(n,r){
        if(n.grid){
            return false
            }
            var x,A,C,k,w,q,y,b,c,h,m,j,l,f,d,B,e,o,z,u,v;
        r=a.extend({
            height:"auto",
            width:"auto",
            striped:true,
            novstripe:false,
            minwidth:30,
            minheight:80,
            resizable:true,
            url:false,
            method:"POST",
            dataType:"xml",
            errormsg:"Connection Error",
            usepager:false,
//            nowrap:true,
            nowrap:false,
            page:1,
            total:1,
            useRp:true,
            rp:10,
            rpOptions:[10,25,50,100,200,500],
            title:false,
            pagestat:"Displaying {from} to {to} of {total} items",
            procmsg:"Processing, please wait ...",
            query:"",
            qtype:"",
            nomsg:"No items",
            minColToggle:1,
            showToggleBtn:true,
            hideOnSubmit:true,
            autoload:true,
            blockOpacity:0.5,
            onToggleCol:false,
            onChangeSort:false,
            onSuccess:false,
            onSubmit:false
        },r);
        a(n).show().attr({
            cellPadding:0,
            cellSpacing:0,
            border:0
        }).removeAttr("width");
        x={
            hset:{},
            rePosDrag:function(){
                var i,g;
                i=0-this.hDiv.scrollLeft;
                if(this.hDiv.scrollLeft>0){
                    i-=Math.floor(r.cgwidth/2)
                    }
                    a(x.cDrag).css({
                    top:x.hDiv.offsetTop+1
                    });
                g=this.cdpad;
                a("div",x.cDrag).hide();
                a("thead tr:first th:visible",this.hDiv).each(function(){
                    var s,p;
                    s=a("thead tr:first th:visible",x.hDiv).index(this);
                    if(i==0){
                        i-=Math.floor(r.cgwidth/2)
                        }
                        p=parseInt(a("div",this).width())+i+g;
                    a("div:eq("+s+")",x.cDrag).css({
                        left:p+"px"
                        }).show();
                    i=p
                    })
                },
            fixHeight:function(i){
                var s,p,g;
                if(!i){
                    i=a(x.bDiv).height()
                    }
                    s=a(this.hDiv).height();
                a("div",this.cDrag).each(function(){
                    a(this).height(i+s)
                    });
                p=parseInt(a(x.nDiv).height());
                if(p>i){
                    a(x.nDiv).height(i).width(200)
                    }else{
                    a(x.nDiv).height("auto").width("auto")
                    }
                    a(x.block).css({
                    height:i,
                    marginBottom:(i*-1)
                    });
                g=x.bDiv.offsetTop+i;
                if(r.height!="auto"&&r.resizable){
                    g=x.vDiv.offsetTop
                    }
                    a(x.rDiv).css({
                    height:g
                })
                },
            dragStart:function(t,s,p){
                var D,g,i;
                if(t=="colresize"){
                    a(x.nDiv).hide();
                    a(x.nBtn).hide();
                    D=a("div",this.cDrag).index(p);
                    g=a("th:visible div:eq("+D+")",this.hDiv).width();
                    a(p).addClass("dragging").siblings().hide();
                    a(p).prev().addClass("dragging").show();
                    this.colresize={
                        startX:s.pageX,
                        ol:parseInt(p.style.left),
                        ow:g,
                        n:D
                    };
                    
                    a("body").css("cursor","col-resize")
                    }else{
                    if(t=="vresize"){
                        i=false;
                        a("body").css("cursor","row-resize");
                        if(p){
                            i=true;
                            a("body").css("cursor","col-resize")
                            }
                            this.vresize={
                            h:r.height,
                            sy:s.pageY,
                            w:r.width,
                            sx:s.pageX,
                            hgo:i
                        }
                    }else{
                    if(t=="colMove"){
                        a(x.nDiv).hide();
                        a(x.nBtn).hide();
                        this.hset=a(this.hDiv).offset();
                        this.hset.right=this.hset.left+a("table",this.hDiv).width();
                        this.hset.bottom=this.hset.top+a("table",this.hDiv).height();
                        this.dcol=p;
                        this.dcoln=a("th",this.hDiv).index(p);
                        this.colCopy=document.createElement("div");
                        this.colCopy.className="colCopy";
                        this.colCopy.innerHTML=p.innerHTML;
                        if(a.browser.msie){
                            this.colCopy.className="colCopy ie"
                            }
                            a(this.colCopy).css({
                            position:"absolute",
                            "float":"left",
                            display:"none",
                            textAlign:p.align
                            });
                        a("body").append(this.colCopy);
                        a(this.cDrag).hide()
                        }
                    }
            }
        a("body").noSelect()
    },
dragMove:function(t){
    var i,I,G,F,p,H,D,s,g,E;
    if(this.colresize){
        i=this.colresize.n;
        H=t.pageX-this.colresize.startX;
        D=this.colresize.ol+H;
        s=this.colresize.ow+H;
        if(s>r.minwidth){
            a("div:eq("+i+")",this.cDrag).css("left",D);
            this.colresize.nw=s
            }
        }else{
    if(this.vresize){
        I=this.vresize;
        F=t.pageY;
        H=F-I.sy;
        if(!r.defwidth){
            r.defwidth=r.width
            }
            if(r.width!="auto"&&!r.nohresize&&I.hgo){
            G=t.pageX;
            p=G-I.sx;
            g=I.w+p;
            if(g>r.defwidth){
                this.gDiv.style.width=g+"px";
                r.width=g
                }
            }
        E=I.h+H;
    if((E>r.minheight||r.height<r.minheight)&&!I.hgo){
        this.bDiv.style.height=E+"px";
        r.height=E;
        this.fixHeight(E)
        }
        I=null
    }else{
    if(this.colCopy){
        a(this.dcol).addClass("thMove").removeClass("thOver");
        if(t.pageX>this.hset.right||t.pageX<this.hset.left||t.pageY>this.hset.bottom||t.pageY<this.hset.top){
            a("body").css("cursor","move")
            }else{
            a("body").css("cursor","pointer")
            }
            a(this.colCopy).css({
            top:t.pageY+10,
            left:t.pageX+20,
            display:"block"
        })
        }
    }
}
},
dragEnd:function(){
    var i,g;
    if(this.colresize){
        i=this.colresize.n;
        g=this.colresize.nw;
        a("th:visible div:eq("+i+")",this.hDiv).css("width",g);
        a("tr",this.bDiv).each(function(){
            a("td:visible div:eq("+i+")",this).css("width",g)
            });
        this.hDiv.scrollLeft=this.bDiv.scrollLeft;
        a("div:eq("+i+")",this.cDrag).siblings().show();
        a(".dragging",this.cDrag).removeClass("dragging");
        this.rePosDrag();
        this.fixHeight();
        this.colresize=false
        }else{
        if(this.vresize){
            this.vresize=false
            }else{
            if(this.colCopy){
                a(this.colCopy).remove();
                if(this.dcolt!=null){
                    if(this.dcoln>this.dcolt){
                        a("th:eq("+this.dcolt+")",this.hDiv).before(this.dcol)
                        }else{
                        a("th:eq("+this.dcolt+")",this.hDiv).after(this.dcol)
                        }
                        this.switchCol(this.dcoln,this.dcolt);
                    a(this.cdropleft).remove();
                    a(this.cdropright).remove();
                    this.rePosDrag()
                    }
                    this.dcol=null;
                this.hset=null;
                this.dcoln=null;
                this.dcolt=null;
                this.colCopy=null;
                a(".thMove",this.hDiv).removeClass("thMove");
                a(this.cDrag).show()
                }
            }
    }
a("body").css("cursor","default");
a("body").noSelect(false)
},
toggleCol:function(t,p){
    var i,s,g;
    i=a("th[axis='col"+t+"']",this.hDiv)[0];
    s=a("thead th",x.hDiv).index(i);
    g=a("input[value="+t+"]",x.nDiv)[0];
    if(p==null){
        p=i.hide
        }
        if(a("input:checked",x.nDiv).length<r.minColToggle&&!p){
        return false
        }
        if(p){
        i.hide=false;
        a(i).show();
        g.checked=true
        }else{
        i.hide=true;
        a(i).hide();
        g.checked=false
        }
        a("tbody tr",n).each(function(){
        if(p){
            a("td:eq("+s+")",this).show()
            }else{
            a("td:eq("+s+")",this).hide()
            }
        });
this.rePosDrag();
if(r.onToggleCol){
    r.onToggleCol(t,p)
    }
    return p
},
switchCol:function(i,g){
    a("tbody tr",n).each(function(){
        if(i>g){
            a("td:eq("+g+")",this).before(a("td:eq("+i+")",this))
            }else{
            a("td:eq("+g+")",this).after(a("td:eq("+i+")",this))
            }
        });
if(i>g){
    a("tr:eq("+g+")",this.nDiv).before(a("tr:eq("+i+")",this.nDiv))
    }else{
    a("tr:eq("+g+")",this.nDiv).after(a("tr:eq("+i+")",this.nDiv))
    }
    if(a.browser.msie&&a.browser.version<7){
    a("tr:eq("+g+") input",this.nDiv)[0].checked=true
    }
    this.hDiv.scrollLeft=this.bDiv.scrollLeft
},
scroll:function(){
    this.hDiv.scrollLeft=this.bDiv.scrollLeft;
    this.rePosDrag()
    },
addData:function(t){
    var s,E,g,D,p;
    if(r.preProcess){
        t=r.preProcess(t)
        }
        a(".pReload",this.pDiv).removeClass("loading");
    this.loading=false;
    if(!t){
        a(".pPageStat",this.pDiv).html(r.errormsg);
        return false
        }
        if(r.dataType=="xml"){
        r.total=+a("rows total",t).text()
        }else{
        r.total=t.total
        }
        if(r.total==0){
        a("tr, a, td, div",n).unbind();
        a(n).empty();
        r.pages=1;
        r.page=1;
        this.buildpager();
        a(".pPageStat",this.pDiv).html(r.nomsg);
        return false
        }
        r.pages=Math.ceil(r.total/r.rp);
    if(r.dataType=="xml"){
        r.page=+a("rows page",t).text()
        }else{
        r.page=t.page
        }
        this.buildpager();
    b=document.createElement("tbody");
    if(r.dataType=="json"){
        a.each(t.rows,function(F,G){
            s=document.createElement("tr");
            if(F%2&&r.striped){
                s.className="erow"
                }
                if(G.id){
                s.id="row"+G.id
                }
                a("thead tr:first th",x.hDiv).each(function(){
                E=document.createElement("td");
                g=a(this).attr("axis").substr(3);
                E.align=this.align;
                E.innerHTML=G.cell[g];
                a(s).append(E);
                E=null
                });
            if(a("thead",this.gDiv).length<1){
                for(g=0;g<cell.length;g++){
                    E=document.createElement("td");
                    E.innerHTML=G.cell[g];
                    a(s).append(E);
                    E=null
                    }
                }
                a(b).append(s);
            s=null
            })
    }else{
    if(r.dataType=="xml"){
        p=1;
        a("rows row",t).each(function(){
            p++;
            s=document.createElement("tr");
            if(p%2&&r.striped){
                s.className="erow"
                }
                D=a(this).attr("id");
            if(D){
                s.id="row"+D
                }
                D=null;
            var i=this;
            a("thead tr:first th",x.hDiv).each(function(){
                E=document.createElement("td");
                g=a(this).attr("axis").substr(3);
                E.align=this.align;
                E.innerHTML=a("cell:eq("+g+")",i).text();
                a(s).append(E);
                E=null
                });
            if(a("thead",this.gDiv).length<1){
                a("cell",this).each(function(){
                    E=document.createElement("td");
                    E.innerHTML=a(this).text();
                    a(s).append(E);
                    E=null
                    })
                }
                a(b).append(s);
            s=null;
            i=null
            })
        }
    }
a("tr",n).unbind();
a(n).empty();
a(n).append(b);
this.addCellProp();
this.addRowProp();
this.rePosDrag();
b=null;
t=null;
p=null;
if(r.onSuccess){
    r.onSuccess()
    }
    if(r.hideOnSubmit){
    a(x.block).remove()
    }
    this.hDiv.scrollLeft=this.bDiv.scrollLeft;
if(a.browser.opera){
    a(n).css("visibility","visible")
    }
    if(typeof sweetTitles!="undefined"){
    sweetTitles.init()
    }
},
changeSort:function(g){
    if(this.loading){
        return true
        }
        a(x.nDiv).hide();
    a(x.nBtn).hide();
    if(r.sortname==a(g).attr("abbr")){
        if(r.sortorder=="asc"){
            r.sortorder="desc"
            }else{
            r.sortorder="asc"
            }
        }
    a(g).addClass("sorted").siblings().removeClass("sorted");
a(".sdesc",this.hDiv).removeClass("sdesc");
a(".sasc",this.hDiv).removeClass("sasc");
a("div",g).addClass("s"+r.sortorder);
r.sortname=a(g).attr("abbr");
if(r.onChangeSort){
    r.onChangeSort(r.sortname,r.sortorder)
    }else{
    this.populate()
    }
},
buildpager:function(){
    var i,g,p;
    a(".pcontrol input",this.pDiv).val(r.page);
    a(".pcontrol span",this.pDiv).html(r.pages);
    i=(r.page-1)*r.rp+1;
    g=i+r.rp-1;
    if(r.total<g){
        g=r.total
        }
        p=r.pagestat;
    p=p.replace(/{from}/,i);
    p=p.replace(/{to}/,g);
    p=p.replace(/{total}/,r.total);
    a(".pPageStat",this.pDiv).html(p)
    },
populate:function(){
    var i,g,p;
    if(this.loading){
        return true
        }
        if(r.onSubmit){
        g=r.onSubmit();
        if(!g){
            return false
            }
        }
    this.loading=true;
if(!r.url){
    return false
    }
    a(".pPageStat",this.pDiv).html(r.procmsg);
a(".pReload",this.pDiv).addClass("loading");
a(x.block).css({
    top:x.bDiv.offsetTop
    });
if(r.hideOnSubmit){
    a(this.gDiv).prepend(x.block)
    }
    if(a.browser.opera){
    a(n).css("visibility","hidden")
    }
    if(!r.newp){
    r.newp=1
    }
    if(r.page>r.pages){
    r.page=r.pages
    }
    p=[{
    name:"page",
    value:r.newp
    },{
    name:"rp",
    value:r.rp
    },{
    name:"sortname",
    value:r.sortname
    },{
    name:"sortorder",
    value:r.sortorder
    },{
    name:"query",
    value:r.query
    },{
    name:"qtype",
    value:r.qtype
    }];
if(r.params){
    for(i=0;i<r.params.length;i++){
        p[p.length]=r.params[i]
        }
    }
    a.ajax({
    type:r.method,
    url:r.url,
    data:p,
    dataType:r.dataType,
    success:function(s){
        x.addData(s)
        },
    error:function(s){
        try{
            if(r.onError){
                r.onError(s)
                }
            }catch(t){}
}
})
},
doSearch:function(){
    r.query=a("input[name=q]",x.sDiv).val();
    r.qtype=a("select[name=qtype]",x.sDiv).val();
    r.newp=1;
    this.populate()
    },
changePage:function(i){
    var g;
    if(this.loading){
        return true
        }
        switch(i){
        case"first":
            r.newp=1;
            break;
        case"prev":
            if(r.page>1){
            r.newp=parseInt(r.page)-1
            }
            break;
        case"next":
            if(r.page<r.pages){
            r.newp=parseInt(r.page)+1
            }
            break;
        case"last":
            r.newp=r.pages;
            break;
        case"input":
            g=parseInt(a(".pcontrol input",this.pDiv).val());
            if(isNaN(g)){
            g=1
            }
            if(g<1){
            g=1
            }else{
            if(g>r.pages){
                g=r.pages
                }
            }
        a(".pcontrol input",this.pDiv).val(g);
        r.newp=g;
        break
        }
        if(r.newp==r.page){
    return false
    }
    if(r.onChangePage){
    r.onChangePage(r.newp)
    }else{
    this.populate()
    }
},
addCellProp:function(){
    var p,t,s,i,g;
    a("tbody tr td",x.bDiv).each(function(){
        p=document.createElement("div");
        t=a("td",a(this).parent()).index(this);
        s=a("th:eq("+t+")",x.hDiv).get(0);
        if(s!=null){
            if(r.sortname==a(s).attr("abbr")&&r.sortname){
                this.className="sorted"
                }
                a(p).css({
                textAlign:s.align,
                width:a("div:first",s)[0].style.width
                });
            if(s.hide){
                a(this).css("display","none")
                }
            }
        if(r.nowrap==false){
        a(p).css("white-space","normal")
        }
        if(this.innerHTML==""){
        this.innerHTML="&nbsp;"
        }
        p.innerHTML=this.innerHTML;
    i=a(this).parent()[0];
        g=false;
        if(i.id){
        g=i.id.substr(3)
        }
        if(s!=null){
        if(s.process){
            s.process(p,g)
            }
        }
    a(this).empty().append(p).removeAttr("width")
    })
},
getCellDim:function(p){
    var E,g,t,G,D,i,F,s;
    E=parseInt(a(p).height());
    g=parseInt(a(p).parent().height());
    t=parseInt(p.style.width);
    G=parseInt(a(p).parent().width());
    D=p.offsetParent.offsetTop;
    i=p.offsetParent.offsetLeft;
    F=parseInt(a(p).css("paddingLeft"));
    s=parseInt(a(p).css("paddingTop"));
    return{
        ht:E,
        wt:t,
        top:D,
        left:i,
        pdl:F,
        pdt:s,
        pht:g,
        pwt:G
    }
},
addRowProp:function(){
    var g;
    a("tbody tr",x.bDiv).each(function(){
        a(this).click(function(i){
            g=(i.target||i.srcElement);
            if(g.href||g.type){
                return true
                }
                a(this).toggleClass("trSelected");
            if(r.singleSelect){
                a(this).siblings().removeClass("trSelected")
                }
            }).mousedown(function(i){
        if(i.shiftKey){
            a(this).toggleClass("trSelected");
            x.multisel=true;
            this.focus();
            a(x.gDiv).noSelect()
            }
        }).mouseup(function(){
        if(x.multisel){
            x.multisel=false;
            a(x.gDiv).noSelect(false)
            }
        }).hover(function(i){
    if(x.multisel){
        a(this).toggleClass("trSelected")
        }
    },function(){});
if(a.browser.msie&&a.browser.version<7){
    a(this).hover(function(){
        a(this).addClass("trOver")
        },function(){
        a(this).removeClass("trOver")
        })
    }
})
},
pager:0
};

if(r.colModel){
    y=document.createElement("thead");
    c=document.createElement("tr");
    for(v=0;v<r.colModel.length;v++){
        l=r.colModel[v];
        h=document.createElement("th");
        h.innerHTML=l.display;
        if(l.name&&l.sortable){
            a(h).attr("abbr",l.name)
            }
            a(h).attr("axis","col"+v);
        if(l.align){
            h.align=l.align
            }
            if(l.width){
            a(h).attr("width",l.width)
            }
            if(l.hide){
            h.hide=true
            }
            if(l.process){
            h.process=l.process
            }
            a(c).append(h)
        }
        a(y).append(c);
    a(n).prepend(y)
    }
    x.gDiv=document.createElement("div");
x.mDiv=document.createElement("div");
x.hDiv=document.createElement("div");
x.bDiv=document.createElement("div");
x.vDiv=document.createElement("div");
x.rDiv=document.createElement("div");
x.cDrag=document.createElement("div");
x.block=document.createElement("div");
x.nDiv=document.createElement("div");
x.nBtn=document.createElement("div");
x.iDiv=document.createElement("div");
x.tDiv=document.createElement("div");
x.sDiv=document.createElement("div");
if(r.usepager){
    x.pDiv=document.createElement("div")
    }
    x.hTable=document.createElement("table");
   
x.gDiv.className="flexigrid";

if(r.width!="auto"){
    x.gDiv.style.width=r.width+"px"
    }
    if(a.browser.msie){
    a(x.gDiv).addClass("ie")
    }
    if(r.novstripe){
    a(x.gDiv).addClass("novstripe")
    }
    a(n).before(x.gDiv);
a(x.gDiv).append(n);
if(r.buttons){
    x.tDiv.className="tDiv";
    C=document.createElement("div");
    C.className="tDiv2";
    for(v=0;v<r.buttons.length;v++){
        k=r.buttons[v];
        if(!k.separator){
            w=document.createElement("div");
            if (k.btn_url != null)  w.btn_url = k.btn_url;
            w.className="fbutton";
            
            w.innerHTML="<div><span>"+k.name+"</span></div>";
            if(k.bclass){
                a("span",w).addClass(k.bclass).css({
                    paddingLeft:20
                })
                }
                w.onpress=k.onpress;
            w.name=k.name;
            if(k.onpress){
                a(w).click(function(){
                    
this.onpress({
name:this.name,
btn_url:this.btn_url
},x.gDiv)
//                    this.onpress(this.name,x.gDiv)
                    })
                }
                a(C).append(w);
            if(a.browser.msie&&a.browser.version<7){
                a(w).hover(function(){
                    a(this).addClass("fbOver")
                    },function(){
                    a(this).removeClass("fbOver")
                    })
                }
            }else{
        a(C).append("<div class='btnseparator'></div>")
        }
    }
    a(x.tDiv).append(C);
a(x.tDiv).append("<div style='clear:both'></div>");
a(x.gDiv).prepend(x.tDiv)
}
x.hDiv.className="hDiv";
a(n).before(x.hDiv);
x.hTable.cellPadding=0;
x.hTable.cellSpacing=0;
a(x.hDiv).append('<div class="hDivBox"></div>');
a("div",x.hDiv).append(x.hTable);
y=a("thead:first",n).get(0);
if(y){
    a(x.hTable).append(y)
    }
    y=null;
if(!r.colmodel){
    m=0
    }
    a("thead tr:first th",x.hDiv).each(function(){
    q=document.createElement("div");
    if(a(this).attr("abbr")){
        a(this).click(function(i){
            if(!a(this).hasClass("thOver")){
                return false
                }
                var g=(i.target||i.srcElement);
            if(g.href||g.type){
                return true
                }
                x.changeSort(this)
            });
        if(a(this).attr("abbr")==r.sortname){
            this.className="sorted";
            q.className="s"+r.sortorder
            }
        }
    if(this.hide){
    a(this).hide()
    }
    if(!r.colmodel){
    a(this).attr("axis","col"+m++)
    }
    a(q).css({
    textAlign:this.align,
    width:this.width+"px"
    });
q.innerHTML=this.innerHTML;
a(this).empty().append(q).removeAttr("width").mousedown(function(g){
    x.dragStart("colMove",g,this)
    }).hover(function(){
    var i,D,E,p,t,g,s;
    if(!x.colresize&&!a(this).hasClass("thMove")&&!x.colCopy){
        a(this).addClass("thOver")
        }
        if(a(this).attr("abbr")!=r.sortname&&!x.colCopy&&!x.colresize&&a(this).attr("abbr")){
        a("div",this).addClass("s"+r.sortorder)
        }else{
        if(a(this).attr("abbr")==r.sortname&&!x.colCopy&&!x.colresize&&a(this).attr("abbr")){
            D="";
            if(r.sortorder=="asc"){
                D="desc"
                }else{
                D="asc"
                }
                a("div",this).removeClass("s"+r.sortorder).addClass("s"+D)
            }
        }
    if(x.colCopy){
    E=a("th",x.hDiv).index(this);
    if(E==x.dcoln){
        return false
        }
        if(E<x.dcoln){
        a(this).append(x.cdropleft)
        }else{
        a(this).append(x.cdropright)
        }
        x.dcolt=E
    }else{
    if(!x.colresize){
        p=a("th:visible",x.hDiv).index(this);
        t=parseInt(a("div:eq("+p+")",x.cDrag).css("left"));
        g=a(x.nBtn).outerWidth();
        i=t-g+Math.floor(r.cgwidth/2);
        a(x.nDiv).hide();
        a(x.nBtn).hide();
        a(x.nBtn).css({
            left:i,
            top:a(x.hDiv).offset().top
            }).show();
        s=parseInt(a(x.nDiv).width());
        a(x.nDiv).css({
            top:a(x.bDiv).offset().top
            });
        if((i+s)>a(x.gDiv).width()){
            a(x.nDiv).css("left",t-s+1)
            }else{
            a(x.nDiv).css("left",i)
            }
            if(a(this).hasClass("sorted")){
            a(x.nBtn).addClass("srtd")
            }else{
            a(x.nBtn).removeClass("srtd")
            }
        }
}
},function(){
    var g;
    a(this).removeClass("thOver");
    if(a(this).attr("abbr")!=r.sortname){
        a("div",this).removeClass("s"+r.sortorder)
        }else{
        if(a(this).attr("abbr")==r.sortname){
            g="";
            if(r.sortorder=="asc"){
                g="desc"
                }else{
                g="asc"
                }
                a("div",this).addClass("s"+r.sortorder).removeClass("s"+g)
            }
        }
    if(x.colCopy){
    a(x.cdropleft).remove();
    a(x.cdropright).remove();
    x.dcolt=null
    }
})
});
x.bDiv.className="bDiv";
a(n).before(x.bDiv);
a(x.bDiv).css({
    height:(r.height=="auto")?"auto":r.height+"px"
    }).scroll(function(g){
    x.scroll()
    }).append(n);
if(r.height=="auto"){
    a("table",x.bDiv).addClass("autoht")
    }
    x.addCellProp();
x.addRowProp();
f=a("thead tr:first th:first",x.hDiv).get(0);
if(f!=null){
    x.cDrag.className="cDrag";
    x.cdpad=0;
    x.cdpad+=(isNaN(parseInt(a("div",f).css("borderLeftWidth")))?0:parseInt(a("div",f).css("borderLeftWidth")));
    x.cdpad+=(isNaN(parseInt(a("div",f).css("borderRightWidth")))?0:parseInt(a("div",f).css("borderRightWidth")));
    x.cdpad+=(isNaN(parseInt(a("div",f).css("paddingLeft")))?0:parseInt(a("div",f).css("paddingLeft")));
    x.cdpad+=(isNaN(parseInt(a("div",f).css("paddingRight")))?0:parseInt(a("div",f).css("paddingRight")));
    x.cdpad+=(isNaN(parseInt(a(f).css("borderLeftWidth")))?0:parseInt(a(f).css("borderLeftWidth")));
    x.cdpad+=(isNaN(parseInt(a(f).css("borderRightWidth")))?0:parseInt(a(f).css("borderRightWidth")));
    x.cdpad+=(isNaN(parseInt(a(f).css("paddingLeft")))?0:parseInt(a(f).css("paddingLeft")));
    x.cdpad+=(isNaN(parseInt(a(f).css("paddingRight")))?0:parseInt(a(f).css("paddingRight")));
    a(x.bDiv).before(x.cDrag);
    a(x.cDrag).css({
        top:-a(x.hDiv).height()+"px"
        });
    a("thead tr:first th",x.hDiv).each(function(){
        var g=document.createElement("div");
        a(x.cDrag).append(g);
        if(!r.cgwidth){
            r.cgwidth=a(g).width()
            }
            a(g).css({
            height:a(x.bDiv).height()+a(x.hDiv).height()
            }).mousedown(function(i){
            x.dragStart("colresize",i,this)
            });
        if(a.browser.msie&&a.browser.version<7){
            x.fixHeight(a(x.gDiv).height());
            a(g).hover(function(){
                x.fixHeight();
                a(this).addClass("dragging")
                },function(){
                if(!x.colresize){
                    a(this).removeClass("dragging")
                    }
                })
        }
    })
}
if(r.striped){
    a("tbody tr:odd",x.bDiv).addClass("erow")
    }
    if(r.resizable&&r.height!="auto"){
    x.vDiv.className="vGrip";
    a(x.vDiv).mousedown(function(g){
        x.dragStart("vresize",g)
        }).html("<span></span>");
    a(x.bDiv).after(x.vDiv)
    }
    if(r.resizable&&r.width!="auto"&&!r.nohresize){
    x.rDiv.className="hGrip";
    a(x.rDiv).mousedown(function(g){
        x.dragStart("vresize",g,true)
        }).html("<span></span>").css("height",a(x.gDiv).height());
    if(a.browser.msie&&a.browser.version<7){
        a(x.rDiv).hover(function(){
            a(this).addClass("hgOver")
            },function(){
            a(this).removeClass("hgOver")
            })
        }
        a(x.gDiv).append(x.rDiv)
    }
    if(r.usepager){
    x.pDiv.className="pDiv";
    x.pDiv.innerHTML='<div class="pDiv2"></div>';
    a(x.bDiv).after(x.pDiv);
    a("div",x.pDiv).html(' <div class="pGroup"> <div class="pFirst pButton"><span></span></div><div class="pPrev pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pcontrol">Page <input type="text" size="4" value="1" /> of <span> 1 </span></span></div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pNext pButton"><span></span></div><div class="pLast pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pReload pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pPageStat"></span></div>');
    a(".pReload",x.pDiv).click(function(){
        x.populate()
        });
    a(".pFirst",x.pDiv).click(function(){
        x.changePage("first")
        });
    a(".pPrev",x.pDiv).click(function(){
        x.changePage("prev")
        });
    a(".pNext",x.pDiv).click(function(){
        x.changePage("next")
        });
    a(".pLast",x.pDiv).click(function(){
        x.changePage("last")
        });
    a(".pcontrol input",x.pDiv).keydown(function(g){
        if(g.keyCode==13){
            x.changePage("input")
            }
        });
if(a.browser.msie&&a.browser.version<7){
    a(".pButton",x.pDiv).hover(function(){
        a(this).addClass("pBtnOver")
        },function(){
        a(this).removeClass("pBtnOver")
        })
    }
    if(r.useRp){
    d="";
    for(B=0;B<r.rpOptions.length;B++){
        if(r.rp==r.rpOptions[B]){
            u='selected="selected"'
            }else{
            u=""
            }
            d+="<option value='"+r.rpOptions[B]+"' "+u+" >"+r.rpOptions[B]+"&nbsp;&nbsp;</option>"
        }
        a(".pDiv2",x.pDiv).prepend("<div class='pGroup'><select name='rp'>"+d+"</select></div> <div class='btnseparator'></div>");
    a("select",x.pDiv).change(function(){
        if(r.onRpChange){
            r.onRpChange(+this.value)
            }else{
            r.newp=1;
            r.rp=+this.value;
            x.populate()
            }
        })
}
if(r.searchitems){
    a(".pDiv2",x.pDiv).prepend("<div class='pGroup'> <div class='pSearch pButton'><span></span></div> </div>  <div class='btnseparator'></div>");
    a(".pSearch",x.pDiv).click(function(){
        a(x.sDiv).slideToggle("fast",function(){
            a(".sDiv:visible input:first",x.gDiv).trigger("focus")
            })
        });
    x.sDiv.className="sDiv";
    sitems=r.searchitems;
    e="";
    for(o=0;o<sitems.length;o++){
        if(r.qtype==""&&sitems[o].isdefault==true){
            r.qtype=sitems[o].name;
            u='selected="selected"'
            }else{
            u=""
            }
            e+="<option value='"+sitems[o].name+"' "+u+" >"+sitems[o].display+"&nbsp;&nbsp;</option>"
        }
        if(r.qtype==""){
        r.qtype=sitems[0].name
        }
        a(x.sDiv).append("<div class='sDiv2'>Quick Search <input type='text' size='30' name='q' class='qsbox' /> <select name='qtype'>"+e+"</select> <input type='button' value='Clear' /></div>");
    a("input[name=q],select[name=qtype]",x.sDiv).keydown(function(g){
        if(g.keyCode==13){
            x.doSearch()
            }
        });
a("input[value=Clear]",x.sDiv).click(function(){
    a("input[name=q]",x.sDiv).val("");
    r.query="";
    x.doSearch()
    });
a(x.bDiv).after(x.sDiv)
}
}
a(x.pDiv,x.sDiv).append("<div style='clear:both'></div>");
if(r.title){
    x.mDiv.className="mDiv";
    x.mDiv.innerHTML='<div class="ftitle">'+r.title+"</div>";
    a(x.gDiv).prepend(x.mDiv);
    if(r.showTableToggleBtn){
        a(x.mDiv).append('<div class="ptogtitle" title="Minimize/Maximize Table"><span></span></div>');
        a("div.ptogtitle",x.mDiv).click(function(){
            a(x.gDiv).toggleClass("hideBody");
            a(this).toggleClass("vsble")
            })
        }
    }
x.cdropleft=document.createElement("span");
x.cdropleft.className="cdropleft";
x.cdropright=document.createElement("span");
x.cdropright.className="cdropright";
x.block.className="gBlock";
z=a(x.bDiv).height();
a(x.block).css({
    width:x.bDiv.style.width,
    height:z,
    background:"white",
    position:"relative",
    marginBottom:(z*-1),
    zIndex:1,
    top:x.bDiv.offsetTop,
    left:"0px"
});
a(x.block).fadeTo(0,r.blockOpacity);
if(a("th",x.hDiv).length){
    x.nDiv.className="nDiv";
    x.nDiv.innerHTML="<table cellpadding='0' cellspacing='0'><tbody></tbody></table>";
    a(x.nDiv).css({
        marginBottom:(z*-1),
        display:"none",
        top:x.bDiv.offsetTop
        }).noSelect();
    j=0;
    a("th div",x.hDiv).each(function(){
        var i,g;
        i=a("th[axis='col"+j+"']",x.hDiv)[0];
        g='checked="checked"';
        if(i.style.display=="none"){
            g=""
            }
            a("tbody",x.nDiv).append('<tr><td class="ndcol1"><input type="checkbox" '+g+' class="togCol" value="'+j+'" /></td><td class="ndcol2">'+this.innerHTML+"</td></tr>");
        j++
    });
    if(a.browser.msie&&a.browser.version<7){
        a("tr",x.nDiv).hover(function(){
            a(this).addClass("ndcolover")
            },function(){
            a(this).removeClass("ndcolover")
            })
        }
        a("td.ndcol2",x.nDiv).click(function(){
        if(a("input:checked",x.nDiv).length<=r.minColToggle&&a(this).prev().find("input")[0].checked){
            return false
            }
            return x.toggleCol(a(this).prev().find("input").val())
        });
    a("input.togCol",x.nDiv).click(function(){
        if(a("input:checked",x.nDiv).length<r.minColToggle&&this.checked==false){
            return false
            }
            a(this).parent().next().trigger("click")
        });
    a(x.gDiv).prepend(x.nDiv);
    a(x.nBtn).addClass("nBtn").html("<div></div>").attr("title","Hide/Show Columns").click(function(){
        a(x.nDiv).toggle();
        return true
        });
    if(r.showToggleBtn){
        a(x.gDiv).prepend(x.nBtn)
        }
    }
a(x.iDiv).addClass("iDiv").css({
    display:"none"
});
a(x.bDiv).append(x.iDiv);
a(x.bDiv).hover(function(){
    a(x.nDiv).hide();
    a(x.nBtn).hide()
    },function(){
    if(x.multisel){
        x.multisel=false
        }
    });
a(x.gDiv).hover(function(){},function(){
    a(x.nDiv).hide();
    a(x.nBtn).hide()
    });
a(document).mousemove(function(g){
    x.dragMove(g)
    }).mouseup(function(g){
    x.dragEnd()
    }).hover(function(){},function(){
    x.dragEnd()
    });
if(a.browser.msie&&a.browser.version<7){
    a(".hDiv,.bDiv,.mDiv,.pDiv,.vGrip,.tDiv, .sDiv",x.gDiv).css({
        width:"100%"
    });
    a(x.gDiv).addClass("ie6");
    if(r.width!="auto"){
        a(x.gDiv).addClass("ie6fullwidthbug")
        }
    }
x.rePosDrag();
x.fixHeight();
n.p=r;
n.grid=x;
if(r.url&&r.autoload){
    x.populate()
    }
    return n
};

docloaded=false;
a(document).ready(function(){
    docloaded=true
    });
a.fn.flexigrid=function(b){
    return this.each(function(){
        if(docloaded===false){
            a(this).hide();
            var c=this;
            a(document).ready(function(){
                a.addFlex(c,b)
                })
            }else{
            a.addFlex(this,b)
            }
        })
};

a.fn.flexReload=function(b){
    return this.each(function(){
        if(this.grid&&this.p.url){
            this.grid.populate()
            }
        })
};

a.fn.flexOptions=function(b){
    return this.each(function(){
        if(this.grid){
            a.extend(this.p,b)
            }
        })
};

a.fn.flexToggleCol=function(c,b){
    return this.each(function(){
        if(this.grid){
            this.grid.toggleCol(c,b)
            }
        })
};

a.fn.flexAddData=function(b){
    return this.each(function(){
        if(this.grid){
            this.grid.addData(b)
            }
        })
};

a.fn.noSelect=function(b){
    if(b==null){
        prevent=true
        }else{
        prevent=b
        }
        if(prevent){
        return this.each(function(){
            if(a.browser.msie||a.browser.safari){
                a(this).bind("selectstart",function(){
                    return false
                    })
                }else{
                if(a.browser.mozilla){
                    a(this).css("MozUserSelect","none");
                    a("body").trigger("focus")
                    }else{
                    if(a.browser.opera){
                        a(this).bind("mousedown",function(){
                            return false
                            })
                        }else{
                        a(this).attr("unselectable","on")
                        }
                    }
            }
        })
}else{
    return this.each(function(){
        if(a.browser.msie||a.browser.safari){
            a(this).unbind("selectstart")
            }else{
            if(a.browser.mozilla){
                a(this).css("MozUserSelect","inherit")
                }else{
                if(a.browser.opera){
                    a(this).unbind("mousedown")
                    }else{
                    a(this).removeAttr("unselectable","on")
                    }
                }
        }
    })
}
}
})(jQuery);
