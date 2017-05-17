/**
 * Created by admin on 2016/10/27.
 */
$(window).resize(function () {
    document.getElementsByTagName('html')[0].style.fontSize=window.innerWidth/6.4+'px';
}).trigger('resize');

$(function(){
    var Group_1=['10000001','10000002','10000003','10000004','10000005','10000006','10000007','10000008','10000009','10000010','10000011','10000012','10000013','10000014','10000015','10000016','10000017','10000018','10000019','10000020','10000021','10000022','10000023','10000024','10000025'];
    var Group_2=['20000001','20000002','20000003','20000004','20000005','20000006','20000007','20000008','20000009','20000010','20000011','20000012','20000013','20000014','20000015','20000016','20000017','20000018','20000019','20000020','20000021','20000022','20000023','20000024','20000025'];
    var Group_3=['30000001','30000002','30000003','30000004','30000005','30000006','30000007','30000008','30000009','30000010','30000011','30000012','30000013','30000014','30000015','30000016','30000017','30000018','30000019','30000020','30000021','30000022','30000023','30000024','30000025'];
    var newGroup=['40000001','40000002','40000003','40000004','40000005','40000006','40000007','40000008','40000009','40000010','40000011','40000012','40000013','40000014','40000015','40000016','40000017','40000018','40000019','40000020','40000021','40000022','40000023','40000024','40000025'];
   //DTU列表页面点击加号显示增加DTU页面
    $('.dtu_page .top_left').on('click',function(){
        $('.dtu_page').css({'display':'none'});
        $('.new_dtu_page').css({'display':'block'});
    });
    //点击DTU列表页面的下面按钮返回app
    //$('.dtu_page .dtu_page_back').click(function(){
    //    //  该方法为后退操作的默认实现，如当前页的回退操作，不能直接简单地返回上一页，需在各页面对应的js里覆盖该方法的实现
    //    function  goBackPage()  {
    //        window.history.go(-1);
    //    }
    //    //  客户端标题
    //    function  clientStartCallback(){
    //        if(typeof  servicesClient  !='undefined'){
    //            var  params={};
    //            params["url"]  =  window.location.href;
    //            params["isHomePage"]  =  isHomePage();
    //            params["title"]  =  document.title;
    //            //  app  client  回调，通知页面变化
    //            window.servicesClient.callback(JSON.stringify(params));
    //
    //        }
    //    }
    //    function  isHomePage()  {
    //        var  currentPage  =  window.location.href;
    //        if  (currentPage.indexOf("index.action")  !=  -1)  {
    //            return  true;
    //        }
    //        return  false;
    //    }
    //    goBackPage();
    //    clientStartCallback();
    //    isHomePage();
    //})

    $("#dtu_page_back").bind("click", function() {   //这个id 换成你的按钮的id
        if(typeof servicesClient !='undefined'){
            window.servicesClient.backToControlCenter();
        }
    })




    //增加DTU页面 点击“OK”，返回DTU列表页面，并在DTU列表页面中新增一条DTU信息
    $('.new_dtu_page .ok_box').on('click',function(){
        var DUTnum=$('.dtu_page .item').length;
        var input_text=$('.new_dtu_page input').val();
        //填内容才新增一条DTU信息
        var re =/^[1-9]+[0-9]*]*$/;
        if(!re.test(input_text)){
            Prompt('Please enter the correct registration code.');
            return false;
        }
        if(input_text){
            if(DUTnum < 3){
                var newDUT=$('<div class="item"><div class="stop"><img src="images/stop.png" alt=""/></div><div class="fl items_left"><img src="images/dtu_1.jpg" alt=""/></div><div class="fl items_content"><h2>DTU_'+input_text+'</h2><span>Disconnected</span></div><div class="fr items_right"><img src="images/arrow.png" alt=""/></div></div>');
                $('.dtu_page .items').append(newDUT);
                $('.new_dtu_page').css({'display':'none'});
                $('.dtu_page').css({'display':'block'});
                $('.new_dtu_page input').val('');
                itemChick();
            }else{
                Prompt('Allows you to add 3 DTU at most in this demo.');
            }
        }else{
            Prompt('Please enter your DTU registration code')
        }
    })
    //增加DTU页面 点击×号关闭新增DTU页面，返回DTU列表页面
    $('.new_dtu_page .close').on('click',function(){
        $('.new_dtu_page').css({'display':'none'});
        $('.dtu_page').css({'display':'block'});
    })

    //DTU列表页面点击垃圾桶进入DTU删除页面
    $('.dtu_page .top_right').on('click',function(){
        if($('.dtu_page .item').length<1){
            return false;
        }
        $('.dtu_page .top_left').fadeToggle(500);
        $('.dtu_page .items').toggleClass('delete');
        $('.dtu_page .stop').fadeToggle(500);
        //点击左边的图标显示删除确认框
        $(".dtu_page .stop").each(function(i,dom){
            $(dom).on('click',function(e){
                e=e||window.event;
                if(e.stopPropagation){
                    e.stopPropagation();
                }else{
                    e.cancelBubble=true;
                }
                var _this=$(this).parent('.item');
                _this.addClass('del_1');
                $('.dtu_page .del_Mask').css({'display':'block'});
                $('.dtu_page .del_Mask .no').on('click',function(){
                    $('.dtu_page .del_Mask').css({'display':'none'});
                    $('.dtu_page .items').removeClass('delete');
                    $('.dtu_page .item').removeClass('del_1');
                })
            })
        })
    })

    $('.dtu_page .del_Mask .yes').on('click',function(){
        $('.dtu_page .del_Mask').css({'display':'none'});
        $('.dtu_page .items').removeClass('delete');
        $('.dtu_page .del_1').detach();
    });

    $('.dtu_page .del_Mask').on('click',function(){
        $('.dtu_page .stop').fadeToggle(500);
        $('.dtu_page .top_left').fadeToggle(500);
    })
   //点击进入详情页
    itemChick();
    function itemChick(){
        $('.dtu_page .item').on('click',function(){
            var _this=$(this).find('h2').text();
            $('.dtu_details_page').find('h3').text(_this);
            $('.dtu_details_page').find('h2').text(_this);
            $('.dtu_page').css({'display':'none'});
            $('.dtu_details_page').css({'display':'block'})
        });
    }

    //DTU详情页面
    $('.dtu_details_page .text_Lighting').on('click',function(){
        $('.dtu_details_page').css({'display':'none'});
        $('.lighting_control .lighting_control_one').text(Group_1.length);
        $('.lighting_control .lighting_control_two').text(Group_2.length);
        $('.lighting_control .lighting_control_three').text(Group_3.length);
        $('.lighting_control').css({'display':'block'})
    })
    //点击详情页的左上角回到DTU列表页面
    $('.dtu_details_page .top_left').on('click',function(){
        $('.dtu_details_page').css({'display':'none'})
        $('.dtu_page').css({'display':'block'});
    })
    //点击Lighting操控页面的加号弹出确认添加Group提示框
    $('.lighting_control .top_Middle').on('click',function(){
        $('.lighting_control .add_mask').css({'display':'block'});
    })

    $('.lighting_control .top_left').on('click',function(){
        $('.lighting_control').css({'display':'none'});
        $('.dtu_details_page').css({'display':'block'});

    })

    $('.lighting_control .add_mask .no').on('click',function(){
        $('.lighting_control .Mask').css({'display':'none'});
    })
    $('.lighting_control .add_mask .yes').on('click',function(){
        var GroupNum=$('.lighting_control .item').length;
        if(GroupNum<4){
            var Group=$('.lighting_control .item').last().find('.fl>span').text()*1+1;
            var newGroup=$('<div class="item"><div class="stop"><img src="images/stop.png" alt=""/></div> <div class="item_top"><strong class="fl">Group<span>'+Group+'</span></strong><span class="fr">25</span></div> <div class="item_bottom"><label for="brightnessBox1" class="fl brightness" id="Box1">60%</label><div class="item_btn fr gray_btn">Auto Setting</div> </div><div class="del">Del</div></div>');
            $('.lighting_control .items').append(newGroup);
            $('.lighting_control .add_mask').css({'display':'none'});
        }else{
            $('.lighting_control .add_mask').css({'display':'none'});
            Prompt('Allows you to add 4 groups at most.');
        }
        $('.lighting_control .stop').on('click',function(){
            var _this=$(this).parent('.item');
            _this.addClass('Del');
        })
        lightDel();
        lightingTop();
        lightingLabel();
        lightingAuto();
    })

    //点击Lighting操控页面的垃圾桶进入删除Lighting分组页面
    $('.lighting_control .top_right').on('click',function(){
        if($('.lighting_control .item').length<1){
            return false;
        }
        $('.lighting_control .item').removeClass('Del')
        $('.lighting_control .top_left').fadeToggle(500);
        $('.lighting_control .top_Middle').fadeToggle(500);
        $('.lighting_control .items').toggleClass('delete');
        $('.lighting_control .stop').fadeToggle(500);
    })
    //点击Lighting操控页面Group进入Lighting分组详情页面
    lightingTop();
    function lightingTop(){
        $('.lighting_control .item_top').on('click',function(){
            $('.lighting_control').css({'display':'none'});
            $('.lighting_details').css({'display':'block'});
            $('.lighting_details h2').text($(this).find('strong').text());
            var _this=this;
            $('.lighting_details .items').html('');
            if($(this).find('strong').text()=='Group1'){
                for(var j=0;j<Group_1.length;j++){
                    var nex='<div class="item"><span>'+Group_1[j]+'</span><img src="images/details_2.png" alt=""/></div>';
                    $('.lighting_details .items').append(nex);
                }
            }else if($(this).find('strong').text()=='Group2'){
                for(var j=0;j<Group_2.length;j++){
                    var nex='<div class="item"><span>'+Group_2[j]+'</span><img src="images/details_2.png" alt=""/></div>';
                    $('.lighting_details .items').append(nex);
                }
            }else if($(this).find('strong').text()=='Group3'){
                for(var j=0;j<Group_3.length;j++){
                    var nex='<div class="item"><span>'+Group_3[j]+'</span><img src="images/details_2.png" alt=""/></div>';
                    $('.lighting_details .items').append(nex);
                }
            }else{
                for(var j=0;j<newGroup.length;j++){
                    var nex='<div class="item"><span>'+newGroup[j]+'</span><img src="images/details_2.png" alt=""/></div>';
                    $('.lighting_details .items').append(nex);
                }
            }
            nex=null;
            $('.lighting_details .item').each(function(index,dom){
                $(dom).on('click',function(){
                    var flag=$('.lighting_details .top_Middle').hasClass('lighting_Middle');
                    if(!flag){
                        $('.lighting_details .lighting_Mask').css({'display':'block'});
                        $('.lighting_details .lighting_Mask .yes').on('click',function(){
                            $('.lighting_details .lighting_Mask').css({'display':'none'});
                        })
                    }
                })
            })
            $('.lighting_details #Group').text('');
            $('.lighting_control strong').each(function(i,dom){
                if($(dom).text()!=$(_this).find('strong').text()){
                    $('.lighting_details #Group').append('<option value="'+i+'">'+$(dom).text()+'</option>')
                }
                $('#Group').mobiscroll().select({
                    theme: 'android-holo-light',
                    lang: 'zh',
                    display: 'inline',
                    minWidth: 200,
                    height:36,
                    rows:3,
                });
            })
        })
    }


    //点击删除Lighting分组页面 的左边删除键 弹窗删除按钮
    $('.lighting_control .stop').on('click',function(){
        var _this=$(this).parent('.item');
        _this.addClass('Del');
    })
    lightDel();
    function lightDel(){
        $('.lighting_control .del').on('click',function(){
            var _this=$(this).parent('.item');
            _this.removeClass('Del');
            _this.addClass('Del_3');
            $('.lighting_control .Del_mask').css({'display':'block'});
            $('.lighting_control .Del_mask .yes').on('click',function(){
                $('.lighting_control .Del_mask').css({'display':'none'});
                $('.lighting_control .Del_3').detach();
            })
            $('.lighting_control .Del_mask .no').on('click',function(){
                $('.lighting_control .Del_mask').css({'display':'none'});
                $('.lighting_control .item').removeClass('Del_3');
            })
        })
    }
    lightingLabel();
    function lightingLabel(){
        $('.lighting_control label').on('click',function(e){
            var _this=this;
            e=e||window.event;
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble=true;
            }
            $('.lighting_control .lighting_control_bottom').slideDown(500);
            btnRight(_this);
        })
    }
    lightingAuto();
    function lightingAuto(){
        $('.lighting_control .green_btn').on('click',function(){
            $('.lighting_control').css({'display':'none'});
            $('.Lighting_automatic').css({'display':'block'});
            $('.Lighting_automatic h2').text($(this).parents('.item').find('strong').text())
        })
        $('.lighting_control .gray_btn').unbind('click');
    }
    $(document).on("click", "*", function(){
        $('.lighting_control .lighting_control_bottom').slideUp(500);
    });
    $('.lighting_control_bottom').on('click',function(e){
        e=e||window.event;
        if(e.stopPropagation){
            e.stopPropagation()
        }else{
            e.cancelBubble=true;
        }
    })
    $('.lighting_control_bottom .btn_left').on('click',function(){
        $('.lighting_control .lighting_control_bottom').slideUp(500);
    })
    function btnRight(dom){
        var dom1=dom;
        $('.lighting_control .lighting_control_bottom .btn_right').on('click',function(){
            var text=$('#brightnessBox1_dummy').val();
            if(dom1==dom){
               $(dom).text(text);
                if(text=='Auto'){
                    $(dom).siblings().addClass('green_btn');
                    $(dom).siblings().removeClass('gray_btn');
                    setTimeout(function(){
                        $('.lighting_control').css({'display':'none'});
                        $('.Lighting_automatic').css({'display':'block'});
                    },700)
                }else{
                    $(dom).siblings().removeClass('green_btn');
                    $(dom).siblings().addClass('gray_btn');
                }
            }
            dom1=null;
            $('.lighting_control .lighting_control_bottom').slideUp(500);
            lightingAuto();
        })
    }


    $('#brightnessBox1').mobiscroll().select({
        theme: 'android-holo-light',
        display: 'inline',
        minWidth:320,
        rows:7,
    });


    //点击Lighting分组详情页面的左上角返回Lighting操控页面
    $('.lighting_details .top_left').on('click',function(){
        $('.lighting_details .item').removeClass('chose');
        $('.lighting_details .item img').slideUp();
        $('.lighting_details .top_right .lighting_details_text1').show();
        $('.lighting_details .top_right .lighting_details_text2').hide();
        $('.lighting_details .top_Middle').show();
        $('.lighting_details .top_Middle').removeClass('lighting_Middle');
        $('.lighting_details .lighting_bottom').slideUp();
        $('.lighting_details').css({'display':'none'});
        $('.lighting_control .item_top .fr').text(newGroup.length);
        $('.lighting_control .lighting_control_one').text(Group_1.length);
        $('.lighting_control .lighting_control_two').text(Group_2.length);
        $('.lighting_control .lighting_control_three').text(Group_3.length);
        $('.lighting_control').css({'display':'block'});
    })

    $('.lighting_control .sensor span').click(function(){
        $('.lighting_control').css({'display':'none'});
        $('.lighting_Temperature').css({'display':'block'});
    })

    //点击Lighting分组详情页面的最右上角“Edit”变为“Cancel”，页面下方出现“Change Group”、“Delete”按钮；返回Lighting操控页面
    $('.lighting_details .top_right').on('click',function(){
        $('.lighting_details .item').removeClass('chose');
        $('.lighting_details .item img').slideUp();
        $('.lighting_details .top_right .lighting_details_text1').toggle();
        $('.lighting_details .top_right .lighting_details_text2').toggle();
        $('.lighting_details .top_Middle').toggle();
        $('.lighting_details .top_Middle').toggleClass('lighting_Middle');
        $('.lighting_details .lighting_bottom').slideToggle();
        $('.lighting_details .item').each(function(index,dom){
            $(dom).on('click',function(){
                var flag=$('.lighting_details .top_Middle').hasClass('lighting_Middle');
                if(!flag){
                    $('.lighting_details .lighting_Mask').css({'display':'block'});
                    $('.lighting_details .lighting_Mask .yes').on('click',function(){
                        $('.lighting_details .lighting_Mask').css({'display':'none'});
                    })
                }else{
                    var _this=$(this);
                    _this.toggleClass('chose');
                    _this.find('img').toggle();
                }
            })
        })
    })

    //选择Lighting分组详情页面的RTU
    $('.lighting_details .item').each(function(index,dom){
        $(dom).on('click',function(){
           var flag=$('.lighting_details .top_Middle').hasClass('lighting_Middle');
            if(!flag){
                $('.lighting_details .lighting_Mask').css({'display':'block'});
                $('.lighting_details .lighting_Mask .yes').on('click',function(){
                    $('.lighting_details .lighting_Mask').css({'display':'none'});
                })
            }
        })
    })


    //点击Lighting分组详情页面的加号进入添加RTU页面
    $('.lighting_details .top_Middle').on('click',function(){
        var tex1=$('.lighting_details h2').text();
        $('.lighting_details').css({'display':'none'});
        $('.add_RTU').css({'display':'block'});
        var txt1=Number($('.lighting_details .item').last().text())+1;
        $('.lighting_details .items').append('<div class="item"><span>'+txt1+'</span><img src="images/details_2.png" alt=""/></div>')
        if(tex1=='Group1'){
            Group_1.push(txt1)
        }else if(tex1=='Group2'){
            Group_2.push(txt1)
        }else if(tex1=='Group3'){
            Group_3.push(txt1)
        }else{
            newGroup.push(txt1)
        }
        var flag=true;
        $('.add_RTU .top_left').on('click',function(){
            $('.add_RTU').css({'display':'none'});
            $('.lighting_details').css({'display':'block'});
            flag=false;
        })
        setTimeout(function(){
            if(flag){
                Prompt('RTU(20000001)has connected with DTU(10001570),please plug in the next one.');
                flag=true;
            }
        },10000);
    })
    //变更RTU分组页面点击“Change Group”，提示“Please select RTU(s).”
    $('.lighting_details .lighting_left').on('click',function(){
       var standard= $('.lighting_details .item').hasClass('chose');
        if(!standard){
            Prompt('Please select RTU(s).')
        }else{
            $('.lighting_details .Group_Mask').slideToggle();
        }
    })

    $('.lighting_details .Group_Mask .no').on('click',function(){
        $('.lighting_details .Group_Mask').slideToggle();
    })
    $('.lighting_details .Group_Mask .yes').on('click',function(){
        $('.lighting_details .Group_Mask').slideToggle();
        var domindex=[];
        var tex=$('.lighting_details h2').text();
        $('.lighting_details .chose').each(function(i,dom){
            var z=$(dom).index();
            domindex.unshift(z);
        })
        var tex1=$('#Group_dummy').val();
        var otherGroud='';
        if(tex1=='Group1'){
            otherGroud=Group_1;
        }else if(tex1=='Group2'){
            otherGroud=Group_2;
        }else if(tex1=='Group3'){
            otherGroud=Group_3;
        }else{
            otherGroud=newGroup;
        }
        for(var a=0;a<domindex.length;a++){
            if(tex=='Group1'){
                otherGroud.push(Group_1.splice(domindex[a],1)[0])
            }else if(tex=='Group2'){
                otherGroud.push(Group_2.splice(domindex[a],1)[0])
            }else if(tex=='Group3'){
                otherGroud.push(Group_3.splice(domindex[a],1)[0])
            }else{
                otherGroud.push(newGroup.splice(domindex[a],1)[0])
            }
        }

        $('.lighting_details .chose').detach();
        Prompt('Group Changed Successfully.');
    })
    //变更RTU分组页面	点击“Delete”按钮，删除RTU

    $('.lighting_details .lighting_right').on('click',function(){
            var standard= $('.lighting_details .item').hasClass('chose');
            var domindex=[];
            if(!standard){
                Prompt('Please select RTU(s).');
            }else{
                var tex=$('.lighting_details h2').text();
                $('.lighting_details .chose').each(function(i,dom){
                    var z=$(dom).index();
                    domindex.unshift(z);
                })
                for(var a=0;a<domindex.length;a++){
                    if(tex=='Group1'){
                        Group_1.splice(domindex[a],1);
                    }else if(tex=='Group2'){
                        Group_2.splice(domindex[a],1);
                    }else if(tex=='Group3'){
                        Group_3.splice(domindex[a],1);
                    }else{
                        newGroup.splice(domindex[a],1);
                    }
                }
                $('.lighting_details .chose').detach();
            }
        })

    var Month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //var Month2=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];

    var myDate=new Date();
    $('.topTime .dateMonth').text(Month[myDate.getMonth()]);
    $('.topTime .dateDate').text(myDate.getDate());
    $('.topTime .dateYear').text(myDate.getFullYear());
    $('.topTime .dataTime').text(myDate.toTimeString().split(' ')[0]);
    $('.dtu_details_page .dtu_details_time').text(' '+Month[myDate.getMonth()]+' '+myDate.getDate()+' , '+myDate.getFullYear()+' '+myDate.toTimeString().split(' ')[0]);
    setInterval(function(){
        myDate=new Date();
        $('.topTime .dateMonth').text(Month[myDate.getMonth()]);
        $('.topTime .dateDate').text(myDate.getDate());
        $('.topTime .dateYear').text(myDate.getFullYear());
        $('.topTime .dataTime').text(myDate.toTimeString().split(' ')[0]);
        $('.dtu_details_page .dtu_details_time').text(' '+Month[myDate.getMonth()]+' '+myDate.getDate()+' , '+myDate.getFullYear()+' '+myDate.toTimeString().split(' ')[0]);
    },1000)
    var _this1;
    var num1;
    var num2;
    $('.Lighting_automatic .item').each(function(index,dom){
        $(dom).click(function(){
            _this1=this;
            if($(_this1).children().eq(0).text()=='━ ━'){
                return false;
            }
            if($(_this1).prevAll().eq(1).text()=='24:00'){
                return false;
            }
            $('.Lighting_automatic .top_left').fadeOut();
            $(_this1).parent().children().children().removeClass('redcolor');
            $(_this1).children().eq(1).addClass('redcolor');
            $(_this1).children().eq(2).addClass('redcolor');
            $(_this1).next().children().eq(0).addClass('redcolor');
            $('.Lighting_automatic .Lighting_automatic_bottom').slideDown();
            $('#demo').change(function(){
                if($(_this1).children().eq(0).text()=='━ ━'){
                    return false;
                }
                if($(_this1).prevAll().eq(1).text()=='24:00'){
                    return false;
                }
                num1=parseInt($('#demo').val());
                num2=parseInt($('#demo1').val());
                num1=num1<10?'0'+num1:num1;
                num2=num2<10?'0'+num2:num2;
                $(_this1).children().eq(1).text(num1+':'+num2);
                $(_this1).next().children().eq(0).text(num1+':'+num2);
                if($(_this1).next().children().eq(2).text()=='━ ━'){
                    $(_this1).next().children().eq(1).text('24:00');
                }
                $(_this1).next().children().eq(2).text('100%');
                var aa= $(_this1).children().eq(0).text().split(':');
                a=parseInt(aa[0]);
                b=parseInt(aa[1]);
                a=a<10?'0'+a:a;
                b=b<10?'0'+b:b;
                var c=parseInt($('#demo').val());
                c<10?'0'+c:c;
                if($('#demo').val()=='24'){
                    $('#demo1').html('<option value="00">00</option>');
                    $(_this1).children().eq(1).text('24:00');
                    $(_this1).nextAll().children().text('━ ━');
                }
                else if($('#demo').val()!=a){
                    $('#demo1').html($('#demo4 option').clone());
                }else{
                    $('#demo1').html($('#demo4 option[value='+b+']').nextAll().clone());
                }
                $('#demo1').mobiscroll().select({
                    theme: 'android-holo-light',
                    lang: 'zh',
                    display: 'inline',
                    minWidth: 200,
                    rows:3
                });
                $('.Lighting_automatic .item').each(function(i,a){
                    if(parseInt($(a).children().eq(0).text().split(':')[0])==parseInt($(a).children().eq(1).text().split(':')[0])){
                        if(parseInt($(a).children().eq(0).text().split(':')[1])>parseInt($(a).children().eq(1).text().split(':')[1])){
                            num2=parseInt(num2)+1;
                            var te1=$(a).children().eq(0).text().split(':')[0];
                            num2=num2<10?'0'+num2:num2;
                            if(num2=='59'){
                                num2=00;
                                te1=parseInt(num2)+1;
                                te1=te1>10?te1:"0"+te1;
                            }
                            $(a).children().eq(1).text(te1+':'+num2);
                            $(a).next().eq(0).children().eq(0).text(te1+':'+num2)
                        }
                    }
                    if(parseInt($(a).children().eq(0).text().split(':')[0])>parseInt($(a).children().eq(1).text().split(':')[0])){
                            num2=parseInt(num2)+1;
                            var te1=$(a).children().eq(0).text().split(':')[0];
                            num2=num2<10?'0'+num2:num2;
                            if(num2=='59'){
                                num2=00;
                                te1=parseInt(num2)+1;
                                te1=te1>10?te1:"0"+te1;
                            }
                            $(a).children().eq(1).text(te1+':'+num2);
                            $(a).next().eq(0).children().eq(0).text(te1+':'+num2)
                    }
                })
            })
            $('#demo1').change(function(){
                if($(_this1).children().eq(0).text()=='━ ━'){
                    return false;
                }
                if($(_this1).prevAll().eq(1).text()=='24:00'){
                    return false;
                }
                num1=parseInt($('#demo').val());
                num2=parseInt($('#demo1').val());
                num1=num1<10?'0'+num1:num1;
                num2=num2<10?'0'+num2:num2;
                if(num1=='24'){
                    return false
                }
                $(_this1).children().eq(1).text(num1+':'+num2);
                $(_this1).next().children().eq(0).text(num1+':'+num2);
                if($(_this1).next().children().eq(2).text()=='━ ━'){
                    $(_this1).next().children().eq(1).text('24:00');
                }
                $(_this1).next().children().eq(2).text('100%');
                $('.Lighting_automatic .item').each(function(i,a){
                    if(parseInt($(a).children().eq(0).text().split(':')[0])==parseInt($(a).children().eq(1).text().split(':')[0])){
                        if(parseInt($(a).children().eq(0).text().split(':')[1])>=parseInt($(a).children().eq(1).text().split(':')[1])){
                            num2=parseInt(num2)+1;
                            var te1=$(a).children().eq(0).text().split(':')[0];
                            num2=num2<10?'0'+num2:num2;
                            if(num2=='59'){
                                num2=00;
                                te1=parseInt(num2)+1;
                                te1=te1>10?te1:"0"+te1;
                            }
                            $(a).children().eq(1).text(te1+':'+num2);
                            $(a).next().eq(0).children().eq(0).text(te1+':'+num2)
                        }
                    }
                })


            })
            $('#demo2').change(function(){
                if($(_this1).children().eq(0).text()=='━ ━'){
                    return false;
                }
                if($(_this1).prevAll().eq(1).text()=='24:00'){
                    return false;
                }
                $(_this1).children().eq(2).text($('#demo2').val());
            })
            var aa= $(_this1).children().eq(0).text().split(':');
            a=parseInt(aa[0]);
            b=parseInt(aa[1]);
            a=a<10?'0'+a:a;
            b=b<10?'0'+b:b;
            if(a=='00'){
                $('#demo').html($('#demo3 option').clone());
                $('#demo1').html($('#demo4 option[value='+b+']').nextAll().clone());
            }else if(b=='59'){
                $('#demo').html($('#demo3 option[value='+a+']').nextAll().clone());
                $('#demo1').html($('#demo4 option').clone());
            }else{
                a-=1;
                a=a<10?'0'+a:a;
                $('#demo').html($('#demo3 option[value='+a+']').nextAll().clone());
                $('#demo1').html($('#demo4 option[value='+b+']').nextAll().clone());
            }
            $(_this1).children().eq(2).text($('#demo2').val());
            $('#demo').mobiscroll().select({
                theme: 'android-holo-light',
                lang: 'zh',
                display: 'inline',
                minWidth: 200,
                rows:3
            });
            $('#demo1').mobiscroll().select({
                theme: 'android-holo-light',
                lang: 'zh',
                display: 'inline',
                minWidth: 200,
                rows:3
            });

        })
    })

    $('.Lighting_automatic .top_right').click(function(){
        _this1=null;
        $('.Lighting_automatic .Lighting_automatic_bottom').slideUp();
        $('.Lighting_automatic .top_left').fadeIn();
        setTimeout(function(){
            $('.Lighting_automatic').css({'display':'none'});
            $('.lighting_control').css({'display':'block'});
        },1000)
    })
    $('.Lighting_automatic .Lighting_automatic_bottom button').click(function(){
        _this1=null;
        $('.Lighting_automatic .top_left').fadeIn();
        $('.Lighting_automatic .Lighting_automatic_bottom').slideUp();
    })
    $('.Lighting_automatic .item_box_1').unbind('click');

    $('.Lighting_automatic .top_left').click(function(){
        $('.Lighting_automatic').css({'display':'none'});
        $('.lighting_control').css({'display':'block'});
    })

    $(".lighting_Temperature .label_one").on('click',function(){
        $('.lighting_Temperature .mbsc-android-holo-light').css({'display':'none'})
        $('.lighting_Temperature .mbsc-android-holo-light').eq(0).css({'display':'block'});
        $('.lighting_Temperature .temperature_one').slideDown();
        $('.lighting_Temperature .temperature_btn_two').click(function(){
            $('.lighting_Temperature .temperature_one').slideUp();
            $('.lighting_Temperature .label_one').text($('#temperature1_dummy').val());
            $('.lighting_Temperature .label_three').text(parseFloat($('#temperature1_dummy').val())+2);
        })
    })

    $(".lighting_Temperature .label_one").on('click',function(){
        $('.lighting_Temperature .mbsc-android-holo-light').css({'display':'none'})
        $('.lighting_Temperature .mbsc-android-holo-light').eq(0).css({'display':'block'});
        $('.lighting_Temperature .temperature_one').slideDown();
        $('.lighting_Temperature .temperature_btn_two').click(function(){
            $('.lighting_Temperature .temperature_one').slideUp();
            $('.lighting_Temperature .label_one').text($('#temperature1_dummy').val());
            $('.lighting_Temperature .label_three').text(parseFloat($('#temperature1_dummy').val())+2);
        })
    })
    $(".lighting_Temperature .label_two").on('click',function(){
        $('.lighting_Temperature .mbsc-android-holo-light').css({'display':'none'})
        $('.lighting_Temperature .mbsc-android-holo-light').eq(1).css({'display':'block'});
        $('.lighting_Temperature .temperature_one').slideDown();
        $('.lighting_Temperature .temperature_btn_two').click(function(){
            $('.lighting_Temperature .temperature_one').slideUp();
            $('.lighting_Temperature .label_two').text($('#temperature2_dummy').val());
        })
    })
    $(".lighting_Temperature .label_three").on('click',function(){
        $('.lighting_Temperature .mbsc-android-holo-light').css({'display':'none'})
        $('.lighting_Temperature .mbsc-android-holo-light').eq(2).css({'display':'block'});
        $('.lighting_Temperature .temperature_one').slideDown();
        $('.lighting_Temperature .temperature_btn_two').click(function(){
            $('.lighting_Temperature .temperature_one').slideUp();
            $('.lighting_Temperature .label_three').text($('#temperature3_dummy').val());
            $('.lighting_Temperature .label_one').text(parseFloat($('#temperature3_dummy').val())-2);
        })
    })
    $('.lighting_Temperature .temperature_btn_one').on('click',function(){
        $('.lighting_Temperature .temperature_one').slideUp();
    })
    $('.lighting_Temperature .top_left').on('click',function(){
        $('.lighting_Temperature').css({'display':'none'});
        $('.lighting_control').css({'display':'block'});
    })
    $('.lighting_Temperature .top_right').on('click',function(){
        Prompt('Setting successful')
    })
    $('#demo').mobiscroll().select({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'inline',
        minWidth: 200,
        rows:3
    });
    $('#demo1').mobiscroll().select({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'inline',
        minWidth: 200,
        rows:3
    });
    $('#demo2').mobiscroll().select({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'inline',
        minWidth: 200,
        rows:3,
    });
    $('#temperature1').mobiscroll().select({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'inline',
        minWidth: 200,
        rows:3
    });
    $('#temperature2').mobiscroll().select({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'inline',
        minWidth: 200,
        rows:3
    });
    $('#temperature3').mobiscroll().select({
        theme: 'android-holo-light',
        lang: 'zh',
        display: 'inline',
        minWidth: 200,
        rows:3
    });


    //错误提示框
    function Prompt(text){
       var prompt=$('<div class="Mask_Prompt">'+text+'</div>');
        $('body').append(prompt);
        prompt.fadeToggle('fast',function(){
            setTimeout(function(){
                    prompt.detach();
            },1500)
        });
    }
})


